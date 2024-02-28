const API_DOMAIN = process.env.REACT_APP_URL
if (
  API_DOMAIN
) {
  console.debug('Env loaded!')
} else {
  throw new Error('Please check env')
}
export {
  API_DOMAIN
}
