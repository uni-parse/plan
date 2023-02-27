import { sleep, eventPromise } from './utilities'

const hourCtx = document.createElement('div')
for (let i = 1; i <= 6; i++) {
  const tenMinutes = document.createElement('div')
  tenMinutes.className = `minute m${i}`

  hourCtx.append(tenMinutes)
}

const hoursCtx = document.createElement('div')
hoursCtx.id = 'hoursCtx'
for (let i = 1; i <= 24; i++) {
  const hour = document.createElement('div')
  hour.className = `hour h${i}`

  const hourCtx_clone = hourCtx.cloneNode(true)
  hourCtx_clone.append(hour)
  hourCtx_clone.className = `hourCtx hCtx${i}`
  hourCtx_clone.dataset.hour = i == 24 ? '0' : i

  hoursCtx.append(hourCtx_clone)
}

const threeHoursCtx = document.createElement('div')
threeHoursCtx.id = 'threeHoursCtx'
for (let i = 1; i <= 8; i++) {
  const threeHours = document.createElement('div')
  threeHours.className = `threeHours _3h${i}`

  threeHoursCtx.append(threeHours)
}

const centerCircle = document.createElement('div')
centerCircle.id = 'centerCircle'

const dayCircleCtx = document.createElement('div')
dayCircleCtx.id = 'dayCircleCtx'
dayCircleCtx.append(
  hoursCtx,
  threeHoursCtx,
  centerCircle
)

// cache
const ctxs = new Set()
  .add(dayCircleCtx)
  .add(centerCircle)
  .add(threeHoursCtx)
  .add(hoursCtx)
for (const hourCtx of hoursCtx.children) ctxs.add(hourCtx)

/* 
let odd
dayCircleCtx.addEventListener('click', async e => {
  if (ctxs.has(e.target)) return
  e.target.style.background = (odd = !odd) ? 'red' : 'cyan'
}, { once: false }) */


dayCircleCtx.addEventListener('mousedown', async e => {
  if (!select(e)) return

  dayCircleCtx.addEventListener('mouseover', select)
  await eventPromise(dayCircleCtx, 'mouseup')
  dayCircleCtx.removeEventListener('mouseover', select)
  
}, { once: false })

/* 
dayCircleCtx.addEventListener('mousedown', e => {
  if (!select(e)) return
  
  dayCircleCtx.addEventListener('mouseup',
    select, { once: true })
}, { once: false }) */

function select(e) {
  if (ctxs.has(e.target)) return
  e.target.style.background = 'red'

  return true
}

export default dayCircleCtx