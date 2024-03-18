export const errorCodes = {
  1: {
    name: 'ERROR_INVALID',
    desc: 'Invalid request, please refer to API documentation.'
  },
  2: {
    name: 'ERROR_LOGIN',
    desc: 'The username or password was incorrect.'
  },
  4: {
    name: 'ERROR_RATE_LIMIT',
    desc: 'The application has made too many requests in the past hour.'
  },
  5: {
    name: 'ERROR_USER_RATE_LIMIT',
    desc: 'The user has made too many requests in the past hour.'
  },
  6: {
    name: 'ERROR_ACCOUNT_LOCKED',
    desc: "Login has been disabled for this account. <a href='http://help.getpocket.com/customer/portal/articles/1750649-login-has-been-disabled-for-my-account'>Learn more</a>"
  },
  8: {
    name: 'ERROR_ACCOUNT_LOCKED_API',
    desc: 'Login has been disabled for this account.'
  },
  9: {
    name: 'ERROR_HONEYPOT',
    desc: "We've encountered an error. Please try again later."
  },
  330: {
    name: 'ERROR_INVALID_USERNAME',
    desc: 'Invalid username, please only use letters, numbers, and/or dashes and between 1-20 characters.'
  },
  331: {
    name: 'ERROR_INVALID_PASSWORD',
    desc: 'Please enter at least 6 characters.',
    field: 'password'
  },
  332: {
    name: 'ERROR_USERNAME_TAKEN',
    desc: 'The username you selected is already taken.'
  },
  333: {
    name: 'ERROR_INVALID_EMAIL',
    desc: 'Please enter a valid email address.',
    field: 'email'
  },
  334: {
    name: 'ERROR_EMAIL_TAKEN',
    desc: 'This email address is already registered.',
    field: 'email'
  },
  335: {
    name: 'ERROR_NO_CHANGES',
    desc: 'You did not make any changes.'
  },
  336: {
    name: 'ERROR_WRONG_PASSWORD',
    desc: 'The existing password that you entered did not match your account.'
  },
  337: {
    name: 'ERROR_BLOCKED_EDIT_ACCOUNT',
    desc: "We're sorry, but this version of Pocket is unable to edit your account. Please use http://getpocket.com/pass from your computer."
  },
  338: {
    name: 'ERROR_ALIAS_ALREADY_EXISTS',
    desc: 'You have already added this email address to your Pocket account.'
  },
  339: {
    name: 'ERROR_ALIAS_ALREADY_EXISTS_UNCONFIRMED',
    desc: 'This email address is already assigned to your Pocket account, but is unconfirmed. A new confirmation email has been sent. Please follow the instructions in this email to confirm your address.'
  },
  340: {
    name: 'ERROR_ALIAS_NOT_IN_ACCOUNT',
    desc: 'The requested email could not be found in your account.'
  },
  341: {
    name: 'ERROR_ACCESS_TOKEN_REQUIRED',
    desc: 'A valid access token is required to access the requested API endpoint.'
  },
  342: {
    name: 'ERROR_UPGRADE_FAILURE',
    desc: 'Pocket encountered a restore error and needs to be reset by logging out. Your saved items will be synced automatically when you log back in.'
  },
  1900: {
    name: 'ERROR_USER_NOT_FOUND',
    desc: 'No user found.'
  },
  4108: {
    name: 'OAUTH_MISSING_ACCESS_TOKEN',
    desc: 'Missing access token.'
  },
  4109: {
    name: 'OAUTH_CONSUMER_KEY_ACCESS_TOKEN_MISMATCH',
    desc: 'Consumer key and access token do not match.'
  },
  4010: {
    name: 'ERROR_MISSING_APIKEY',
    desc: 'Missing API key.  Get an API key at http://getpocket.com/api/.'
  },
  4011: {
    name: 'ERROR_DISABLED_APIKEY',
    desc: 'This API key has been disabled. Please contact support.'
  },
  4012: {
    name: 'ERROR_INVALID_VERIFYKEY',
    desc: 'Invalid or missing verify key. Contact support for help with private key API.'
  },
  4013: {
    name: 'ERROR_INVALID_APIKEY',
    desc: 'Invalid API key.  Get an API key at http://getpocket.com/api/.'
  },
  4014: {
    name: 'ERROR_CONSUMER_KEY_NOT_FOUND',
    desc: 'This Consumer Key was not found. You can create a Consumer Key at http://getpocket.com/api/.'
  },
  4015: {
    name: 'ERROR_CONSUMER_KEY_MISMATCH',
    desc: 'The Consumer Key does not match the one assigned to the Access Token.'
  },
  4016: {
    name: 'ERROR_ACCESS_NOT_PERMITTED',
    desc: 'The provided keys do not have access to the requested API endpoint.'
  },
  4017: {
    name: 'ERROR_NO_PERMISSION',
    desc: 'The provided keys do not have proper permission (e.g., add, modify, retrieve) to access requested API endpoint.'
  },
  4018: {
    name: 'ERROR_ANDROID_Y2K',
    desc: 'Your Pocket app needs to be updated in order to sync. Please update today in Google Play, or wherever you download apps.'
  },
  4110: {
    name: 'OAUTH_REQUEST_TOKEN_ALREADY_USED',
    desc: 'Request token already used.'
  },
  4111: {
    name: 'OAUTH_USER_NOT_FOUND',
    desc: 'User not found.'
  },
  4138: {
    name: 'OAUTH_MISSING_CONSUMER_KEY',
    desc: 'Missing consumer key.'
  },
  4139: {
    name: 'OAUTH_INVALID_RESPONSE_TYPE',
    desc: 'Invalid response type.'
  },
  4140: {
    name: 'OAUTH_MISSING_REDIRECT_URI',
    desc: 'Missing redirect uri.'
  },
  4141: {
    name: 'OAUTH_INVALID_POCKET_CONSUMER_KEY',
    desc: 'Invalid Pocket consumer key.'
  },
  4142: {
    name: 'OAUTH_MISSING_REQUEST_TOKEN',
    desc: 'Missing request token.'
  },
  4143: {
    name: 'OAUTH_MISSING_HASH',
    desc: 'Missing hash.'
  },
  4144: {
    name: 'OAUTH_MISSING_OAUTH_TIMESTAMP',
    desc: 'Missing oauth_timestamp.'
  },
  4145: {
    name: 'OAUTH_MISSING_OAUTH_NONCE',
    desc: 'Missing oauth_nonce.'
  },
  4146: {
    name: 'OAUTH_MISSING_PERMISSION',
    desc: 'Missing permission.'
  },
  4147: {
    name: 'OAUTH_INVALID_PERMISSION',
    desc: 'Invalid permission.'
  },
  4148: {
    name: 'OAUTH_MISSING_APPROVE_FLAG',
    desc: 'Missing approve flag.'
  },
  4149: {
    name: 'OAUTH_INVALID_APPROVE_FLAG',
    desc: 'Invalid approve flag.'
  },
  4152: {
    name: 'OAUTH_INVALID_CONSUMER_KEY',
    desc: 'Invalid consumer key.'
  },
  4153: {
    name: 'OAUTH_INVALID_HASH',
    desc: 'Invalid hash.'
  },
  4154: {
    name: 'OAUTH_INVALID_REQUEST_TOKEN',
    desc: 'Invalid request token.'
  },
  4155: {
    name: 'OAUTH_PERMISSION_DOES_NOT_MATCH',
    desc: 'Permission does not match authorized.'
  },
  4156: {
    name: 'OAUTH_CREDENTIAL_AUTH_NOT_PERMITTED',
    desc: 'Credential authorization not permitted for consumer key.'
  },
  4157: {
    name: 'OAUTH_INVALID_LOGIN',
    desc: 'The username or password was incorrect.'
  },
  4158: {
    name: 'OAUTH_USER_REJECTED_CODE',
    desc: 'User rejected code.'
  },
  4159: {
    name: 'OAUTH_ALREADY_USED_CODE',
    desc: 'Already used code.'
  },
  4180: {
    name: 'OAUTH_INVALID_GRANT_TYPE',
    desc: 'Invalid grant type.'
  },
  4181: {
    name: 'OAUTH_INVALID_REDIRECT_URI',
    desc: 'Invalid redirect uri.'
  },
  4182: {
    name: 'OAUTH_MISSING_CODE',
    desc: 'Missing code.'
  },
  4183: {
    name: 'OAUTH_MISSING_USERNAME',
    desc: 'Missing username.'
  },
  4184: {
    name: 'OAUTH_MISSING_PASSWORD',
    desc: 'Missing password.'
  },
  4185: {
    name: 'OAUTH_CODE_NOT_FOUND',
    desc: 'Code not found.'
  },
  4186: {
    name: 'OAUTH_MISSING_TOKEN',
    desc: 'Missing token.'
  },
  4187: {
    name: 'OAUTH_INVALID_TOKEN',
    desc: 'Token does not match a Pocket account.'
  },
  4188: {
    name: 'OAUTH_MISSING_APP_ID',
    desc: 'Missing app id.'
  },
  4189: {
    name: 'OAUTH_INVALID_APP_ID',
    desc: 'Invalid app id.'
  },
  4190: {
    name: 'OAUTH_REVERSE_MISSING_ACCESS_TOKEN',
    desc: 'Reverse auth - missing access token.'
  },
  4191: {
    name: 'OAUTH_REVERSE_CONSUMER_KEY_ACCESS_TOKEN_MISMATCH',
    desc: 'Reverse auth - consumer key and access token do not match.'
  },
  4192: {
    name: 'ERROR_COULD_NOT_PARSE_JSON',
    desc: "The API could not parse the request's JSON. Please ensure it is formatted and encoded correctly."
  },
  5000: {
    name: 'ERROR_INVALID_IMAGE',
    desc: 'The image you provided was invalid.'
  },
  5001: {
    name: 'ERROR_MISSING_PREFERENCES_DATA',
    desc: 'No preferences data available for specified user.'
  },
  5101: {
    name: 'ERROR_SSO_WRONG_TYPE',
    desc: 'We were unable to process your request (error 5101).'
  },
  5102: {
    name: 'ERROR_SSO_INVALID_GOOGLE_ID_TOKEN',
    desc: 'We were unable to validate the token from Google (error 5102).'
  },
  5103: {
    name: 'ERROR_SSO_INVALID_SOURCE',
    desc: 'We were unable to process your request (error 5103).'
  },
  5104: {
    name: 'ERROR_SSO_GOOGLE_LOGIN',
    desc: 'Unable to find Pocket account for Google user.'
  },
  5105: {
    name: 'ERROR_SSO_USER_NOT_FOUND',
    desc: 'User not found.'
  },
  5106: {
    name: 'ERROR_UNABLE_TO_REGISTER_USER',
    desc: 'We were unable to create your account (error 5106).'
  },
  5107: {
    name: 'ERROR_INVALID_WEB',
    desc: 'We were unable to process your request. Please refresh the page and try again (error 5107).'
  },
  5108: {
    name: 'ERROR_SSO_FIREFOX_LOGIN',
    desc: 'Unable to find Pocket account for Firefox user.'
  },
  5109: {
    name: 'ERROR_SSO_INVALID_FIREFOX_TOKEN',
    desc: 'We were unable to validate the token from Firefox (error 5109).'
  },
  5200: {
    name: 'ERROR_PREMIUM_ACCESS_REQUIRED',
    desc: 'Premium access is required.'
  },
  5201: {
    name: 'ERROR_SUGGESTED_TAGS_NO_TAGS_GENERAL',
    desc: "We're having trouble retrieving suggested tags. Please try again."
  },
  5202: {
    name: 'ERROR_SUGGESTED_TAGS_NO_TAGS',
    desc: 'We were unable to find any suggested tags for this item.'
  },
  5203: {
    name: 'ERROR_PREMIUM_SEARCH_NOT_READY',
    desc: 'Pocket is preparing Full-Text Search for your account and it will be available soon. Standard search results are currently being shown.'
  },
  5204: {
    name: 'ERROR_PREMIUM_SEARCH_GENERAL',
    desc: "We're having trouble completing your search. Please try again."
  },
  5300: {
    name: 'ERROR_PURCHASE_INVALID_SOURCE',
    desc: 'Invalid purchase source.'
  },
  5301: {
    name: 'ERROR_PURCHASE_VALIDATION',
    desc: 'We were unable to validate your purchase.'
  },
  5302: {
    name: 'ERROR_USER_SUBSCRIPTION_NOT_FOUND',
    desc: 'Subscription details not found.'
  },
  5303: {
    name: 'ERROR_STRIPE_INCORRECT_NUMBER',
    desc: 'Your card number is incorrect.',
    field: 'number'
  },
  5304: {
    name: 'ERROR_STRIPE_INVALID_NUMBER',
    desc: 'Please enter a valid credit card number.',
    field: 'number'
  },
  5305: {
    name: 'ERROR_STRIPE_INVALID_EXPIRY_MONTH',
    desc: 'Please enter a valid month.',
    field: 'exp_month'
  },
  5306: {
    name: 'ERROR_STRIPE_INVALID_EXPIRY_YEAR',
    desc: 'Please enter a valid year.',
    field: 'exp_year'
  },
  5307: {
    name: 'ERROR_STRIPE_INVALID_CVC',
    desc: 'Please enter a valid security code.',
    field: 'cvc'
  },
  5308: {
    name: 'ERROR_STRIPE_EXPIRED_CARD',
    desc: 'Your card has expired.',
    field: 'exp_year'
  },
  5309: {
    name: 'ERROR_STRIPE_INCORRECT_CVC',
    desc: 'The security code was not accepted.',
    field: 'cvc'
  },
  5310: {
    name: 'ERROR_STRIPE_CARD_DECLINED',
    desc: 'Your card was declined. Please try a different card.'
  },
  5311: {
    name: 'ERROR_STRIPE_MISSING',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5311]'
  },
  5312: {
    name: 'ERROR_STRIPE_CARD_ERROR',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5312]'
  },
  5313: {
    name: 'ERROR_STRIPE_INVALID_REQUEST',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5313]'
  },
  5314: {
    name: 'ERROR_STRIPE_AUTHENTICATION_ERROR',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5314]'
  },
  5315: {
    name: 'ERROR_STRIPE_API_CONNECT_ERROR',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5315]'
  },
  5316: {
    name: 'ERROR_STRIPE_GENERIC_ERROR',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5316]'
  },
  5317: {
    name: 'ERROR_STRIPE_GENERIC_PURCHASE_ERROR',
    desc: 'An error occurred while processing your card, and it has not been charged. Please try again. [5317]'
  },
  5318: {
    name: 'ERROR_PURCHASE_ALREADY_HAS_PREMIUM',
    desc: 'Your account already has Premium access.'
  },
  5319: {
    name: 'ERROR_PURCHASE_NO_RECEIPT_DATA',
    desc: 'An error occurred while retrieving the receipt data.'
  },
  5320: {
    name: 'ERROR_PURCHASE_NO_TRANSACTION_LOG',
    desc: 'An error occurred while retrieving the purchase transaction log.'
  },
  5321: {
    name: 'ERROR_PURCHASE_INVALID_PROMO_CODE',
    desc: 'Please enter a valid promo code.'
  },
  5400: {
    name: 'ERROR_SOCIAL_GENERIC',
    desc: 'Unable to register with service.'
  },
  5401: {
    name: 'ERROR_SOCIAL_MISSING_USER',
    desc: 'Missing user.'
  },
  5402: {
    name: 'ERROR_SOCIAL_MISSING_SERVICE',
    desc: 'Missing service.'
  },
  5403: {
    name: 'ERROR_TWITTER_INVALID_OAUTH_TOKEN',
    desc: 'Invalid oauth token.'
  },
  5404: {
    name: 'ERROR_TWITTER_INVALID_OAUTH_TOKEN_SECRET',
    desc: 'Invalid oauth token secret.'
  },
  5405: {
    name: 'ERROR_FACEBOOK_INVALID_ACCESS_TOKEN',
    desc: 'Invalid access token.'
  },
  5406: {
    name: 'ERROR_FACEBOOK_INVALID_SIGNED_REQUEST',
    desc: 'Invalid signed request.'
  },
  5407: {
    name: 'ERROR_SOCIAL_INVALID_SERVICE',
    desc: 'Invalid service.'
  },
  5500: {
    name: 'ERROR_POST_NOT_FOUND',
    desc: 'The requested post could not be found.'
  },
  6000: {
    name: 'PASSWORDS_DO_NOT_MATCH',
    desc: 'The passwords you entered do not match'
  }
}
