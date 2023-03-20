import { range } from "./utilities";
export function selectEls({ fromThreeHours, fromHour, fromMinutes, toThreeHours, toHour, toMinutes, th0, h0, m0, th1, h1, m1, th, h, m, els, elsCache }) {
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
    range(th0 + (h0 > 1), th1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    if (h0 == 1) return
    range(th0 + 1, th1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    range((th0 - 1) * 3 + h0, th0 * 3)
      .forEach(i => elsCache.add(els.h[i - 1]))
  }

  else if (fromHour && toHour) {
    range(th0 + (h0 > 1), th1 - (h1 < 3))
      .forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th && (h0 > 1 || h0 == 1 && h1 < 3)) range(
      (th0 - 1) * 3 + h0,
      (th1 - 1) * 3 + h1
    ).forEach(i => elsCache.add(els.h[i - 1]))

    else if (!th) return

    if (h0 > 1) range(
      (th0 - 1) * 3 + h0,
      th0 * 3
    ).forEach(i => elsCache.add(els.h[i - 1]))

    if (h1 < 3) range(
      (th1 - 1) * 3 + 1,
      (th1 - 1) * 3 + h1
    ).forEach(i => elsCache.add(els.h[i - 1]))
  }

  else if (fromHour && toMinutes) {
    //add threeHours
    range(th0 + 1, th1 - 1)
      .forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th) range(
      (th0 - 1) * 3 + h0,
      (th1 - 1) * 3 + h1 - 1
    ).forEach(i => elsCache.add(els.h[i - 1]))

    else {
      range(
        (th0 - 1) * 3 + h0,
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1 - 1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }

    //add minutes
    range(
      ((th1 - 1) * 3 + h1 - 1) * 6 + 1,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }

  else if (fromMinutes && toThreeHours) {
    if (m0 == 1) {
      range(th0, th1)
        .forEach(i => elsCache.add(els.th[i - 1]))
      return
    }

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
    range(
      th0 + (m0 > 1 || h0 > 1),
      th1 - (h1 < 3)
    ).forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th && !(m0 == 1 && h0 == 1 && h1 == 3)) range(
      (th0 - 1) * 3 + h0 + (m0 > 1),
      (th1 - 1) * 3 + h1
    ).forEach(i => elsCache.add(els.h[i - 1]))

    else if (th) {
      if (h0 > 1 || m0 > 1) range(
        (th0 - 1) * 3 + h0 + (m0 > 1),
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      if (h1 < 3) range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }

    //add minutes
    if (m0 > 1) range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
      ((th0 - 1) * 3 + h0) * 6
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }

  else if (fromMinutes && toMinutes) {
    //add threeHours
    range(
      th0 + (m0 > 1 || h0 > 1),
      th1 - (h1 < 3 || m1 < 6)
    ).forEach(i => elsCache.add(els.th[i - 1]))

    //add hours
    if (!th && (m0 > 1 || h0 > 1 || h1 < 3 || m1 < 6)) range(
      (th0 - 1) * 3 + h0 + (m0 > 1),
      (th1 - 1) * 3 + h1 - (m1 < 6)
    ).forEach(i => elsCache.add(els.h[i - 1]))

    else if (th) {
      if (h0 > 1 || m0 > 1) range(
        (th0 - 1) * 3 + h0 + (m0 > 1),
        th0 * 3
      ).forEach(i => elsCache.add(els.h[i - 1]))

      if (h1 < 3 || m1 < 6) range(
        (th1 - 1) * 3 + 1,
        (th1 - 1) * 3 + h1 - (m1 < 6)
      ).forEach(i => elsCache.add(els.h[i - 1]))
    }

    //add minutes
    if (!th && !h && (m0 > 1 || m1 < 6)) range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m1
    ).forEach(i => elsCache.add(els.m[i - 1]))

    else if (!(th || !th && h)) return

    if (m0 > 1) range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0,
      ((th0 - 1) * 3 + h0) * 6
    ).forEach(i => elsCache.add(els.m[i - 1]))

    if (m1 < 6) range(
      ((th1 - 1) * 3 + h1 - 1) * 6 + 1,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m1,
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }
}