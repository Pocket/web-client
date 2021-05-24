import { injectLibScript, injectInlineScript } from '@pocket/web-utilities'

const loadAdLibraries = () => {
  const makeAsync = true
  const attributes = null

  // Load Google Publisher Tags (GPT)
  injectLibScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js', attributes, makeAsync)

  /**
   * Add global defaults for GPT
   *    gptadslots: array that holds ad instances
   *    googletag: the googletag library instance or a stub with storage to list queued commands
   * */
  injectInlineScript(`
      var gptadslots = [];
      var googletag = googletag || {cmd:[]};
        `)

  /**
   * Downloads the apstag library, the library provided by Amazon Publisher Services (https://aps.amazon.com/aps/index.html).
   * We are using their Unified Ad Marketplace (UAM) product in our ads bidding for syndicated articles.
   * **/
  // injectInlineScript(`
  //     !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function() {q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q: []};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A ,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
  //       `)

  // // Initialize apstag
  // injectInlineScript(`
  //     apstag.init({
  //       pubID: 'b5681c2d-be1e-4459-80b9-044ba5354b39', adServer: 'googletag',
  //       simplerGPT: true
  //     });
  //       `)

  // Downloads the preliminary Pubwise library code
  injectLibScript(
    '//fdyn.pubwise.io/script/8bfeb37f-2e7b-4828-a1ef-65bed8f5f77c/v3/dyn/pre_pws.js',
    attributes,
    makeAsync
  )

  // Downloads the main Pubwise library code
  injectLibScript(
    '//fdyn.pubwise.io/script/8bfeb37f-2e7b-4828-a1ef-65bed8f5f77c/v3/dyn/pws.js',
    attributes,
    makeAsync
  )
}

export default loadAdLibraries
