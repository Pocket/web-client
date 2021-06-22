import queryString from 'query-string'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query }) {
  const myListLink = queryString.stringifyUrl({ url: '/my-list', query })

  return {
    redirect: {
      permanent: false,
      destination: myListLink
    }
  }
}
