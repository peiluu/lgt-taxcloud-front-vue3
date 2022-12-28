/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 设置浏览器头部标题
 */
export const setTitle = function(title) {
  title = title ? `${title}` : 'NxAdmin'
  window.document.title = title + '-nxAdmin'
}

/**
 * @desption - 根据传入的key，返回数组中对象的key的值组成的数组
 */
export const getArrayByKey = (arr, key) => {
  return arr.map(item => item[key])
}

/**
 * @desption - 获取最大最小值
 * @returns - [max, min]
 */
const getMaxMin = (arr, key) => {
  if (!arr.length > 0) return null

  var max = parseFloat(arr[0][key])
  var min = parseFloat(arr[0][key])
  var interval
  for (var i = 1; i < arr.length; i++) {
    var cur = parseFloat(arr[i][key])
    max = cur > max ? cur : max
    min = cur < min ? cur : min
  }
  return [max, min]
}

const generateCoord = (max, min) => {
  if ((max || max === 0) && (min || min === 0)) {
    var interval
    max = parseInt(max / 5) == max / 5 ? max : (parseInt(max / 5) + 1) * 5
    min = min >= 0 ? parseInt(min / 5) * 5 : parseInt(min / 5 - 1) * 5
    interval = (max - min) / 5
    max = max > interval * 5 + min ? max : interval * 5 + min
    return [max, min, interval]
  } else {
    return [100, -100, 20]
  }
}

/**
 * @desption - 根据传入的key，返回最大值最小值和间隔
 */
export const getMaxMinByKey = (arr, key) => {
  var maxMin = getMaxMin(arr, key)
  var max, min
  if (maxMin) {
    max = maxMin[0]
    min = maxMin[1]
  }
  return generateCoord(max, min)
}

export const getMaxMinByKey2 = (arr, key1, key2) => {
  var maxMin1 = getMaxMin(arr, key1)
  var maxMin2 = getMaxMin(arr, key2)
  var max, min
  if (maxMin1) {
    max = maxMin1[0]
    min = maxMin1[1]
    if (maxMin2) {
      max = max > maxMin2[0] ? max : maxMin2[0]
      min = min < maxMin2[1] ? min : maxMin2[1]
    }
  } else if (maxMin2) {
    max = maxMin2[0]
    min = maxMin2[1]
  }
  return generateCoord(max, min)
}
