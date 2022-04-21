
import http from '../utils/http'
import dayjs from 'dayjs'

function sort (data, sort) {
  const { type, order } = sort

  data.sort((a, b) => a[type] > b[type] ? -1 : 1)

  if (order === 'ASC') {
    data.reverse()
  }
}

async function getAcc (item) {
  if (item.acc !== undefined && item.acc !== -Infinity) {
    return item.acc
  }

  if (!item.baseScore) {
    return 0
  }

  if (item.ranked) {
    return item.baseScore / item.maxScore * 100
  }

  let leaderBoardInfo = null
  try {
    leaderBoardInfo = await http.getLeaderBoardInfo(item.id)
  } catch {
    return -Infinity
  }

  const diffIndex = leaderBoardInfo.difficulties.findIndex(d => d.leaderboardId === item.id)

  if (diffIndex === -1) {
    return -Infinity
  }

  let songInfo = null
  try {
    songInfo = await http.getSongInfo(item.songHash)
  } catch {
    return -Infinity
  }

  const diff = songInfo?.versions?.[0]?.diffs[diffIndex]

  item.key = songInfo?.id
  item.mapperId = songInfo?.uploader?.id

  if (!diff) {
    return -Infinity
  }

  const notes = diff.notes

  if (notes > 13) {
    // maxScore = (notes * 8 - 63) * 115;
    item.maxScore = notes * 920 - 7245
  } else if (notes > 5) {
    // maxScore = ((notes - 5) * 4 + 9) * 115;
    item.maxScore = notes * 460 - 1265
  } else if (notes > 1) {
    // maxScore = ((notes - 1) * 2 + 1) * 115;
    item.maxScore = notes * 230 - 115
  } else if (notes === 1) {
    item.maxScore = 115
  } else {
    return -Infinity
  }

  return item.baseScore / item.maxScore * 100
}

async function downloadPlaylist (data, coverUrl, playlistTitle, num) {
  num = Math.min(num, data.length)
  if (!num) {
    return
  }

  const songs = []
  for (let index = 0; index < num; index++) {
    const item = data[index]

    const song = {
      songName: item.songName,
      hash: item.songHash,
      difficulties: [
        {
          characteristic: 'Standard',
          name: item.difficultyRaw.split('_')[1]
        }
      ]
    }
    songs.push(song)
  }

  const cover = await convertImgUrlToBase64(coverUrl)

  const output = {
    playlistTitle: playlistTitle,
    playlistAuthor: 'ScoreSaberPlaylist',
    songs: songs,
    image: cover
  }

  const playlistURL = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(output))}`
  http.downloadFile(playlistURL, `${playlistTitle}.bplist`)
}

function playerScoreToItem (playerScore) {
  const score = playerScore.score
  const leaderboard = playerScore.leaderboard
  return {
    id: leaderboard.id,
    rank: score.rank,
    baseScore: score.baseScore,
    maxScore: leaderboard.maxScore,
    pp: score.pp,
    ppWeighted: score.pp * score.weight,
    fullCombo: score.fullCombo,
    timeSet: dayjs(score.timeSet),
    songHash: leaderboard.songHash,
    songName: leaderboard.songName,
    songSubName: leaderboard.songSubName,
    songAuthorName: leaderboard.songAuthorName,
    levelAuthorName: leaderboard.levelAuthorName,
    difficultyRaw: leaderboard.difficulty.difficultyRaw,
    ranked: leaderboard.ranked,
    stars: leaderboard.stars,
    coverImage: leaderboard.coverImage
  }
}

function matchPlayerId (str) {
  const matchResult = /scoresaber.com\/u\/(\S+)/.exec(str)
  return matchResult?.[1] ? matchResult[1] : str
}

function convertImgUrlToBase64 (url) {
  return new Promise(resolve => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous') // use it if you try in a different origin of your web

    image.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height

      canvas.getContext('2d').drawImage(this, 0, 0)

      canvas.toBlob(
        function (source) {
          const newImg = document.createElement('img')
          const url = URL.createObjectURL(source)

          newImg.onload = function () {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url)
          }

          newImg.src = url
        },
        'image/jpeg',
        1
      )

      // If you ever stumble at 18 DOM Exception, just use this code to fix it
      // let dataUrl = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      const dataUrl = canvas.toDataURL('image/jpeg')
      resolve(dataUrl)
    }
    image.src = url
  })
}

export default {
  sort,
  getAcc,
  downloadPlaylist,
  playerScoreToItem,
  matchPlayerId,
  convertImgUrlToBase64
}
