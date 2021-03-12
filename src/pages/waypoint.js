import { getUserInfo } from 'common/api/user'
export default function Waypoint() {}

export async function getServerSideProps({ res, req }) {
  console.log(req.cookies.sess_guid)

  res.status = 200
  res.end('ok')

  return { props: {} }

  // return {
  //   redirect: {
  //     destination: '/home',
  //     permanent: false
  //   }
  // }
}
