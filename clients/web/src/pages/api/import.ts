import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false // Disables Next.js default body parser to handle raw binary data
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const preSignedUrl = req.query.preSignedUrl as string
  if (!preSignedUrl) return res.status(400).json({ message: 'Missing presigned URL' })

  try {
    const chunks: Buffer[] = []

    req.on('data', (chunk) => {
      chunks.push(chunk)
    })

    req.on('end', async () => {
      const fileData = Buffer.concat(chunks)

      // Forward the file to the presigned URL
      console.info('Uploading File to S3')
      const response = await fetch(preSignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/zip' },
        body: fileData
      })

      if (!response.ok) throw new Error('Failed to upload file to presigned URL')

      res.status(200).json({ message: 'File uploaded successfully' })
    })

    req.on('error', () => {
      throw new Error('Error while reading file')
    })

    req.on('close', () => {
      console.log('')
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
