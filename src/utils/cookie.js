// src/utils/cookie.js
export function getCookie(name) {
  const cookies = document.cookie.split(';').map(c => c.trim())
  for (let c of cookies) {
    if (c.startsWith(name + '=')) {
      return c.substring((name + '=').length)
    }
  }
  return null
}