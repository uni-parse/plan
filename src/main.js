import './sass/main.scss'
const main = document.createElement('main'),
  circle = document.createElement('div'),
  threeHours = document.createElement('div'),
  hour = document.createElement('div'),
  tenMinute = document.createElement('div')
  ;

for (let i = 1; i <= 6; i++) {
  const min = tenMinute.cloneNode(true)
  min.setAttribute('class', `minute nth${i}`)
  hour.appendChild(min)
}

for (let i = 1; i <= 3; i++) {
  const h = hour.cloneNode(true)
  h.setAttribute('class', `hour nth${i}`)
  threeHours.appendChild(h)
}
for (let i = 1; i <= 8; i++) {
  const three = threeHours.cloneNode(true)
  three.setAttribute('class', `threeHours nth${i}`)
  circle.appendChild(three)
}
const hours = circle.querySelectorAll('.hour')
hours.forEach((hour, i) => hour.id = `h${i + 1}`)

circle.id = 'circle'
main.appendChild(circle)
document.body.appendChild(main)


console.log('done')