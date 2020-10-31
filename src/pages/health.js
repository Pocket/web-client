export default function Health() {}

export async function getServerSideProps({ res, req }) {
  res.status = 200
  res.end('ok')

  return { props: {} }
}
