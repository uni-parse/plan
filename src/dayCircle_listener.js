import { eventPromise } from "./utilities"

export function selectListener() {
  const dayCircleCtx = document.querySelector('#dayCircleCtx')

  //prevent drag n drop
  dayCircleCtx.style.touchAction = 'none'
  dayCircleCtx.ondragstart = () => false

  dayCircleCtx.onpointerdown = pointerdownHandler
}

async function pointerdownHandler(e_down) {
  e_down.preventDefault() //prevent selecting

  const coords0 = coords(e_down)
  if (!coords0) return
  //console.log(coords0)

  select(e_down)

  const dayCircleCtx = e_down.currentTarget
  let prevCoords

  dayCircleCtx.onpointerover = e_over => {
    const currentCoords = coords(e_over)

    if ([0, coords0, prevCoords].includes(currentCoords))
      return

    const distance = getDistance(coords0, currentCoords)
    if (!distance) return
    console.log(`${coords0} ${currentCoords} ${distance}`)

    //selectDistance(distance, e_down, e_over)
    select(e_over)

    prevCoords = currentCoords
  }

  await eventPromise(dayCircleCtx, 'pointerup')
  dayCircleCtx.onpointerover = null
}

//helpers
function selectDistance(distance, e_down, e) {
  const threeHours = Math.floor(distance / 18)
  const hour = Math.floor((distance - threeHours * 18) / 6)
  const minutes = distance - threeHours * 18 - hour * 6

  console.log(`${threeHours},${hour},${minutes}`)
}

function getDistance(coords0, currentCoords) {
  const
    th0 = Math.floor(coords0 / 100),
    h0 = Math.floor(coords0 % 100 / 10),
    m0 = coords0 % 10,

    th1 = Math.floor(currentCoords / 100),
    h1 = Math.floor(currentCoords % 100 / 10),
    m1 = currentCoords % 10,

    th = th1 - th0,
    h = h1 - h0,
    m = m1 - m0,

    fromThreeHours = !h0 && !m0,
    fromHour = h0 && !m0,
    fromMinutes = !!m0,

    toThreeHours = !h1 && !m1,
    toHour = h1 && !m1,
    toMinutes = !!m1

  let total

  if (!th && ( // navigate => child || parent || ansestor
    fromThreeHours // => hour || minutes
    || fromHour && (toThreeHours || toMinutes && !h)
    || fromMinutes && (toThreeHours || toHour && !h)
  )) total = 0
  else if (fromThreeHours) {
    if (toThreeHours) total = th * 18
    else if (toHour) total = (th - 1) * 18 + h * 6
    else if (toMinutes) total = (th - 1) * 18 + (h - 1) * 6 + m
  }
  else if (fromHour) {
    if (toThreeHours) total = (th + 1) * 18 + h * 6
    else if (toHour) total = th * 18 + h * 6
    else if (toMinutes) total = th * 18 + (h - 1) * 6 + m
  }
  else if (fromMinutes) {
    if (toThreeHours) total = (th + 1) * 18 + (h + 1) * 6 + m
    else if (toHour) total = th * 18 + (h + 1) * 6 + m
    else if (toMinutes) total = th * 18 + h * 6 + m
  }

  //console.log(`${coords0} ${currentCoords} ${total}(${th},${h},${m})`)

  return total > 0 ? total : 0
}

function coords({ target }) {
  let minutes = 0, hour = 0, threeHours = 0

  if (target.classList.contains('minutes')) {
    minutes = +target.dataset.minutes
    const h = +target.parentElement.children[6].dataset.hour
    hour = h % 3 || 3
    threeHours = Math.ceil(h / 3)
  } else if (target.classList.contains('hour')) {
    const h = +target.dataset.hour
    hour = h % 3 || 3
    threeHours = Math.ceil(h / 3)
  } else if (target.classList.contains('threeHours'))
    threeHours = +target.dataset.threeHours

  //return `${threeHours}.${hour}.${minutes}`
  return (threeHours * 100) + (hour * 10) + minutes
}

function select({ target }) {
  if (target.classList.contains('minutes'))
    target.style.background = 'teal'
  else if (target.classList.contains('hour'))
    target.style.background = 'darkorange'
  else if (target.classList.contains('threeHours'))
    target.style.background = 'yellowgreen'
}