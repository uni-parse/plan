export { sleep, eventPromise}
function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}

function eventPromise(target, event) {
  return new Promise(
    rs => target.addEventListener(event, rs, { once: true })
  )
}