import express from 'express'
import dotenv from 'dotenv'
import ogScraper from 'open-graph-scraper'
import crypto from 'crypto'
import type { Item, ItemMedia } from '@common/types'
import { arrayToObject } from '@common/utilities/object-array'

// Types
import type { Express, Request, Response } from 'express'
import type { SuccessResult } from 'open-graph-scraper'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', async (req: Request, res: Response) => {
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

  const youTubeShorts = [
    'https://www.youtube.com/shorts/9XpQRWCipcA',
    'https://www.youtube.com/shorts/Lly_YLl8yG0',
    'https://www.youtube.com/shorts/GWMnGzshNm0',
    'https://www.youtube.com/shorts/KCMJOAFiThQ',
    'https://www.youtube.com/shorts/nuRUaWxgu2U',
    'https://www.youtube.com/shorts/TJhZoZvitbU',
    'https://www.youtube.com/shorts/eTv8nbfFA40'
  ]

  const soundCloud = [
    'https://soundcloud.com/johnsummit/shiver-by-john-summit-and-hayla',
    'https://soundcloud.com/anemoiarecordings/don-toliver-x-sheloveztre-give-it-up',
    'https://soundcloud.com/zedsdead/zeds-dead-x-flux-pavilion-x-deathbyromy-waves',
    'https://soundcloud.com/johnsummit/the-temper-trap-sweet-disposition-john-summit-silver-panda-remix',
    'https://soundcloud.com/johnsummit/daft-punk-x-john-summit-veridis-quo-x-human-live-bmo-stadium',
    'https://www.mixcloud.com/SuburbanArchitecture/suburban-architecture-dancefloor-heritage-volume-2-mixed-version/',
    'https://www.mixcloud.com/SyphonDnB/deep-liquid-drum-bass-rollers-82/'
  ]

  const videos = [
    'https://www.youtube.com/watch?v=SLQnU63I3IQ',
    'https://www.youtube.com/watch?v=djSKp_pwmOA',
    'https://www.twitch.tv/videos/2121294696',
    'https://www.youtube.com/watch?v=sBU8ejvW6fM',
    'https://www.dailymotion.com/video/x8wwjza',
    'https://www.dailymotion.com/video/x8i9u7k',
    'https://www.youtube.com/watch?v=lU_NKNZljoQ',
    'https://www.dailymotion.com/video/x8jeakq',
    'https://www.twitch.tv/videos/2123387770',
    'https://www.dailymotion.com/video/x8ipowa'
  ]

  const micro = [
    'https://twitter.com/Culture_Crit/status/1781034112133799970',
    'https://twitter.com/sciam/status/1780792206778847652',
    'https://twitter.com/MadHatterMommy/status/1781305103196270806',
    'https://twitter.com/SeffSaid/status/1781380994458886415',
    'https://twitter.com/WiseVersatile_/status/1781381358826201304'
  ]

  const podcast = [
    'https://open.spotify.com/episode/3uzhLUUKsZ67Bz73SULFfx',
    'https://open.spotify.com/episode/6Fg6L9A2xo8dKiwmPaEA05',
    'https://open.spotify.com/episode/1FOH40Zr5aFhhgQEWgTnR4'
  ]

  const products = [
    'https://www.amazon.com/dp/B0CY46GYMT',
    'https://www.amazon.com/Crocs-Clogs-Black-Unisex-Little/dp/B0BVF5TRBT'
  ]

  const results = await Promise.all(
    micro.map(async (url) => {
      const data = await ogScraper({
        url,
        fetchOptions: { headers: { 'user-agent': userAgent } }
      })
      const { error, result, html } = data as SuccessResult

      const hash = crypto.createHash('sha256').update(url).digest('hex')

      if (error) return undefined
      return { ...result, id: hash }
    })
  )

  const derivedItems = deriveFromOG(results as OpenGraphPropertiesWithId[])
  const itemsById = arrayToObject(derivedItems, 'id')
  res.send(JSON.stringify({ results, itemsById }))
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export type OpenGraphPropertiesWithId = {
  id: string
} & SuccessResult['result']

type ImageObject = {
  height?: number
  type?: string
  url: string
  width?: number
  alt?: string
}
type VideoObject = {
  height?: number
  type?: string
  url: string
  width?: number
}
type OpenGraphImage = ImageObject | VideoObject | string

export function deriveFromOG(ogItems: OpenGraphPropertiesWithId[]) {
  const itemsById: Item[] = ogItems
    .map(
      (ogItem): Item => ({
        excerpt: '',
        id: ogItem.id as string,
        image: getCorrectMedia(ogItem.ogImage) || getCorrectMedia(ogItem.twitterImage),
        video: getCorrectMedia(ogItem.ogVideo),
        publisher:
          ogItem.ogSiteName ||
          ogItem.twitterAppNameiPhone ||
          ogItem.twitterAppNameiPad ||
          ogItem.twitterAppNameGooglePlay ||
          '',
        title: ogItem.ogTitle || ogItem.twitterTitle || '',
        url: ogItem.ogUrl || ogItem.twitterUrl || ogItem.requestUrl || ''
      })
    )
    .filter(Boolean)
  return itemsById
}

function getCorrectMedia(media: string | OpenGraphImage | OpenGraphImage[] | undefined) {
  if (!media) return undefined
  if (typeof media === 'string') return { url: 'media' }

  return Array.isArray(media) ? (media[0] as ItemMedia) : (media as ItemMedia)
}
