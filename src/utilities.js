export { sleep }
function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}