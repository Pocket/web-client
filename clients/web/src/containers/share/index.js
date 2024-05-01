import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Head from 'next/head'

export default function Share() {
  const router = useRouter()

  // We made our request and so we are on our way
  // this is wrapped in useEffect to force client Side
  useEffect(() => {
    router.replace('/home')
  })

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const sharedItem = useSelector((state) => state.sharedItem)
  const { displayItemId } = sharedItem
  const item = useSelector((state) => state.itemsDisplay[displayItemId])

  if (!sharedItem || !item) return
  const { shareUrl: url } = sharedItem
  const image = item?.thumbnail || false
  const {title, excerpt, authors, timeToRead } = item //prettier-ignore
  const authorString = authors.map((author) => author.name).join(',')

  return (
    <Head>
      <title>{title}</title>

      {/*  Primary Meta Tags */}
      <meta name="description" content={excerpt} />

      {/*  Pocket Specific Tags */}
      <meta name="x-pocket-override-excerpt" content={excerpt} />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={excerpt} />
      {image ? <meta itemProp="image" content={image} /> : null}

      {/*  Twitter */}
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
      <meta name="twitter:site" content="@pocket" />
      {image ? <meta name="twitter:image" content={image} /> : null}

      {/* Slack Unfurls */}
      {authors.length ? (
        <>
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={authorString} />
        </>
      ) : null}
      {timeToRead ? (
        <>
          <meta name="twitter:label2" content="Reading time" />
          <meta name="twitter:data2" content={`${timeToRead} minutes`} />
        </>
      ) : null}

      {/* Open Graph general (Facebook) */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:site_name" content="Pocket" />
      {image ? <meta property="og:image" content={image} /> : null}
    </Head>
  )
}
