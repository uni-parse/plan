import { eventPromise, range } from "./utilities"

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
  let prevCoords

  dayCircleCtx.onpointerover = e => {
    //reset cache
    elsCache.forEach(el => el.style.background = '')
    elsCache.clear()

    const currentCoords = getCoords(e)
    if ([0, coords0, prevCoords].includes(currentCoords))
      return



    const dist = selectDist(coords0, currentCoords, elsCache)
    if (!dist) return
    //console.log(`${coords0} ${currentCoords} ${dist}`)

    elsCache.forEach(el => el.style.background = 'red')

    prevCoords = currentCoords
  }

  await eventPromise(dayCircleCtx, 'pointerup')
  dayCircleCtx.onpointerover = null

  //reset cache
  elsCache.forEach(el => el.style.background = '')
  elsCache.clear()
}

//helpers

function selectDist(fromCoords, toCoords, elsCache) {
  const
    th0 = Math.floor(fromCoords / 100),
    h0 = Math.floor(fromCoords % 100 / 10),
    m0 = fromCoords % 10,

    th1 = Math.floor(toCoords / 100),
    h1 = Math.floor(toCoords % 100 / 10),
    m1 = toCoords % 10,

    fromThreeHours = !h0 && !m0,
    fromHour = h0 && !m0,
    fromMinutes = !!m0,

    toThreeHours = !h1 && !m1,
    toHour = h1 && !m1,
    toMinutes = !!m1,

    th = th1 - th0,
    h = h1 - h0,
    m = m1 - m0

  let dist

  if (!th && ( // navigate => child || parent || ansestor
    fromThreeHours // => hour || minutes
    || fromHour && (toThreeHours || toMinutes && !h)
    || fromMinutes && (toThreeHours || toHour && !h)
  )) dist = 0
  else if (fromThreeHours) {
    if (toThreeHours) dist = th * 18
    else if (toHour) dist = (th - 1) * 18 + h * 6
    else if (toMinutes) dist = (th - 1) * 18 + (h - 1) * 6 + m
  }
  else if (fromHour) {
    if (toThreeHours) dist = (th + 1) * 18 + h * 6
    else if (toHour) dist = th * 18 + h * 6
    else if (toMinutes) dist = th * 18 + (h - 1) * 6 + m
  }
  else if (fromMinutes) {
    if (toThreeHours) dist = (th + 1) * 18 + (h + 1) * 6 + m
    else if (toHour) dist = th * 18 + (h + 1) * 6 + m
    else if (toMinutes) dist = th * 18 + h * 6 + m
  }

  if (dist <= 0) return 0

  const
    dist_th = Math.floor(dist / 18),
    dist_h = Math.floor(dist % 18 / 6),
    dist_m = dist % 6

  console.log(
    `${fromCoords} ${toCoords} `
    + `${dist} `
    + `(${th},${h},${m}) `
    + `(${dist_th},${dist_h},${dist_m})`
  )

  const els = {
    th: document.querySelectorAll('.threeHours'),
    h: document.querySelectorAll('.hour'),
    m: document.querySelectorAll('.minutes')
  }

  if (fromThreeHours && toThreeHours)
    range(th0, th1)
      .forEach(i => elsCache.add(els.th[i - 1]))

  else if (fromThreeHours && toHour) {
    range(th0, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    range((th1 - 1) * 3 + 1, (th1 - 1) * 3 + h1)
      .forEach(i => elsCache.add(els.h[i - 1]))
  }

  else if (fromThreeHours && toMinutes) {
    range(th0, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    range(
      (th1 - 1) * 3 + 1,
      (th1 - 1) * 3 + h1 - 1
    ).forEach(i => elsCache.add(els.h[i - 1]))

    range(
      ((th1 - 1) * 3 + h1 - 1) * 6 + 1,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }

  else if (fromHour && toThreeHours) {
    range(th0 + 1, th1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    range((th0 - 1) * 3 + h0, th0 * 3)
      .forEach(i => elsCache.add(els.h[i - 1]))
  }

  else if (fromHour && toHour) {
    range(th0 + 1, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    if (!th) range(
      (th0 - 1) * 3 + h0,
      (th1 - 1) * 3 + h1
    ).forEach(i => elsCache.add(els.h[i - 1]))
    else if (th) {
      range(
        (th0 - 1) * 3 + h0,
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }
  }

  else if (fromHour && toMinutes) {
    range(th0 + 1, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    range(
      ((th1 - 1) * 3 + h1 - 1) * 6 + 1,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m
    ).forEach(i => elsCache.add(els.m[i - 1]))

    if (!th) {
      range(
        (th0 - 1) * 3 + h0,
        (th1 - 1) * 3 + h1 - 1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }
    else if (th) {
      range(
        (th0 - 1) * 3 + h0,
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1 - 1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }
  }

  else if (fromMinutes && toThreeHours) {
    //add threeHours
    range(th0 + 1, th1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    range(
      (th0 - 1) * 3 + h0 + 1,
      th0 * 3
    ).forEach(i => elsCache.add(els.h[i - 1]))

    //add minutes
    range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
      ((th0 - 1) * 3 + h0) * 6
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }

  else if (fromMinutes && toHour) {
    //add threeHours
    range(th0 + 1, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th) {
      range(
        (th0 - 1) * 3 + h0 + 1,
        (th1 - 1) * 3 + h1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }
    else if (th) {
      range(
        (th0 - 1) * 3 + h0 + 1,
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }

    //add minutes
    range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
      ((th0 - 1) * 3 + h0) * 6
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }

  else if (fromMinutes && toMinutes) {
    //add threeHours
    range(th0 + 1, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th) {
      range(
        (th0 - 1) * 3 + h0 + 1,
        (th1 - 1) * 3 + h1 - 1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }
    else if (th) {
      range(
        (th0 - 1) * 3 + h0 + 1,
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1 - 1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }

    //add minutes
    if (!th && !h) {
      range(
        ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
        ((th1 - 1) * 3 + h1 - 1) * 6 + m1
      ).forEach(i => elsCache.add(els.m[i - 1]))
    }
    else if (th || !th && h) {
      range(
        ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
        ((th0 - 1) * 3 + h0) * 6
      ).forEach(i => elsCache.add(els.m[i - 1]))

      range(
        ((th1 - 1) * 3 + h1 - 1) * 6 + 1,
        ((th1 - 1) * 3 + h1 - 1) * 6 + m1,
      ).forEach(i => elsCache.add(els.m[i - 1]))
    }
  }

  return dist
}

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
  if (el.classList.contains('minutes'))
    el.style.background = 'teal'
  else if (el.classList.contains('hour'))
    el.style.background = 'darkorange'
  else if (el.classList.contains('threeHours'))
    el.style.background = 'yellowgreen'
}