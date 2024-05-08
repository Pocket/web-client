import { createPong2GetHandler } from 'common/utilities/bsa/pong'
import { getRequestCountry } from 'common/utilities/bsa/utils'

const handleGet = createPong2GetHandler()

/**
 * The request to get all possible ads for given placements, definded in constants.js
 *
 * POST to /api/pong/get
 *   - pongs: array of slot names
 *   - keywords: array of keywords to pass to BSA for relevant ads (ie. iab categories)
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function getAds(req, res) {
  const countryCode = getRequestCountry(req)
  const userAgent = req.headers['user-agent'] ?? ''

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { body } = req
  const { statusCode: status, payload } = await handleGet(body, countryCode, userAgent)

  return res.status(status).setHeader('cache-control', 'no-store').json(payload)
}
