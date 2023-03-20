import { eventPromise} from "./utilities"
import { selectDist } from "./listiner_selectDist"

export function selectListener() {
  const dayCircleCtx = document.querySelector('#dayCircleCtx')

  //prevent drag n drop
  dayCircleCtx.style.touchAction = 'none'
  dayCircleCtx.ondragstart = () => false

  dayCircleCtx.onpointerdown = pointerdownHandler
}

async function pointerdownHandler(e) {
  e.preventDefault() //prevent selecting

  const coords0 = getCoords(e)
  if (!coords0) return
  //console.log(coords0)

  //select(e.target)


  const dayCircleCtx = e.currentTarget
  const elsCache = new Set()
  const els = {
    th: document.querySelectorAll('.threeHours'),
    h: document.querySelectorAll('.hour'),
    m: document.querySelectorAll('.minutes')
  }
  let prevCoords

  dayCircleCtx.onpointerover = e => {
    //reset cache
    elsCache.forEach(el => el.style.background = '')
    elsCache.clear()

    const currentCoords = getCoords(e)
    if ([
      0,
      coords0,
      //prevCoords
    ].includes(currentCoords))
      return

    const dist = selectDist(coords0, currentCoords, elsCache, els)
    if (!dist) return
    //console.log(`${coords0} ${currentCoords} ${dist}`)

    elsCache.forEach(el => select(el))

    prevCoords = currentCoords
  }

  await eventPromise(dayCircleCtx, 'pointerup')
  dayCircleCtx.onpointerover = null

  //reset cache
  elsCache.forEach(el => el.style.background = '')
  elsCache.clear()
}

//helpers
function getCoords({ target }) {
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

function select(el) {
  el.style.background = 'red'
  return

  if (el.classList.contains('minutes'))
    el.style.background = 'teal'
  else if (el.classList.contains('hour'))
    el.style.background = 'darkorange'
  else if (el.classList.contains('threeHours'))
    el.style.background = 'yellowgreen'
}