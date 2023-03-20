export function calcDist({ toDescendant, fromThreeHours, fromHour, fromMinutes, toThreeHours, toHour, toMinutes, th, h, m }) {
  let dist

  if (toDescendant) dist = 0
  else if (fromThreeHours) {
    if (toThreeHours) dist = th * 18
    else if (toHour) dist = (th - 1) * 18 + h * 6
    else if (toMinutes) dist = (th - 1) * 18 + (h - 1) * 6 + m
    dist += 18
  }
  else if (fromHour) {
    if (toThreeHours) dist = (th + 1) * 18 + h * 6
    else if (toHour) dist = th * 18 + h * 6
    else if (toMinutes) dist = th * 18 + (h - 1) * 6 + m
    dist += 6
  }
  else if (fromMinutes) {
    if (toThreeHours) dist = (th + 1) * 18 + (h + 1) * 6 + m
    else if (toHour) dist = th * 18 + (h + 1) * 6 + m
    else if (toMinutes) dist = th * 18 + h * 6 + m
    dist++
  }

  return dist
}
