import { useEffect } from 'react'

export default function Waypoint({ serverCookies }) {
  useEffect(() => {
    console.log(serverCookies)
  }, [serverCookies])

  return <div></div>
}

export async function getServerSideProps({ res, req }) {
  const serverCookies = req.cookies
  return { props: { serverCookies } }
}
