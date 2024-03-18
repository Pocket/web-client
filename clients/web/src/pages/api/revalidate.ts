import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/home')

    await res.revalidate('/saves')

    await res.revalidate('/saves/archive')
    await res.revalidate('/saves/archive/unread')
    await res.revalidate('/saves/archive/favorites')

    await res.revalidate('/saves/favorites')
    await res.revalidate('/saves/favorites/unread')
    await res.revalidate('/saves/favorites/archive')

    await res.revalidate('/saves/highlights')
    await res.revalidate('/saves/highlights/unread')
    await res.revalidate('/saves/highlights/archive')
    await res.revalidate('/saves/highlights/favorites')

    await res.revalidate('/saves/articles')
    await res.revalidate('/saves/articles/unread')
    await res.revalidate('/saves/articles/archive')
    await res.revalidate('/saves/articles/favorites')

    await res.revalidate('/saves/videos')
    await res.revalidate('/saves/videos/unread')
    await res.revalidate('/saves/videos/archive')
    await res.revalidate('/saves/videos/favorites')

    await res.revalidate('/saves/search')
    await res.revalidate('/saves/search/unread')
    await res.revalidate('/saves/search/archive')
    await res.revalidate('/saves/search/favorites')

    await res.revalidate('/saves/search')
    await res.revalidate('/saves/search/unread')
    await res.revalidate('/saves/search/archive')
    await res.revalidate('/saves/search/favorites')

    await res.revalidate('/saves/tags')

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
