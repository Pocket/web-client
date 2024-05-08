import { createPong2ViewedHandler } from 'common/utilities/bsa/pong'
import { getRequestCountry } from 'common/utilities/bsa/utils'

const handleViewed = createPong2ViewedHandler()

/**
 * Api that should be executed when a user views a specific ad.
 *
 * POST /api/pong/viewed with the following QUERY params:
 *   code: The viewed response string from the pong/get response
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function viewedAd(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const countryCode = getRequestCountry(req)
  const userAgent = req.headers['user-agent'] ?? ''
  const parsedUrl = url.parse(req.url)
  const search = parsedUrl.search ?? ''
  const params = new URLSearchParams(search)
  try {
    await handleViewed(params, countryCode, userAgent)
    return res.status(201).end()
  } catch (e) {
    console.error(e)
  }
  return res.status(204).end()
}
