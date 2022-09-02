function isPhone(value) {
 if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
   return false
 } else {
    return true
 }
}

//要求必须包含数字、字母，6-10位
function isSixNum(value) {
 if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)) {
   return false
 } else {
   return true
 }
}

//姓名验证
function isChineseName(value) {
  if (!/^[\u4e00-\u9fa5]{2,}$/.test(value)) {
    return false
  } else {
    return true
  }
 }

//对外导出方法
module.exports = {
 isPhone: isPhone,
 isSixNum: isSixNum,
 isChineseName
}