import './sass/main.scss'
const main = document.createElement('main'),
  circle = document.createElement('div'),
  threeHours = document.createElement('div'),
  hour = document.createElement('div'),
  singleHour = document.createElement('div'),
  hoursCircle = document.createElement('div'),
  threeHoursCircle = document.createElement('div'),
  tenMinute = document.createElement('div'),
  centerCircle = document.createElement('div')
  ;

for (let i = 1; i <= 6; i++) {
  const min = tenMinute.cloneNode(true)
  min.setAttribute('class', `minute minute${i}`)
  hour.appendChild(min)
}

for (let i = 1; i <= 24; i++) {
  const h = hour.cloneNode(true),
    localSingleHour = singleHour.cloneNode(true);
  localSingleHour.id = `h${i}`
  localSingleHour.setAttribute('class', 'singleHour')
  h.appendChild(localSingleHour)
  h.setAttribute('class', `hour hour${i}`)
  h.setAttribute('data-hour', i == 24 ? '00' : i)
  hoursCircle.appendChild(h)
}
for (let i = 1; i <= 8; i++) {
  const three = threeHours.cloneNode(true)
  three.setAttribute('class', `threeHours threeHours${i}`)
  threeHoursCircle.appendChild(three)
}

hoursCircle.id = 'hoursCircle'
threeHoursCircle.id = 'threeHoursCircle'
circle.appendChild(hoursCircle)
circle.appendChild(threeHoursCircle)

//const hours = circle.querySelectorAll('.hour')
//hours.forEach((hour, i) => hour.id = `h${i + 1}`)

centerCircle.id = 'centerCircle'
circle.appendChild(centerCircle)

circle.id = 'circle'
main.appendChild(circle)
document.body.appendChild(main)


for (let i = 1; i <= 24; i++) {

}
console.log('done')