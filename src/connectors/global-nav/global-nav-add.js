import GlobalNavAdd from 'components/global-nav/tools/add/global-nav-add'

function GlobalNavAddConnected({ onClose }) {
  const onSubmit = (addUrl) => {
    console.log('Submit Add:', addUrl)
    onClose()
  }
  return <GlobalNavAdd onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavAddConnected
