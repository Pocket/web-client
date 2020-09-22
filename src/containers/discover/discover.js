import Layout from 'layouts/main'

export default function Discover({ metaData = {} }) {
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <main>
        <h2>Discover</h2>
      </main>
    </Layout>
  )
}
