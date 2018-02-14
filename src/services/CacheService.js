export function setItem(k, v) {
  localStorage.setItem(k, v)
}

export function getItem(k) {
  return localStorage.getItem(k)
}

export function key(k) {
  return localStorage.key(k)
}

export function clear() {
  localStorage.clear()
}

export function removeItem(k) {
  localStorage.removeItem(k)
}

