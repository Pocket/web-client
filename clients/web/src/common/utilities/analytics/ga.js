/* global gtag */
export const pageview = (url) => {
  // This is the way google suggestes handling SPAs
  gtag('set', 'page_path', url)
  gtag('event', 'page_view')

  // This is how every blog thinks it should be done
  // gtag('config', GOOGLE_ANALYTICS_ID, {
  //   page_path: url
  // })
}

export const event = ({ action, category, label, value, nonInteraction }) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    nonInteraction
  })
}

const GA = { pageview, event }
export default GA
