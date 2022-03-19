import axios from 'axios'
import config from './config'

function get (url) {
  return axios.get(url)
    .then(response => response.data)
}

export default {
  getPlayerInfo (playerId) {
    return get(`https://scoresaber.com/api/player/${playerId}/full`)
  },
  getScores (playerId, page, limit = config.pageSize, sort = 'top') {
    return get(`https://scoresaber.com/api/player/${playerId}/scores?page=${page}&sort=${sort}&limit=${limit}&withMetadata=false`)
      .then(data => data.playerScores)
  },
  getLeaderBoardInfo (leaderBoardId) {
    return get(`https://scoresaber.com/api/leaderboard/by-id/${leaderBoardId}/info`)
  },
  getSongInfo (songHash) {
    return get(`https://beatsaver.com/api/maps/hash/${songHash}`)
  },
  downloadFile (url, label) {
    return axios.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
  }
}
