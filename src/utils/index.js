export function hideMobileNum (mobile = '') {
  let result = mobile.replace(mobile.substring(3, 7), '****')
  return result
}

export function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  var l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1],
  t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}