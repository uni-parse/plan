import { eventPromise } from "./utilities"

export function selectListener() {
  const dayCircleCtx = document.querySelector('#dayCircleCtx')

  //prevent drag n drop
  dayCircleCtx.style.touchAction = 'none'
  dayCircleCtx.ondragstart = () => false

  dayCircleCtx.addEventListener('pointerdown', async e => {
    e.preventDefault() //prevent selecting
    if (!select(e)) return

    dayCircleCtx.onpointerover = select
    await eventPromise(dayCircleCtx, 'pointerup')
    dayCircleCtx.onpointerover = null

  }, { once: false })


  //helpers
  function select(e) {
    if (e.target.classList.contains('minute'))
      e.target.style.background = 'teal'
    else if (e.target.classList.contains('hour'))
      e.target.style.background = 'darkorange'
    else if (e.target.classList.contains('threeHours'))
      e.target.style.background = 'yellowgreen'
    else return false

    return true
  }

  /*
  let odd
  dayCircleCtx.addEventListener('click', async e => {
    if (ctxs.has(e.target)) return
    e.target.style.background = (odd = !odd) ? 'red' : 'cyan'
  }, { once: false }) */

  /*
  dayCircleCtx.addEventListener('pointerdown', e => {
    if (!select(e)) return
    
    dayCircleCtx.addEventListener('pointerup',
      select, { once: true })
  }, { once: false }) */
}