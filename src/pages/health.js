export default function Health() {}

export async function getServerSideProps({ res }) {
  res.status = 200
  res.end('ok')

  return { props: {} }
}
