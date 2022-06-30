const publisher = {
  theVerge: {
    name: 'The Verge',
    recommendationName: 'The Verge',
    url: 'http://theverge.com/?utm_source=pocket',
    showAuthors: true,
    useDomainOnrelatedItems: false,
    logo: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/verge.jpg',
    logoWideBlack: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5ce5c763e1808.png',
    logoWide: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5cbe36a3bdf4d.png',
    domains: ['theverge.com', 'somethingelse.com'],
    articleCta: null
  },
  jamesClear: {
    //publisher who is also an author
    name: 'James Clear',
    recommendationName: 'James Clear',
    url: 'http://jamesclear.com/?utm_source=pocket',
    showAuthors: false,
    useDomainOnrelatedItems: false,
    logo: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/jamesclear.jpg',
    logoWide: null,
    logoWideBlack: null,
    domains: ['jamesclear.com'],
    articleCta: null
  },
  noLogoPublisher: {
    name: 'No Logo Times',
    recommendationName: 'No Logo Times',
    url: 'http://nltimes.com/?utm_source=pocket',
    showAuthors: false,
    useDomainOnrelatedItems: false,
    logo: null,
    logoWide: null,
    logoWideBlack: null,
    domains: ['nltimes.com'],
    articleCta: null
  },
  theAtlantic: {
    id: 22,
    name: 'The Atlantic',
    recommendationName: 'The Atlantic',
    url: 'http://theatlantic.com/?utm_source=pocket',
    logo: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/theatlantic.jpg',
    logoWide: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5dcc1c19d9cba.png',
    logoWideBlack: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5cdc881b3f7fb.png',
    showAuthors: true,
    domains: ['theatlantic.com'],
    attributeCanonicalToPublisher: false,
    articleCta: {
      url: 'https://www.theatlantic.com/follow-the-atlantic/',
      leadIn: 'Make your inbox more interesting.',
      text: "Get The Atlantic's Daily newsletter"
    }
  },
  kiplinger: {
    id: 32,
    name: 'Kiplinger',
    recommendationName: 'Kiplinger',
    url: 'https://www.kiplinger.com/',
    logo: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5cddb9d622b0f.png',
    logoWide: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5cdf07c8991e1.png',
    logoWideBlack: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5ce5ca607c9f7.png',
    showAuthors: true,
    domains: ['kiplinger.com'],
    attributeCanonicalToPublisher: true,
    articleCta: {
      url: 'https://www.kiplinger.com/generic/retirement/T063-C000-S001-sign-up-for-kiplinger-today-free.html?source=pocket',
      leadIn: 'Want advice on creating a more profitable future?',
      text: 'Get the Kiplinger Today newsletter'
    }
  }
}

export default publisher
