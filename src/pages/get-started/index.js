import queryString from 'query-string'

export async function getServerSideProps({ query }) {
  // We are passing users that come here to home since this launched post home landing page
  const homeLink = queryString.stringifyUrl({ url: '/home', query })

  return {
    redirect: {
      permanent: false,
      destination: homeLink
    }
  }
}

export default function GetStarted() {}
