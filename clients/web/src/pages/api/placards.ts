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

const mockData = {
  pocket_billboard: [
    {
      format: 'billboard',
      url: 'https://www.mozilla.org/en-US/advertising/',
      callbacks: {
        click:
          'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQKoAQQSIIRi0fSX7ChYnwOh8yODK3Qw-MfbNQZ-R3EOhTOD2wXA',
        impression:
          'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQGoAQQSIFoCwqf5lL2L6uM7lFVRh12I2E_FgPQtTgjYhlDvGK1K'
      },
      image_url: 'https://picsum.photos/seed/0/970/250',
      alt_text: 'Ad 1 for mozilla_ads',
      block_key: 'CAQSC2NyYXp5X2VkZGll'
    },
    {
      format: 'billboard',
      url: 'https://www.mozilla.org/en-US/advertising/',
      callbacks: {
        click:
          'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQKoAQQSIIRi0fSX7ChYnwOh8yODK3Qw-MfbNQZ-R3EOhTOD2wXA',
        impression:
          'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQGoAQQSIFoCwqf5lL2L6uM7lFVRh12I2E_FgPQtTgjYhlDvGK1K'
      },
      image_url: 'https://picsum.photos/seed/1/970/250',
      alt_text: 'Ad 2 for mozilla_ads',
      block_key: 'CAQSC2NyYXp5X2VkZGll'
    }
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // const payload = await req.body

    // const body = JSON.stringify(payload)

    // return fetch('https://ads.mozilla.org/v1/ads', { method: 'POST', body }).then((response) =>
    //   response.json()
    // )

    // Returning mock data for now
    return res.status(200).json(mockData)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
