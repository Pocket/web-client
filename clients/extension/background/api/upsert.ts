const gql = String.raw

export async function upsertItem(url: string) {
  const query = gql`
    mutation ItemUpsert($input: SavedItemUpsertInput!, $imageOptions: [CachedImageInput!]!) {
      upsertSavedItem(input: $input) {
        item {
          ... on Item {
            preview {
              image {
                cachedImages(imageOptions: $imageOptions) {
                  url
                  id
                }
              }
              title
              domain {
                name
              }
              url
              id
              source
              authors {
                id
                name
              }
            }
          }
        }
      }
    }
  `

  const body = JSON.stringify({
    variables: {
      input: {
        url
      },
      imageOptions: [
        {
          width: 80,
          id: 'ext',
          height: 80,
          fileType: 'PNG'
        }
      ]
    },
    query
  })

  // API url we will use for all pocket graph requests
  const API_URL = 'https://client-api.getpocket.com/'

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })

  console.log(response)
}
