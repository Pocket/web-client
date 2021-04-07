export default function handler(req, res) {
  const clientVersion = process.env.RELEASE_VERSION || 'v0.0.0'

  res.status(200).json(JSON.stringify(clientVersion))
}
