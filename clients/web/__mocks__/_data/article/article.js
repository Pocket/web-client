import articleContent from './article-content'
import publisher from './publisher'

const article = {
  photosAndCaptions: {
    slug: 'benefits-of-optimism',
    publisher: publisher.theAtlantic,
    content: articleContent.photosAndCaptions,
    title: 'The Benefits of Optimism Are Real',
    description:
      "One of the most memorable scenes of the Oscar-nominated film Silver Linings Playbook revolves around Ernest Hemingway's A Farewell to Arms, a novel that does not end well, to put it mildly. Patrizio Solitano Jr.",
    showAds: true,
    topImageUrl: 'https://fillmurray.com/g/1000/800',
    publishedAt: '4/1/2019',
    item: {
      topImage: 'https://placeimg.com/1800/800/opera',
      domains: [
        {
          name: 'vanityfair.com'
        }
      ]
    },
    authorNames: ['Alexandra Spinka', 'Jonathan Mahler', 'Jim Rutenberg'],
    relatedItems: [
      {
        targetUrl: '/i/foo.html',
        title: 'Russia’s Military Mission Creep Advances to a New Front: Africa',
        saveCount: 123
      },
      {
        targetUrl: '/i/foo.html',
        title: '‘Breaches Everywhere’: Flooding Bursts Midwest Levees, and Tough Questions Follow',
        saveCount: 123
      }
    ],
    suggestedArticles: [
      {
        slug: 'title-1',
        topImageUrl:
          'https://pocket-image-cache.com/direct?resize=w2000&url=http%3A%2F%2Fstatic.nautil.us%2F8895_e572cc8a256bbf824c98a1278ffadc24.png',
        title: 'It’s Time These Ancient Women Scientists Get Their Due',
        publisher: publisher.theVerge
      },
      {
        slug: 'title-2',
        topImageUrl:
          'https://pocket-image-cache.com/direct?resize=w2000&url=https%3A%2F%2Fhbr.org%2Fresources%2Fimages%2Farticle_assets%2F2015%2F10%2Foct15-14-511824675.jpg',
        title: 'A Simple Formula for Changing Our Behavior',
        publisher: publisher.jamesClear
      },
      {
        slug: 'title-3',
        topImageUrl:
          'https://pocket-image-cache.com/direct?resize=w2000&url=https%3A%2F%2Fwww.outsideonline.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimg_600x600%2Fpublic%2F2017%2F01%2F09%2Flimits-of-endurance-wim-hof_s.jpg%3Fitok%3DFfhvenDM',
        title: 'The Science Behind Miracles',
        publisher: publisher.noLogoPublisher
      }
    ]
  }
}

const std = article.photosAndCaptions

article.medium = {
  ...std,
  item: {
    topImage: 'https://placeimg.com/1800/800/tech',
    domains: [
      {
        name: 'medium.com'
      }
    ]
  }
}

article.noAds = {
  ...std,
  showAds: false
}

article.noAuthors = {
  ...std,
  authorNames: []
}

export default article
