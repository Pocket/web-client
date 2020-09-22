import Layout from 'layouts/main'

export default function MyList({ metaData = {} }) {
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <main>
        <h2>My List</h2>
      </main>
    </Layout>
  )
}
