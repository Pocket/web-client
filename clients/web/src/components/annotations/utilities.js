import DiffMatchPatch from 'diff-match-patch'

// Flag to determine whether to use the diff-match-patch library
const usePatch = true

export function highlightAnnotation(annotation, onHover, element, callback) {
  highlight(element, 'highlight', annotation, onHover, callback)
}

// Main highlight function accepting an array of annotations
export function highlightAnnotations({ node, annotations }) {
  const tapListener = () => {}
  const callback = () => {}

  const className = 'highlight'
  const doc = document

  if (!node) return

  // Normalize node argument without mutation
  const normalizedNode = normalizeNode(node, doc)
  if (!normalizedNode) return

  // Collect text and index-node pairs without mutation
  const { text, indices } = collectTextAndIndices(normalizedNode)
  if (!indices.length) return

  // Combine text array into a single string
  const combinedText = text.join('')

  // Add sentinel to indices immutably
  const updatedIndices = [...indices, { i: combinedText.length }]

  // Collect all matches from all annotations
  const allMatches = annotations
    .map((annotation) => {
      const match = findMatchingText(combinedText, annotation)
      if (match) {
        const { start, end } = calculateMatchIndices(match, combinedText)
        return { start, end, annotation }
      }
      return null
    })
    .filter((match) => match !== null)

  if (allMatches.length === 0) return

  // Sort all matches by their start index
  const sortedMatches = allMatches.sort((a, b) => a.start - b.start)

  // Merge overlapping matches or handle conflicts as per requirements
  const mergedMatches = mergeOverlappingMatches(sortedMatches)

  // Apply all highlights to the DOM
  applyHighlights({
    indices: updatedIndices,
    matches: mergedMatches.reverse(),
    className,
    tapListener,
    doc,
    callback
  })
}

// Helper Functions

/**
 * Normalizes the node argument. If it's a string, treats it as an ID and retrieves the DOM node.
 * Returns a new reference without mutating the original input.
 * @param {Mixed} node - The DOM node or string ID.
 * @param {Document} doc - The document object.
 * @returns {Node|null} - The normalized DOM node or null if not found.
 */
const normalizeNode = (node, doc) => {
  return typeof node === 'string' ? doc.getElementById(node) : node
}

/**
 * Traverses the DOM tree to collect all text nodes and their corresponding indices.
 * Returns new arrays without mutating any existing data structures.
 * @param {Node} node - The root DOM node to traverse.
 * @returns {Object} - An object containing the concatenated text and indices array.
 */
