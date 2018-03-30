// DOM操作的通用代码
export function addClass(el, className) {
  if (hasClass(el, className)) { return }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  const attr_name = prefix + name
  if(val){
    return el.setAttribute(attr_name, val)
  }else{
    return el.getAttribute(attr_name)
  }
}
