export const EXPIRATION_TIME_FOR_ACCESS_TOKEN = 1000 * 60 * 5
export const EXPIRATION_TIME_FOR_REFRESH_TOKEN = 1000 * 60 * 60 * 24
const API_DOMAIN = process.env.REACT_APP_URL
const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || ''

if (
  API_DOMAIN
  && PAYPAL_CLIENT_ID
) {
  console.debug('Env loaded!')
} else {
  throw new Error('Please check env')
}
export {
  API_DOMAIN,
  PAYPAL_CLIENT_ID
}
