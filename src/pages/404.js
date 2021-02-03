import ErrorPage from 'containers/_error/error.js'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default function Client404() {
  return <ErrorPage statusCode={404} />
}
