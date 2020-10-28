import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'

function GlobalNavSearchConnected({ onClose }) {
  const onSubmit = (searchTerm) => {
    console.log('Submit Search:', searchTerm)
    onClose()
  }
  return <GlobalNavSearch onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavSearchConnected
