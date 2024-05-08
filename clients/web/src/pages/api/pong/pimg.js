/**
 * Api that should be used as an image url for a specifc ad
 *
 * Should be called as a client image request like
 *
 * GET: /api/pong/pimg/encodedImageStringFrom{pong/get}Request
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function getImage(req, res) {
  const parsedUrl = url.parse(req.url)
  const pathname = parsedUrl.pathname ?? ''
  const src = coder.decodeAndVerify(decodeURIComponent(pathname.substring('/pimg/'.length)))
  if (!src) {
    return res.status(400).end()
  }
  const { buf, contentType } = await fetchImage(src)
  return res
    .status(200)
    .set({
      'cache-control': 'max-age=86400',
      'content-type': contentType
    })
    .end(Buffer.from(buf))
}
