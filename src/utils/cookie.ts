export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';').map(c => c.trim())
  for (const c of cookies) {
    if (c.startsWith(name + '=')) {
      return c.substring(name.length + 1)
    }
  }
  return null
}
