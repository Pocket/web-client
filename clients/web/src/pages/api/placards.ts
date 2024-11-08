import type { NextApiRequest, NextApiResponse } from 'next'

export interface PlacardRequest {
  context_id: string
  placements: Placement[]
  blocks?: string[]
}

export interface Placement {
  placement: string
  count: number
}

export interface PlacardData {
  format: string
  url: string
  callbacks: {
    click: string
    impression: string
  }
  image_url: string
  alt_text: string
  block_key: string
}

export type PlacardResponse = Record<string, PlacardData[]>

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const payload = await req.body
    const body = JSON.stringify(payload)
    const adResponse = await fetch('https://ads.allizom.org/v1/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    if (!adResponse.ok) {
      throw new Error(`Failed ad server response: ${adResponse.status} — ${adResponse.statusText}`)
    }

    const response = await adResponse.json()
    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
