const collectionData = require('./_data/getCollectionBySlug.json')

export default function handler(req, res) {
  const { slug } = req?.query
  const response = collectionData[slug]?.data?.getCollectionBySlug
  if (!response) return res.status(404)
  res.status(200).json(JSON.stringify(response))
}
