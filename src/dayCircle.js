const dayCircleCtx = document.createElement('div'),
  threeHours = document.createElement('div'),
  hourCtx = document.createElement('div'),
  hour = document.createElement('div'),
  hoursCtx = document.createElement('div'),
  allHourCtx = [],
  threeHoursCtx = document.createElement('div'),
  tenMinutes = document.createElement('div'),
  centerCircle = document.createElement('div')
  ;

for (let i = 1; i <= 6; i++) {
  const localTenMinutes = tenMinutes.cloneNode(true)
  localTenMinutes.setAttribute('class', `minute m${i}`)
  hourCtx.appendChild(localTenMinutes)
}

for (let i = 1; i <= 24; i++) {
  const localHourCtx = hourCtx.cloneNode(true),
    localHour = hour.cloneNode(true);
  localHour.setAttribute('class', `hour h${i}`)
  localHourCtx.appendChild(localHour)
  localHourCtx.setAttribute('class', `hourCtx hCtx${i}`)
  localHourCtx.setAttribute('data-hour', i == 24 ? '0' : i)
  hoursCtx.appendChild(localHourCtx)

  allHourCtx.push(localHourCtx)
}

for (let i = 1; i <= 8; i++) {
  const localThreeHours = threeHours.cloneNode(true)
  localThreeHours.setAttribute('class', `threeHours _3h${i}`)
  threeHoursCtx.appendChild(localThreeHours)
}

hoursCtx.id = 'hoursCtx'
threeHoursCtx.id = 'threeHoursCtx'
dayCircleCtx.appendChild(hoursCtx)
dayCircleCtx.appendChild(threeHoursCtx)

centerCircle.id = 'centerCircle'
dayCircleCtx.appendChild(centerCircle)

dayCircleCtx.id = 'dayCircleCtx'

const ctxs = [
  dayCircleCtx,
  centerCircle,
  threeHoursCtx,
  hoursCtx,
  ...allHourCtx
]

let isFirstClick = true
dayCircleCtx.addEventListener('click', e => {
  if (isFirstClick && !ctxs.includes(e.target)) {
    e.target.style.background = 'red'
    console.log('first event')
    setTimeout(() => isFirstClick = false, 200);

  }
}, { once: false })

dayCircleCtx.addEventListener('click', e => {
  if (!isFirstClick && !ctxs.includes(e.target)) {
    e.target.style.background = 'cyan'
    console.log('second event')
    setTimeout(() => isFirstClick = true, 200);

  }
}, { once: false })


export default dayCircleCtx