let FLAG = "RECOED-DATA"

function setInfo(time,title ="",content=""){
  let DATA = JSON.parse(localStorage.getItem(FLAG) || "{}"),
  //Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
      DATA_KEYS = Object.keys(DATA) 
  if(!DATA_KEYS.includes(time)){
    DATA[time] = []
  }
  let ARR = DATA[time]
  ARR.push({
    id: ARR.length === 0? 1 : (parseInt(ARR[ARR.length - 1].id) + 1),
    title,
    content,
    time:getMinutes()
  })
  localStorage.setItem(FLAG,JSON.stringify(DATA))
  return true
}

function getInfo(time,id){
  let DATA = JSON.parse(localStorage.getItem(FLAG) || "{}"),
      DATA_KEYS = Object.keys(DATA) 
  if(!DATA_KEYS.includes(time)) return null
  DATA = DATA[time]
  if( typeof id !== "undefined") {
    DATA = DATA.find(item => {
      return parseInt(item.id) === parseInt(id)
    })
  }
  return DATA
}
function delInfo(time,index){
  let DATA = JSON.parse(localStorage.getItem(FLAG))
  DATA[time].splice(index-1,1)
  localStorage.setItem(FLAG,JSON.stringify(DATA))
}

// 格式化时间
function formatData(time){
  let year = time.getFullYear(),
      month = time.getMonth() + 1,
      day = time.getDate()
  month = month < 10? '0' + month : month
  day = day < 10? '0' + day : day
  return `${year}/${month}/${day}`
}

function formateTime(time){
  return time.split('/').map(item => {
   return item.length < 2? '0'+ item : item
  }).join('/')
}

function getMinutes(){
  let time = new Date(),
      minutes = time.getMinutes(),
      hours = time.getHours()
  minutes = minutes < 10? '0' + minutes : minutes
  hours = hours < 10? '0' + hours : hours
  return `${hours}:${minutes}`

}
export default {
  formatData,
  formateTime,
  getInfo,
  setInfo,
  delInfo
}