export function hideMobileNum (mobile = '') {
  let result = mobile.replace(mobile.substring(3, 7), '****')
  return result
}

