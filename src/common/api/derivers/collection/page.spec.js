import { deriveCollection } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const collectionFromClientApi = {
  externalId: 'f856e771-13c9-42b6-b483-6670c4080c62',
  slug: 'making-sense-of-cybersecurity-in-2021',
  title: 'Making Sense of Cybersecurity in 2021',
  excerpt:
    'Technologist and Mozilla Fellow Alex Argüelles breaks down how governments and corporations can intrude on digital privacy, and how to protect yourself from the worst offenders. ',
  intro:
    'October is Cybersecurity Awareness Month, which deserves more than a calendar notification to update your passwords. This year, it comes at a time when technology companies play an increasingly prominent part of our lives—and not always for the better. \n\nIn this collection of articles and tools, I want to dwell on the complexities and inequalities of our hyper-connected world. It can be thorny out there, but it’s more important than ever to pay attention, investigate, and fight back where we can. So… let’s dig in! --*Alex Argüelles (Alex K.)*',
  thumbnail:
    'https://s3.amazonaws.com/pocket-collectionapi-prod-images/10751de5-8574-4802-9988-e958b38ad72c.png',
  authors: [
    {
      name: 'Alex Argüelles',
      bio: 'Alex Argüelles (Alex K.) is a Mexican technologist, human rights defender, and [Mozilla Tech and Society Fellow](https://foundation.mozilla.org/en/blog/introducing-our-10-newest-mozilla-fellows/). During the first year of their fellowship, they created [comun.al](https://comun.al/), a digital resiliency lab focused on theoretical approaches towards healing and organizing in communities of resistance. Argüelles is also working with Mexican activists, researchers, and human rights defenders to publish a book on digital violence on behalf of the State in Mexico; it will be available  in English and Portuguese by the end of 2021.',
      imageUrl:
        'https://s3.amazonaws.com/pocket-collectionapi-prod-images/51ebddac-b680-4162-bf8c-78a48dbd4a61.png'
    }
  ],
  language: 'en',
  IABChildCategory: {
    name: 'Network Security',
    slug: 'Network-Security',
    externalId: 'db9ecbd6-6819-4f1d-a66d-2f96986cf697'
  },
  IABParentCategory: {
    name: 'Technology & Computing',
    slug: 'Technology-and-Computing',
    externalId: 'cd9e9740-f5da-4658-81ec-9f3278c77423'
  },
  publishedAt: '2021-10-25T19:28:45.000Z',
  stories: [
    {
      url: 'https://forbiddenstories.org/spying-on-mexican-journalists-investigating-the-lucrative-market-of-cyber-surveillance/',
      title:
        'Spying on Mexican Journalists: Investigating the Lucrative Market of Cyber-Surveillance',
      excerpt:
        '**Alex K.**: “I’m a deep admirer of the investigative journalism and international collaboration ethics from the people at Forbidden Stories, especially ‘The Cartel Project’ series that this piece is from. Here, Cécile Schilis-Gallego explores how easily state-deployed surveillance mechanisms can be used by organized crime to silence and harass journalists, human rights defenders, and activists with impunity.”',
      thumbnail:
        'https://s3.amazonaws.com/pocket-collectionapi-prod-images/a4a794d2-2e5d-41d9-a913-05d0b1c52a69.jpeg',
      fromPartner: false,
      authors: [
        {
          name: 'Cécile Schilis-Gallego'
        }
      ],
      publisher: 'Forbidden Stories'
    }
  ],
  partnership: null
}

export const partnerCollectionFromClientApi = {
  externalId: '06deb7d1-b341-47fe-bf01-a0ebe829a701',
  slug: 'napping-is-not-what-lazy-people-do-how-to-take-a-proper-nap',
  title: '‘Napping Is Not What Lazy People Do:’ How to Take a Proper Nap',
  excerpt:
    'Yes, it’s possible to level up your naps. Amanda Ripley, host of Slate’s How To podcast, breaks it down.',
  intro:
    'A few years ago I started to feel like journalism just wasn’t working the way it was supposed to—it was hard to know how to be useful in an age of outrage and division. That led me to write [a book](https://link.slate.com/click/25011894.629/aHR0cDovL3d3dy5hbWF6b24uY29tL2RwLzE5ODIxMjg1NjkvP3RhZz1zbGF0bWFnYS0yMCZzaWQ9NWNmOTkxYTkzZjkyYTQ1MjA4OTI0ZDg4JnV0bV9tZWRpdW09ZW1haWwmdXRtX3NvdXJjZT1uZXdzbGV0dGVyJnV0bV9jb250ZW50PVNsYXRlUGx1c0RpZ2VzdCZ1dG1fY2FtcGFpZ249dHJhZmZpYw/5cf991a93f92a45208924d88Bb40fb395) about how people get out of really intractable conflict… which then turned into an opportunity to host *How To!*. \n\nI love the way the show solves problems, rather than just lamenting them. And I love the way it brings the listener right into the studio with the journalist and the experts, so we can all just huddle up and try to figure it out. It’s a show that is low in ego and high in curiosity, which seems well-suited to this moment in time.\n\nOur latest episode was sparked by an email we got from a listener in the UK. Rob is a father of two children who are “90 percent wonderful and 10 percent absolute terrors.” At the end of the day all they want to do is play, but Rob is absolutely exhausted from a busy work day. He’s tried taking naps, but it usually just makes him more tired. So we dug into the latest sleep science and brought on Sara Mednick, author of *[Take a Nap! Change Your Life](https://www.amazon.com/Take-Nap-Change-Your-Life/dp/0761142908/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=)* to try and help. Along the way, Sara shared some pretty fantastic resources to make napping work the way you want it to. And ultimately, feel better, more rested, and like a more active part of your own life. I’m excited to share some of the highlights from our chat, and hope you come away from this collection primed for a sweet 26-minute snooze.   --*Amanda Ripley*',
  topImageUrl:
    'https://s3.amazonaws.com/pocket-collectionapi-prod-images/0b6fd826-6bcd-4bae-a9c4-e83d1ba59f57.png',
  authors: [
    {
      name: 'Amanda Ripley',
      bio: '**[Amanda Ripley](https://slate.com/author/amanda-ripley)** is host of the podcast *How To!*  She is an investigative journalist and a *New York Times* bestselling author. Her latest book is *[High Conflict: Why We Get Trapped and How We Get Out](http://www.amazon.com/dp/1982128569/?tag=slatmaga-20)*. Ripley’s previous books include *[The Unthinkable](http://www.amazon.com/dp/B01FOD80OU/?tag=slatmaga-20)* and  *[The Smartest Kids in the World](http://www.amazon.com/dp/145165443X/?tag=slatmaga-20)*. She also [writes](http://www.amandaripley.com/articles) for *The Atlantic*, Politico, *The Washington Post*, and other outlets. Ripley grew up in New Jersey and now lives in Washington, D.C.\n',
      imageUrl:
        'https://s3.amazonaws.com/pocket-collectionapi-prod-images/5124febf-78be-4625-abef-b451385ba058.jpeg'
    }
  ],
  language: 'en',
  IABChildCategory: {
    name: 'Sleep Disorders',
    slug: 'Sleep-Disorders',
    externalId: '957589c1-c79a-4a98-af8f-68caebf5ece9'
  },
  IABParentCategory: {
    name: 'Health & Fitness',
    slug: 'Health-and-Fitness',
    externalId: 'e29502e9-f43b-4be0-9ab8-6f4671a142cb'
  },
  publishedAt: '2021-10-25T23:20:00.000Z',
  partnership: {
    type: 'PARTNERED',
    name: 'Slate',
    url: 'https://slate.com/podcasts/',
    imageUrl:
      'https://s3.amazonaws.com/pocket-collectionapi-prod-images/1ea1b55b-aa46-46ef-a691-89f407cfe67b.png'
  }
}

