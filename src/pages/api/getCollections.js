const collectionData = require('./_data/getCollections.json')

export default function handler(req, res) {
  res.status(200).json(JSON.stringify(collectionData))
}
