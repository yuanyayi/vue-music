export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  console.log(musicData)
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filteringer(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `https://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`,
  })
}

function filteringer(singer) {
  if(!singer) return ''
  let arr = singer.map(function (item) { return item.name })
  return arr.join('/')
}