describe('Collection — Page', () => {
  const expectedSaveUrl = 'https://getpocket.com/collections/making-sense-of-cybersecurity-in-2021' //prettier-ignore
  const expectedExternalUrl = 'https://getpocket.com/collections/making-sense-of-cybersecurity-in-2021?utm_source=pocket_collection' //prettier-ignore
  const expectedReadUrl = '/collections/making-sense-of-cybersecurity-in-2021'
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'https://getpocket.com/collections/making-sense-of-cybersecurity-in-2021' //prettier-ignore

  const item = deriveCollection(collectionFromClientApi)

  it('should derive clientAPI as expected', () => {
    // User driven data points
    expect(item._createdAt).toBeFalsy()
    expect(item._updatedAt).toBeFalsy()
    expect(item.status).toBeFalsy()
    expect(item.isFavorite).toBeFalsy()
    expect(item.isArchived).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toBeFalsy()

    // UnDerived content should come from the server
    expect(item.itemId).toBeFalsy()
    expect(item.resolvedId).toBeFalsy()
    expect(item.slug).toBe('making-sense-of-cybersecurity-in-2021')
    expect(item.isSyndicated).toBeFalsy()
    expect(item.isReadable).toBeTruthy()
    expect(item.isCollection).toBeTruthy()
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBeFalsy()
    expect(item.hasImage).toBeFalsy()
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Making Sense of Cybersecurity in 2021')
    expect(item.thumbnail).toBe(
      'https://s3.amazonaws.com/pocket-collectionapi-prod-images/10751de5-8574-4802-9988-e958b38ad72c.png'
    )
    expect(item.publisher).toBe('Pocket')
    expect(item.excerpt).toBe(
      'Technologist and Mozilla Fellow Alex Argüelles breaks down how governments and corporations can intrude on digital privacy, and how to protect yourself from the worst offenders. '
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBeFalsy()
    expect(item.authors).toStrictEqual([
      {
        name: 'Alex Argüelles',
        bio: 'Alex Argüelles (Alex K.) is a Mexican technologist, human rights defender, and [Mozilla Tech and Society Fellow](https://foundation.mozilla.org/en/blog/introducing-our-10-newest-mozilla-fellows/). During the first year of their fellowship, they created [comun.al](https://comun.al/), a digital resiliency lab focused on theoretical approaches towards healing and organizing in communities of resistance. Argüelles is also working with Mexican activists, researchers, and human rights defenders to publish a book on digital violence on behalf of the State in Mexico; it will be available  in English and Portuguese by the end of 2021.',
        imageUrl:
          'https://s3.amazonaws.com/pocket-collectionapi-prod-images/51ebddac-b680-4162-bf8c-78a48dbd4a61.png'
      }
    ])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const whitelist = /^collection./
    const blacklist = [
      'collection.story.impression',
      'collection.story.open',
      'collection.story.save'
    ]

    const sectionActions = Object.keys(analyticsActions).filter((action) => action.match(whitelist))
    const relevantActions = sectionActions.filter(
      (action) =>
        analyticsActions[action].entityTypes.includes('content') && !blacklist.includes(action)
    )

    relevantActions.map((identifier) => {
      it(`${identifier} should be valid`, () => {
        const { expects } = analyticsActions[identifier]
        const isValid = validateSnowplowExpectations({
          identifier,
          expects,
          data: {
            position: 0,
            destination: 'external',
            value: 'save-story-top', //'Fired when a user clicks the `Save` button, value is one of three: save-story-top, save-story-side, or save-story-bottom'
            ...item.analyticsData
          }
        })
        expect(isValid).toBeTruthy()
      })
    })
  })
})