const collectTextAndIndices = (node) => {
  const indices = []
  const stack = []
  const text = []
  let textLength = 0

  let currentNode = node
  let iNode = 0
  let nNodes = currentNode?.childNodes?.length

  if (!nNodes) return { indices, text }

  // Cycle until we say stop
  while (true) {
    while (iNode < nNodes) {
      const child = currentNode.childNodes[iNode++]

      if (child.nodeType === Node.TEXT_NODE) {
        indices.push({ i: textLength, n: child })
        const nodeText = child.nodeValue
        text.push(nodeText)
        textLength += nodeText.length
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (/^(script|style)$/i.test(child.tagName)) continue

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

    if (stack.length === 0) break

    const state = stack.pop()
    currentNode = state.node
    nNodes = state.nNodes
    iNode = state.iNode
  }

  return { text, indices }
}

/**
 * Finds the matching text based on the annotation using diff-match-patch or regex.
 * Returns an object containing start and end indices if a match is found, else null.
 * @param {string} text - The combined text from the DOM.
 * @param {object} annotation - The annotation object containing patch or quote.
 * @returns {Object|null} - The match result with start and end indices or null.
 */
const findMatchingText = (text, annotation) => {
  let matchingText = null
  if ((annotation.version === 2 || annotation.version === '2') && usePatch) {
    const pktTagRegex = /<pkt_tag_annotation>([\s\S]*)<\/pkt_tag_annotation>/
    const dmp = new DiffMatchPatch()
    const patch = dmp.patch_fromText(annotation.patch)
    const [patchedText, results] = dmp.patch_apply(patch, text)
    if (results[0]) {
      const execResult = pktTagRegex.exec(patchedText)
      if (execResult && execResult[1] === annotation.quote) matchingText = execResult
    } else {
      // Deeper search with adjusted parameters
      const newDmp = new DiffMatchPatch()
      newDmp.Match_Distance = 1000
      newDmp.Match_Threshold = 0.2
      const secondPatch = newDmp.patch_fromText(annotation.patch)
      const [secondPatchedText, secondResults] = newDmp.patch_apply(secondPatch, text)
      if (secondResults[0]) {
        const execResult = pktTagRegex.exec(secondPatchedText)
        if (execResult) matchingText = execResult
      }
    }
  }

  if (!matchingText) {
    // Fallback to regex matching the exact quote
    const regex = highlightRegex(annotation.quote.trim())
    const execResult = regex.exec(text)
    if (execResult) matchingText = execResult
  }

  return matchingText
}

/**
 * Calculates the start and end indices of the match within the text.
 * @param {RegExpExecArray} matchingText - The regex match result.
 * @param {string} text - The combined text from the DOM.
 * @returns {Object} - An object containing start and end indices of the match.
 */
const calculateMatchIndices = (matchingText) => {
  if (!matchingText) return { start: 0, end: 0 }

  let iTextStart = matchingText.index
  const which = matchingText.length > 1 ? 1 : 0 // Adjust based on capturing groups
  for (let i = 1; i < which; i++) {
    iTextStart += matchingText[i].length
  }
  const iTextEnd = iTextStart + matchingText[which].length

  return { start: iTextStart, end: iTextEnd }
}

/**
 * Merges overlapping matches to prevent conflicts.
 * You can customize the merging strategy as needed.
 * @param {Array} matches - Array of match objects with start, end, and annotation.
 * @returns {Array} - Array of merged match objects.
 */
const mergeOverlappingMatches = (matches) => {
  if (matches.length === 0) return []

  // Sort matches by start index
  const sorted = matches.sort((a, b) => a.start - b.start)

  const merged = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1]
    const current = sorted[i]

    if (current.start <= last.end) {
      // Overlapping match found
      // Decide on merging strategy:
      // Here, we'll merge them and keep the earlier annotation
      merged[merged.length - 1] = {
        start: last.start,
        end: Math.max(last.end, current.end),
        annotation: last.annotation // Prioritize the first annotation
      }
    } else {
      merged.push(current)
    }
  }

  return merged
}

/**
 * Performs a binary search on the indices array to find the entry containing the start index.
 * Returns the index of the matching entry.
 * @param {Array} indices - The array of index-node pairs.
 * @param {number} iTextStart - The start index of the match.
 * @returns {number} - The index of the matching entry.
 */
const binarySearchIndices = (indices, iTextStart) => {
  let iLeft = 0
  let iRight = indices.length

  while (iLeft < iRight) {
    const i = Math.floor((iLeft + iRight) / 2)
    if (iTextStart < indices[i].i) {
      iRight = i
    } else if (iTextStart >= indices[i + 1]?.i) {
      iLeft = i + 1
    } else {
      return i
    }
  }

  return iLeft
}

/**
 * Applies all highlights to the DOM based on the matched indices.
 * Processes matches in order to prevent overlapping highlights.
 * @param {Object} params - Parameters required for applying highlights.
 */
