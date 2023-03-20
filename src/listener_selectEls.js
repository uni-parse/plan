import { range } from "./utilities";
export function selectEls({ fromThreeHours, fromHour, fromMinutes, toThreeHours, toHour, toMinutes, th0, h0, m0, th1, h1, m1, th, h, m, els, elsCache }) {
  if (fromThreeHours && toThreeHours) addTh()

  else if (fromThreeHours && toHour) {
    addTh(0, h1 < 3)
    if (h1 < 3) addPostH()
  }

  else if (fromThreeHours && toMinutes) {
    addTh(0, h1 < 3 || m1 < 6)
    if (h1 < 3 || m1 < 6) addPostH(0, m1 < 6)
    if (m1 < 6) addPostM()
  }

  else if (fromHour && toThreeHours) {
    addTh(h0 > 1)
    if (h0 > 1) addPreH()
  }

  else if (fromHour && toHour) {
    addTh(h0 > 1, h1 < 3)

    if (!th && (h0 > 1 || h0 == 1 && h1 < 3)) return addH()
    if (h0 > 1) addPreH()
    if (h1 < 3) addPostH()
  }

  else if (fromHour && toMinutes) {
    addTh(h0 > 1, h1 < 3 || m1 < 6)

    if (!th && (h0 > 1 || h1 < 3 || m1 < 6)) addH(0, m1 < 6)
    else if (th) {
      if (h0 > 1) addPreH()
      if (h1 < 3 || m1 < 6) addPostH(0, m1 < 6)
    }

    if (m1 < 6) addPostM()
  }

  else if (fromMinutes && toThreeHours) {
    addTh(m0 > 1)
    if (m0 == 1) return
    addPreH(1)
    addPreM()
  }

  else if (fromMinutes && toHour) {
    addTh(m0 > 1 || h0 > 1, h1 < 3)

    if (!th && !(m0 == 1 && h0 == 1 && h1 == 3)) addH(m0 > 1)
    else if (th) {
      if (h0 > 1 || m0 > 1) addPreH(m0 > 1)
      if (h1 < 3) addPostH()
    }

    if (m0 > 1) addPreM()
  }

  else if (fromMinutes && toMinutes) {
    addTh(m0 > 1 || h0 > 1, h1 < 3 || m1 < 6)

    if (!th && (m0 > 1 || h0 > 1 || h1 < 3 || m1 < 6))
      addH(m0 > 1, m1 < 6)
    else if (th) {
      if (h0 > 1 || m0 > 1) addPreH(m0 > 1)
      if (h1 < 3 || m1 < 6) addPostH(0, m1 < 6)
    }

    if (!th && !h && (m0 > 1 || m1 < 6)) return addM()
    if (m0 > 1) addPreM()
    if (m1 < 6) addPostM()
  }

  //helpers
  function addTh(fromExtra = 0, toExtra = 0) {
    range(th0 + fromExtra, th1 - toExtra)
      .forEach(i => elsCache.add(els.th[i - 1]))
  }
  function addH(fromExtra = 0, toExtra = 0) {
    range(
      (th0 - 1) * 3 + h0 + fromExtra,
      (th1 - 1) * 3 + h1 - toExtra
    ).forEach(i => elsCache.add(els.h[i - 1]))
  }
  function addPreH(fromExtra = 0, toExtra = 0) {
    range(
      (th0 - 1) * 3 + h0 + fromExtra,
      th0 * 3 - toExtra
    ).forEach(i => elsCache.add(els.h[i - 1]))
  }
  function addPostH(fromExtra = 0, toExtra = 0) {
    range(
      (th1 - 1) * 3 + 1 + fromExtra,
      (th1 - 1) * 3 + h1 - toExtra
    ).forEach(i => elsCache.add(els.h[i - 1]))
  }
  function addM(fromExtra = 0, toExtra = 0) {
    range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0 + fromExtra,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m1 - toExtra
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }
  function addPreM(fromExtra = 0, toExtra = 0) {
    range(
      ((th0 - 1) * 3 + h0 - 1) * 6 + m0 + fromExtra,
      ((th0 - 1) * 3 + h0) * 6 - toExtra
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }
  function addPostM(fromExtra = 0, toExtra = 0) {
    range(
      ((th1 - 1) * 3 + h1 - 1) * 6 + 1 + fromExtra,
      ((th1 - 1) * 3 + h1 - 1) * 6 + m1 - toExtra
    ).forEach(i => elsCache.add(els.m[i - 1]))
  }
}