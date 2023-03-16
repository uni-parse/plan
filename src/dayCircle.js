export { selectListener } from "./dayCircle_listener"
export const dayCircleCtx = document.createElement('div')
dayCircleCtx.id = 'dayCircleCtx'

const hourCtx = document.createElement('div')
for (let i = 1; i <= 6; i++) {
  const tenMinutes = document.createElement('div')
  tenMinutes.className = `minute m${i}`
  tenMinutes.dataset.m = i

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

dayCircleCtx.append(
  hoursCtx,
  threeHoursCtx,
  centerCircle
)