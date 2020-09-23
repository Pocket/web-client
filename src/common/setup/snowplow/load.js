import { injectInlineScript } from 'common/utilities/inject-script'
import { SNOWPLOW_SCRIPT_URL } from 'common/constants'

/**
 * Load the Snowplow script onto the page. Should be called within the document <head>.
 * @param {String} snowplowInstanceName   Name of snowplow function instance.
 */
export function loadSnowplow(snowplowInstanceName) {
  // this script is provided by Snowplow, and was added along with v2.14.0 of the
  // tracking script that we publish in our CI deploy step.
  injectInlineScript(`;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
    p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
    };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
    n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","${SNOWPLOW_SCRIPT_URL}","${snowplowInstanceName}"));`)
}
