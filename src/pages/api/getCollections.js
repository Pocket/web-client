const collectionData = require('./_data/collections.json')

export default function handler(req, res) {
  const { count = 3 } = req?.query
  const randomSet = collectionData
    .sort(() => 0.5 - Math.random())
    .slice(0, count)

  res.status(200).json(JSON.stringify(randomSet))
}
