import { getImageCacheUrl } from 'common/utilities'
import DOMPurify from 'dompurify'

function loadImage(imageObject) {
  const { src } = imageObject
  const imageSource = getImageCacheUrl(src)
  return new Promise((resolve, reject) => {
    const imageLoader = new Image()
    imageLoader.onload = () => resolve({ imageObject, imageSource })
    imageLoader.onerror = () =>
      reject({ error: 'Image failed to load', imageObject })
    imageLoader.src = imageSource
  })
}

function invalidateImage(data) {
  const { error, imageObject } = data

  if (imageObject) {
    replaceImageMarkup({
      error,
      imageId: imageObject.image_id,
      markup: ''
    })
  }
}

function buildImageMarkup(data) {
  const { caption, credit, image_id } = data.imageObject
  const imageSource = data.imageSource
  const cleanCaption = DOMPurify.sanitize(caption)
  const cleanCredit = DOMPurify.sanitize(caption)

  const captionMarkup = caption.length
    ? `<figcaption>${cleanCaption}</figcaption>`
    : ''
  const creditMarkup =
    credit.length && cleanCaption !== cleanCredit
      ? `<cite>photo by: ${cleanCredit}</cite>` // translate?
      : ''

  return Promise.resolve({
    imageId: image_id,
    markup: DOMPurify.sanitize(`
        <figure>
          <img src='${imageSource}' alt='${cleanCaption}'/>
          ${captionMarkup}
          ${creditMarkup}
        </figure>
      `)
  })
}

function replaceImageMarkup(data) {
  const element = document.getElementById(`RIL_IMG_${data.imageId}`)
  if (element) {
    element.innerHTML = data.markup
  }
}

export function loadParsedImages(images) {
  if (!images) return

  Object.keys(images).map((imageKey) =>
    loadImage(images[imageKey])
      .then(buildImageMarkup)
      .then(replaceImageMarkup)
      .catch((error) => {
        invalidateImage(error, images[imageKey])
      })
  )
}
