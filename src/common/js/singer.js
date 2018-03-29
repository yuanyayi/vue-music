export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name 
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

// 必须用反引号才能使用${}的表示方式！！！单引号是不行的！！！