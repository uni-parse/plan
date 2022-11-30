const dayCircleCtx = document.createElement('div'),
  threeHours = document.createElement('div'),
  hourCtx = document.createElement('div'),
  hour = document.createElement('div'),
  hoursCtx = document.createElement('div'),
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


export default dayCircleCtx