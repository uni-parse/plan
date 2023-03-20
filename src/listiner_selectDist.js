import { selectEls } from "./listener_selectEls"
import { calcDist } from "./listener_calcDist"
export function selectDist(fromCoords, toCoords, elsCache, els) {
  const
    th0 = Math.floor(fromCoords / 100),
    h0 = Math.floor(fromCoords % 100 / 10),
    m0 = fromCoords % 10,

    th1 = Math.floor(toCoords / 100),
    h1 = Math.floor(toCoords % 100 / 10),
    m1 = toCoords % 10,

    th = th1 - th0,
    h = h1 - h0,
    m = m1 - m0,

    fromThreeHours = !h0 && !m0,
    fromHour = h0 && !m0,
    fromMinutes = !!m0,

    toThreeHours = !h1 && !m1,
    toHour = h1 && !m1,
    toMinutes = !!m1,

    toDescendant = fromThreeHours && !th
      || fromHour && toMinutes && !th && !h,

    dist = calcDist({ toDescendant, fromThreeHours, fromHour, fromMinutes, toThreeHours, toHour, toMinutes, th, h, m })

  if (dist <= 0) return 0

  //reset cache
  elsCache.forEach(el => el.style.background = '')
  elsCache.clear()

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

  selectEls({ fromThreeHours, fromHour, fromMinutes, toThreeHours, toHour, toMinutes, th0, h0, m0, th1, h1, m1, th, h, m, els, elsCache })

  return dist
}