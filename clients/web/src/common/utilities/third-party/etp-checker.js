/*
Enhanced Tracking Protection (ETP)

This is a reference to Firefox's ETP feature, https://blog.mozilla.org/blog/2019/09/03/todays-firefox-blocks-third-party-tracking-cookies-and-cryptomining-by-default/

Historically, this has effected the ad code here at Pocket, by the requirement to map ads revenue with a user's ETP level. The ETP level of the user is determined by the logic below, and sent via the googletag metadata; specifically `setTargeting`. So far, the main use case of this logic is to inform experiments.

Implementation summary:
  1. When the page calling this logic loads, we proceed to immediately create and append N iframes (one per study in `studies`) to the page
  2. Each of these iframes' `src` attribute corresponds to its study's domain and page
  3. The logic _within_ cookie_access_test.html in each iframe attempts to write a cookie on the page viewer's browser, and emit an event describing a success or failure to write
  4. Because each domain exists on a different level of the ETP blocked list, we can use the combination of the events in step #4 to determine the page viewer's ETP level (set on their browser-level)
  5. We resolve the initial promise with the ETP value

  ** Special care is also taken on the Firefox side to keep an allowed list of domains that may run this logic https://github.com/mozilla/dummytracker, and we do some level of origin checking in the logic here as well
 */

const studies = {
  etp1: {
    domain: 'https://etp-experiment-1.dummytracker.org',
    page: '/cookie_access_test.html'
  },
  etp2: {
    domain: 'https://etp-experiment-2.dummytracker.org',
    page: '/cookie_access_test.html'
  }
}

const DEFAULT_MAX_WAIT = 5 * 1000 // 5 seconds

export const getEtpValue = (maxWaitInMilliseconds = DEFAULT_MAX_WAIT) => {
  // ensures ETP calculation does not delay subsequent logic by more then n milliseconds.
  // Wait time can be adjusted for each use case
  const timeoutEtpCalculation = new Promise(function (resolve) {
    setTimeout(() => resolve('etp-study-timed-out'), maxWaitInMilliseconds)
  })
  const calculateEtpValue = new Promise((resolve) => {
    const { etp1, etp2 } = studies

    let etp1PromiseDeferred
    let etp1Promise = new Promise(function (resolve, reject) {
      etp1PromiseDeferred = { resolve: resolve, reject: reject }
    })

    let etp2PromiseDeferred
    let etp2Promise = new Promise(function (resolve, reject) {
      etp2PromiseDeferred = { resolve: resolve, reject: reject }
    })

    function receiveMessage(event) {
      if (event.origin === etp1.domain) {
        etp1Promise = etp1PromiseDeferred.resolve(cookiesBlocked(event.data))
      } else if (event.origin === etp2.domain) {
        etp2Promise = etp2PromiseDeferred.resolve(cookiesBlocked(event.data))
      }
    }

    /**
     * Returns true if cookies are blocked
     * @param data
     * @returns {boolean}
     */
    function cookiesBlocked(data) {
      return data === 'no_cookies'
    }

    Promise.all([etp1Promise, etp2Promise]).then(function (values) {
      const [isEtp1Blocked, isEtp2Blocked] = values

      let etpLevel
      if (isEtp1Blocked && !isEtp2Blocked) {
        etpLevel = 'etp-level-2'
      } else if (!isEtp1Blocked && isEtp2Blocked) {
        etpLevel = 'etp-level-1'
      } else {
        etpLevel = 'not-in-study'
      }

      resolve(etpLevel)
    })

    window.addEventListener('message', receiveMessage, false)

    const testOrigin = document.location.hostname

    var etp1Frame = document.createElement('iframe')
    etp1Frame.setAttribute('id', 'etp1Frame')
    etp1Frame.setAttribute('style', 'display: none; width:0; height:0; border:0; border:none;')
    document.body.appendChild(etp1Frame)
    etp1Frame.setAttribute('src', `${etp1.domain}${etp1.page}?test_origin=${testOrigin}`)

    var etp2Frame = document.createElement('iframe')
    etp2Frame.setAttribute('id', 'etp2Frame')
    etp2Frame.setAttribute('style', 'display: none; width:0; height:0; border:0; border:none;')
    document.body.appendChild(etp2Frame)
    etp2Frame.setAttribute('src', `${etp2.domain}${etp2.page}?test_origin=${testOrigin}`)
  })

  return Promise.race([calculateEtpValue, timeoutEtpCalculation])
}
