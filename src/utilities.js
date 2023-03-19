export { sleep, eventPromise, range }
function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}

function eventPromise(target, event) {
  return new Promise(
    rs => target.addEventListener(event, rs, { once: true })
  )
}

function range(from, to) {
  const range = []
  for (let i = from; i <= to; i++) range.push(i)
  return range
}