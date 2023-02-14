import { sleep } from './utilities'
const
  dayCircleCtx = document.createElement('div'),
  threeHours = document.createElement('div'),
  hourCtx = document.createElement('div'),
  hour = document.createElement('div'),
  hoursCtx = document.createElement('div'),
  allHourCtx = [],
  threeHoursCtx = document.createElement('div'),
  tenMinutes = document.createElement('div'),
  centerCircle = document.createElement('div')

for (let i = 1; i <= 6; i++) {
  const localTenMinutes = tenMinutes.cloneNode(true)
  localTenMinutes.className = `minute m${i}`
  hourCtx.append(localTenMinutes)
}

for (let i = 1; i <= 24; i++) {
  const
    localHourCtx = hourCtx.cloneNode(true),
    localHour = hour.cloneNode(true)

  localHour.className = `hour h${i}`
  localHourCtx.append(localHour)
  localHourCtx.className = `hourCtx hCtx${i}`
  localHourCtx.dataset.hour = i == 24 ? '0' : i
  hoursCtx.append(localHourCtx)

  allHourCtx.push(localHourCtx)
}

for (let i = 1; i <= 8; i++) {
  const localThreeHours = threeHours.cloneNode(true)
  localThreeHours.className = `threeHours _3h${i}`
  threeHoursCtx.append(localThreeHours)
}

hoursCtx.id = 'hoursCtx'
threeHoursCtx.id = 'threeHoursCtx'
centerCircle.id = 'centerCircle'
dayCircleCtx.id = 'dayCircleCtx'
dayCircleCtx.append(hoursCtx, threeHoursCtx, centerCircle)

const ctxs = [
  dayCircleCtx,
  centerCircle,
  threeHoursCtx,
  hoursCtx,
  ...allHourCtx
]

let odd
dayCircleCtx.addEventListener('click', async e => {
  if (ctxs.includes(e.target)) return
  e.target.style.background = (odd = !odd) ? 'red' : 'cyan'
}, { once: false })

export default dayCircleCtx