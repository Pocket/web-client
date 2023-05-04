import jwt from 'jsonwebtoken'

const devKey = 'shhhhh, secrets 🤫'

const isDev = process.env.SHOW_DEV === 'included'
const privateKey = process.env.BRAZE_PRIVATE_KEY || devKey
const expiration = 60 * 60 * 24 * 30 // 30 days (60s * 60m * 24h * 30d)

export default function getBrazeToken(req, res) {
  const { userId } = JSON.parse(req.body)

  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + expiration
  }

  const options = !isDev ? { algorithm: 'RS256', allowInsecureKeySizes: true } : null

  const token = jwt.sign(payload, privateKey, options)

  res.status(200).json(token)
}
