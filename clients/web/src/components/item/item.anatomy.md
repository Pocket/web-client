# Anatomy of an item

## Image

Image associated with the article. If no images are associated we generate a fallback to fill the space.

### Derived from:

- thumbnail — Explicitly set by the curation team
- topImageUrl — Parsed from og:image
- images[0] — The first image in the array of images contained in the article
- placeholder — Fallback generated based on the first letter of the title and a color derived from a hash of the id applied with a odulus operator `%` against an array of acceptable colors.

---

## Title

Title of the item/collection/syndicated article. This is subject to clamping depending on the layout in the current setup.

### Derived from:

- curatedTitle — Explicitly set by the curation team
- collectionTitle — Title of the generated collection
- itemTitle — Title provided by the parser
- fileName — Name of a specific file that's been saved to Pocket
- url — The url that was saved

---

## Excerpt

Excerpt generated from the content of the article. Generally this is pulled from meta-data if it exists, and otherwise is derived from article content

### Derived from:

- curatedExcerpt — Explicitly set by the curation team
- collectionsExcerpt — Explicitly set by the curation team
- itemExcerpt — pulled from the saved item TBD

---

## Publisher

The publisher name to display on the item

### Derived from:

- syndicatedPublisher — Explicitly set by the curation team
- collectionsPublisher — Hardcoded as 'Pocket'
- curatedInfoPublisher — Explicitly set by the curation team
- domainMetadata — Metadata from a domain, originally populated from ClearBit
- domain — domain derived from the parser based on the resolved url
- regex — domain derived from the client based on the given url
- null

---

## Authors

Author(s) of the article

### Derived from:

- curatedAuthors — Explicitly set by the curation team
- itemAuthors — TBD

---

## Read time

The time it will take to read the article.

### Derived from:

- itemTimeToRead — time to read coming from the server

---

## isImage

Is the item an image

### Derived from :

- hasImage - value 2 (comes from the parser so won't always be available)

---

## isVideo

Is the item a video

### Derived from :

- hasVideo - value 2 (comes from the parser so won't always be available)

---

## fromPartner

From within the collection display, if True, the story is provided by a partner and should be displayed as such

### Derived from:

- Explicitly set by the curation team

---

## partnership

If a collection was made in partnership with an external company, this entity will hold all required info about that partnership.

### Derived from:

- Explicitly set by the curation team

---

## isSyndicated

Indicator if the article is syndicated by Pocket

### Derived from

- Checks for the presence of syndicated metadata on the item

---

## isInternalItem

Check whether the article will require the user to leave Pocket or if it will open in reader view

### Derived from:

- itemIsCollection — TRUE (opens the orignial collection)
- itemIsSyndicated — TRUE (does not open the original syndicated article)
- hasValidReadUrl — TRUE (this indicates the item can be parsed)

#### PROPOSAL

- isParsed — having a clear indicator whether something has been parsed would reduce the need for the regex.

---

## isCollection

Whether an item is a collection built by the curation team

### Derived from:

- itemHasStories — if an item has stories attached it is a collection
- urlMatching — if a url meets certain requirements through a regex

#### PROPOSAL

- isCollection — simple boolean where truthiness is applied to all items that are valid collections

---

## permanentUrl

A derived url for premium users

### Dervied from:

- generated on the client side based on itemId

#### PROPOSAL

If this came from the server it would allow us to easily modify and enhange this service

---

## Analytics:Id

Identifier to use with analytics

### Derived From:

- CorpusRecommendationId — This is passed in for recommendations (it holds position data on the server)
- ItemId — Standard itemId, usually requires accompanying position to be passed in as well

---

## Analytics:URL

### Derived from:

- savedItemUrl — This is the givenUrl which is the most reliable url
