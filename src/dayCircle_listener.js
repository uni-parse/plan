import { eventPromise } from "./utilities"

export function selectListener() {
  const dayCircleCtx = document.querySelector('#dayCircleCtx')

  //prevent drag n drop
  dayCircleCtx.style.touchAction = 'none'
  dayCircleCtx.ondragstart = () => false

  dayCircleCtx.onpointerdown = pointerdownHandler
}

async function pointerdownHandler(e) {
  e.preventDefault() //prevent selecting
  if (coords(e) == '0.0.0') return

  select(e)

  const coords0 = coords(e)
  console.log(coords0)

  const dayCircleCtx = e.currentTarget
  let newCoords
  dayCircleCtx.onpointerover = e => {
    if (['0.0.0', coords0, newCoords].includes(coords(e)))
      return

    newCoords = coords(e)
    console.log(newCoords)

    select(e)
  }

  await eventPromise(dayCircleCtx, 'pointerup')
  dayCircleCtx.onpointerover = null
}


//helpers
function coords({ target }) {
  let minutes = 0, hour = 0, threeHours = 0

  if (target.classList.contains('minutes')) {
    minutes = target.dataset.minutes
    hour = target.parentElement.children[6].dataset.hour
    threeHours = Math.ceil(hour / 3)
  }
  else if (target.classList.contains('hour')) {
    hour = target.dataset.hour
    threeHours = Math.ceil(hour / 3)
  }
  else if (target.classList.contains('threeHours')) {
    threeHours = target.dataset.threeHours
  }

  return `${threeHours}.${hour}.${minutes}`
}

function select({ target }) {
  if (target.classList.contains('minutes'))
    target.style.background = 'teal'
  else if (target.classList.contains('hour'))
    target.style.background = 'darkorange'
  else if (target.classList.contains('threeHours'))
    target.style.background = 'yellowgreen'
}