import DiffMatchPatch from 'diff-match-patch'

// Set this to false if you do *not* want to merge overlapping highlights:
const useMergedAnnotations = true

// Flag to determine whether to use the diff-match-patch library
const usePatch = true

// If you just want to highlight *one* annotation:
export function highlightAnnotation(annotation, onHover, element, callback) {
  highlightAnnotations({ node: element, annotations: [annotation], annotationsCallback: callback })
}

/**
 * highlightAnnotations
 *  - The primary function: Takes a DOM node (or node ID) + an array of annotations,
 *    finds matching text, optionally merges overlapping highlights, and applies them in a way
 *    that supports multiple highlights within the same text node.
 */
export function highlightAnnotations({ node, annotations, annotationsCallback }) {
  if (!node) return

  const normalizedNode = normalizeNode(node)
  if (!normalizedNode) return

  // Gather all text plus an "indices" array mapping absolute positions -> textNodes
  const { text, indices } = collectTextAndIndices(normalizedNode)
  if (!indices.length) return

  // Combine text into one big string
  const combinedText = text.join('')
  // Add sentinel end position so we know where the last text node ends
  const updatedIndices = [...indices, { i: combinedText.length }]

  // For each annotation, figure out [start, end] in `combinedText`
  let allMatches = []
  for (const annotation of annotations) {
    const found = findMatchingText(combinedText, annotation)
    if (found) {
      const { start, end } = calculateMatchIndices(found)
      allMatches.push({ start, end, annotation })
    }
  }
  if (!allMatches.length) return

  // Sort the matches by start index
  allMatches.sort((a, b) => a.start - b.start)

  // Optionally merge overlapping matches (based on boolean flag)
  if (useMergedAnnotations) {
    allMatches = mergeOverlappingMatches(allMatches)
  }

  // Apply highlights in a single pass *per text node*.
  // This approach prevents issues if multiple highlights fall in the same node.
  applyHighlightsSinglePass({
    matches: allMatches,
    indices: updatedIndices,
    className: 'highlight'
  })

  if (annotationsCallback) annotationsCallback()
}

/**
 * applyHighlightsSinglePass
 *  - We iterate over each text node in `indices`.
 *  - We find all matches that intersect that text node’s range.
 *  - We split that text node *one time*, creating highlight <span> elements as needed.
 */
function applyHighlightsSinglePass({ matches, indices, className }) {
  // Loop through each text node. For i from 0..(indices.length - 2),
  // each text node covers [indices[i].i .. indices[i+1].i).
  for (let i = 0; i < indices.length - 1; i++) {
    const nodeStart = indices[i].i
    const nodeEnd = indices[i + 1].i
    const textNode = indices[i].n
    if (!textNode) continue

    // Find all highlights that intersect [nodeStart, nodeEnd).
    const relevant = []
    for (const m of matches) {
      if (m.end <= nodeStart) continue
      if (m.start >= nodeEnd) continue
      relevant.push(m)
    }
    if (!relevant.length) continue

    // Slice up this text node in a single pass, building new pieces
    highlightOneTextNode({
      textNode,
      nodeStart,
      matches: relevant,
      className
    })
  }
}

/**
 * highlightOneTextNode
 *  - Given a single text node and all highlight ranges that intersect it,
 *    break it into (text + highlight + text + highlight + ...).
 */
function highlightOneTextNode({ textNode, nodeStart, matches, className }) {
  const parent = textNode.parentNode
  if (!parent) return

  const originalText = textNode.nodeValue
  const fragments = []
  let currentPos = 0

  // Because matches are sorted by start, we can iterate left to right
  for (const m of matches) {
    // Convert absolute positions [m.start, m.end] to relative positions within this text node
    const startRel = Math.max(0, m.start - nodeStart)
    const endRel = Math.min(originalText.length, m.end - nodeStart)

    // If there's text before the highlight, push it
    if (startRel > currentPos) {
      fragments.push(document.createTextNode(originalText.substring(currentPos, startRel)))
    }

    // Then the highlighted part
    if (endRel > startRel) {
      const subText = originalText.substring(startRel, endRel)
      const span = document.createElement('span')
      span.className = className
      span.textContent = subText

      // This means sometimes the tap action of the sidebar will be non-functional (since we merged)
      // away the annotation id ... for now this is acceptable.
      const annotationId = m.annotation.annotation_id || m.annotation.id
      if (annotationId) {
        span.setAttribute('data-annotation-id', annotationId)
      }

      fragments.push(span)
    }
    currentPos = Math.max(currentPos, endRel)
  }

  // If there's leftover text after the last highlight
  if (currentPos < originalText.length) {
    fragments.push(document.createTextNode(originalText.substring(currentPos)))
  }

  // Replace the original text node with our new set of nodes
  for (const f of fragments) {
    parent.insertBefore(f, textNode)
  }
  parent.removeChild(textNode)
}

/**
 * diff-match-patch or regex to locate the annotation’s text in the big string
 */
function findMatchingText(text, annotation) {
  if ((annotation.version === 2 || annotation.version === '2') && usePatch) {
    // Attempt patch
    const dmp = new DiffMatchPatch()
    const patch = dmp.patch_fromText(annotation.patch)
    const [patchedText, results] = dmp.patch_apply(patch, text)
    if (results[0]) {
      // Found a place to apply the patch, see if we have <pkt_tag_annotation>...</pkt_tag_annotation>
      const tagRegex = /<pkt_tag_annotation>([\s\S]+?)<\/pkt_tag_annotation>/
      const execResult = tagRegex.exec(patchedText)
      if (execResult && execResult[1] === annotation.quote) {
        return execResult
      }
    }
    // Removing second pass as it just convolutes things and creates more hearache. The merged
    // annotations works more effectively and the fallback is a reasonable .. you know ... fallback
  }

  // fallback to regex matching the annotation’s exact quote
  const regex = highlightRegex(annotation.quote.trim())
  return regex.exec(text) // returns the first match or null
}

