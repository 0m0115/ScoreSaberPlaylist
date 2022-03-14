
const keys = {
  players: 'players'
}

function getMap (key) {
  const json = localStorage.getItem(key)
  return new Map(JSON.parse(json))
}

function setMap (key, map) {
  const json = JSON.stringify(Array.from(map))
  localStorage.setItem(key, json)
}

export default {
  keys,
  getMap,
  setMap
}
