"use client"

function setLocalStorage(name: string, value: string) {
  localStorage.setItem(name, value)
  window.dispatchEvent(new Event('storage'))
}

function getLocalStorage(name: string) {
  return localStorage.getItem(name)
}

function removeLocalStorage(name: string) {
  localStorage.removeItem(name)
  window.dispatchEvent(new Event('storage'))
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
}