/**
 * Convert the match object from RegExp.exec() into numeric start/end in the text
 */
function calculateMatchIndices(matchingText) {
  if (!matchingText) return { start: 0, end: 0 }
  let iTextStart = matchingText.index
  // if we have capturing groups, decide if we only want group[1]
  const whichGroup = matchingText.length > 1 ? 1 : 0
  for (let i = 1; i < whichGroup; i++) {
    iTextStart += matchingText[i].length
  }
  const iTextEnd = iTextStart + matchingText[whichGroup].length
  return { start: iTextStart, end: iTextEnd }
}

/**
 * Optionally merges overlapping matches into one.
 * If you disable merging, you’ll see separate highlights if they overlap.
 */
function mergeOverlappingMatches(matches) {
  if (!matches.length) return []
  matches.sort((a, b) => a.start - b.start)

  const merged = [matches[0]]
  for (let i = 1; i < matches.length; i++) {
    const last = merged[merged.length - 1]
    const current = matches[i]

    // If there's overlap
    if (current.start <= last.end) {
      // Merge the ranges
      last.end = Math.max(last.end, current.end)
    } else {
      merged.push(current)
    }
  }
  return merged
}

/**
 * Turn a DOM node or string ID into a DOM node
 */
function normalizeNode(node) {
  return typeof node === 'string' ? document.getElementById(node) : node
}

/**
 * Recursively walk the DOM collecting all text nodes and their absolute positions.
 */
function collectTextAndIndices(root) {
  const indices = []
  const text = []
  let textLength = 0

  const stack = []
  let currentNode = root
  let iNode = 0
  let nNodes = currentNode?.childNodes?.length || 0

  if (!nNodes) return { text, indices }

  while (true) {
    while (iNode < nNodes) {
      const child = currentNode.childNodes[iNode++]
      if (!child) continue

      if (child.nodeType === Node.TEXT_NODE) {
        indices.push({ i: textLength, n: child })
        const nodeText = child.nodeValue
        text.push(nodeText)
        textLength += nodeText.length
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // skip <script> or <style>
        if (/^(script|style)$/i.test(child.tagName)) {
          continue
        }
        // Insert a space if it's a "blockish" element so that separate elements remain separated
        if (
          !/^(a|b|basefont|bdo|big|em|font|i|s|small|span|strike|strong|su[bp]|tt|u)$/i.test(
            child.tagName
          )
        ) {
          text.push(' ')
          textLength++
        }

        const nChildren = child.childNodes.length
        if (nChildren) {
          stack.push({ node: currentNode, nNodes, iNode })
          currentNode = child
          nNodes = nChildren
          iNode = 0
        }
      }
    }

    if (!stack.length) break
    const st = stack.pop()
    currentNode = st.node
    nNodes = st.nNodes
    iNode = st.iNode
  }

  return { text, indices }
}

/**
 * Creates a regex to highlight exact match, escaping special characters.
 * @param {string} quote - The exact text to match.
 * @returns {RegExp} - The constructed regex.
 */
function highlightRegex(quote) {
  return new RegExp(escapeRegExp(quote), 'g')
}

/**
 * Escapes special regex characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeRegExp(str) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Remove all tags where added to the dom while highlighting
 * @param  {Mixed}  element   Element where to remove the tags
 * @param  {string} className The class name of the elments to remove
 * @return {Boolean}          Boolean that describes if remove was successfull
 */
export function removeHighlight(element, className) {
  if (!element) return false

  if (element.nodeType === 1) {
    if (element.classList && element.classList.contains(className)) {
      const textContent = element.textContent
      element.parentNode.insertBefore(document.createTextNode(textContent), element)
      element.parentNode.removeChild(element)
      return true
    }

    let normalizeNeeded = false
    const childNodesLength = element.childNodes.length
    for (let i = 0; i < childNodesLength; i++) {
      if (removeHighlight(element.childNodes[i], className)) normalizeNeeded = true
    }
    if (normalizeNeeded) element.normalize()
  }

  return false
}

/**
 * Removes all highlights (with class "highlight") from the entire document
 */
export function removeAllHighlights() {
  removeHighlight(document.body, 'highlight')
}

/**
 * Creates a patch using diff-match-patch, by wrapping the selected text in <tag_annotation> ... </tag_annotation>.
 * This helps re-find that exact selection in a changed doc later.
 */
export function requestAnnotationPatch(sel) {
  const wholeThing = new Range()
  wholeThing.selectNodeContents(document.body)

  const selection = sel.getRangeAt(0)

  const before = new Range()
  before.setStart(wholeThing.startContainer, wholeThing.startOffset)
  before.setEnd(selection.startContainer, selection.startOffset)

  const after = new Range()
  after.setStart(selection.endContainer, selection.endOffset)
  after.setEnd(wholeThing.endContainer, wholeThing.endOffset)

  const originalText = before.toString() + selection.toString() + after.toString()
  const modifiedText =
    before.toString() +
    '<pkt_tag_annotation>' +
    selection.toString() +
    '</pkt_tag_annotation>' +
    after.toString()

  const dmp = new DiffMatchPatch()
  return dmp.patch_toText(dmp.patch_make(originalText, modifiedText))
}
