/**
 * VALIDATE EMAIL
 * @param {string} email entered email to validate
 * @param {bool} whether email submitted is valid
 *
 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
export function validateEmail(email) {
  // eslint-disable-next-line
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
