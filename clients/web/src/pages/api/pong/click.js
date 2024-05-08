import { createPong2ClickHandler } from 'common/utilities/bsa/pong'
import { getRequestCountry } from 'common/utilities/bsa/utils'

const handleClick = createPong2ClickHandler()

/**
 * Api that should be executed when a user clicks a ling in a specific ad.
 *
 * GET as a user facing click to /api/pong/click?code=click-code
 *   - code: The click response string from the pong/get response
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function clickedAd(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const countryCode = getRequestCountry(req)
  const userAgent = req.headers['user-agent'] ?? ''
  const params = new URLSearchParams(search)
  try {
    const { status, location } = await handleClick(params, countryCode, userAgent)
    if (location && (status === 301 || status === 302)) {
      return res.redirect(location)
    } else {
      return res.status(502).end()
    }
  } catch (e) {
    console.error(e)
  }
}