const applyHighlights = ({ indices, matches, className, tapListener, doc, callback }) => {
  // To handle multiple highlights without interfering with each other,
  // it's best to apply them from the end to the start of the text.
  // This prevents earlier modifications from affecting the indices of later matches.

  // Create a DocumentFragment to batch insertions
  const insertionFragment = doc.createDocumentFragment()

  // Iterate through matches in reverse order
  for (let m = matches.length - 1; m >= 0; m--) {
    const match = matches[m]
    const { start, end, annotation } = match

    // Find the starting and ending indices in the indices array
    const startEntry = binarySearchIndices(indices, start)
    const endEntry = binarySearchIndices(indices, end)

    // Iterate through the relevant entries
    for (let i = startEntry; i <= endEntry; i++) {
      const entry = indices[i]
      const node = entry.n
      const nodeText = node.nodeValue
      const parentNode = node.parentNode
      const iNodeTextStart = start - entry.i
      const iNodeTextEnd = end - entry.i

      const textStart = iNodeTextStart > 0 ? nodeText.substring(0, iNodeTextStart) : null
      const textMiddle = nodeText.substring(iNodeTextStart, iNodeTextEnd)
      const textEnd = iNodeTextEnd < nodeText.length ? nodeText.substring(iNodeTextEnd) : null

      // Create new nodes without mutating existing nodes
      const newNodes = []

      if (textStart) {
        newNodes.push(doc.createTextNode(textStart))
      }

      const id = annotation.annotation_id || annotation.id
      const newSpan = createHighlightSpan(doc, textMiddle, className, id, tapListener)
      newNodes.push(newSpan)

      if (textEnd) newNodes.push(doc.createTextNode(textEnd))

      newNodes.forEach((newNode) => insertionFragment.appendChild(newNode))

      // Replace the original node with the new nodes
      parentNode.replaceChild(insertionFragment, node)
    }
  }

  if (callback) callback()
}

/**
 * Creates a span element for the highlighted text without mutating any inputs.
 * @param {Document} doc - The document object.
 * @param {string} text - The text to highlight.
 * @param {string} className - The CSS class for highlighting.
 * @param {string|number} id - The annotation ID.
 * @param {function} tapListener - The event listener for interactions.
 * @returns {HTMLElement} - The created span element.
 */
const createHighlightSpan = (doc, text, className, id, tapListener) => {
  const span = doc.createElement('span')
  span.setAttribute('annotation_id', id)
  span.setAttribute('data-annotation-id', id)
  span.className = className
  span.textContent = text

  if (tapListener) {
    attachTapListeners(span, tapListener)
  }

  return span
}

/**
 * Attaches event listeners to the span for user interactions without mutating any external state.
 * @param {HTMLElement} element - The span element.
 * @param {function} tapListener - The event listener function.
 */
const attachTapListeners = (element, tapListener) => {
  try {
    element.addEventListener('mouseover', tapListener, false)
    element.addEventListener('mouseout', tapListener, false)
    element.addEventListener('touchstart', tapListener, false)
  } catch (e) {
    console.warn(e)
  }
}

/**
 * Creates a regex to highlight exact match, escaping special characters.
 * @param {string} quote - The exact text to match.
 * @returns {RegExp} - The constructed regex.
 */
const highlightRegex = (quote) => {
  const escapedQuote = escapeRegExp(quote)
  return new RegExp(escapedQuote, 'g')
}

/**
 * Escapes special regex characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} - The escaped string.
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Remove all tags where added to the dom while highlighting
 * @param  {Mixed}  element   Element where to remove the tags
 * @param  {string} className The class name of the elments to remove
 * @return {Boolean}          Boolean that describes if remove was successfull
 */
export function removeHighlight(element, className) {
  // No element given just bail out
  if (!element) {
    return false
  }

  // Go through all elements recusively and remove all tags with the
  // given className
  if (element.nodeType === 1) {
    if (element.getAttribute('class') === className) {
      const text = element.removeChild(element.firstChild)
      element.parentNode.insertBefore(text, element)
      element.parentNode.removeChild(element)
      return true
    }

    let normalize = false
    const childNodesLength = element.childNodes.length
    for (let i = 0; i < childNodesLength; i++) {
      if (removeHighlight(element.childNodes[i], className)) {
        normalize = true
      }
    }
    if (normalize) {
      element.normalize()
    }
  }

  return false
}

export function removeAllHighlights() {
  removeHighlight(document.body, 'highlight')
}

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
