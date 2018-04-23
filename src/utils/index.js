export default {
  goodTime (str) {
    let now = new Date().getTime()
    let oldTime = new Date(str).getTime()
    let difference = now - oldTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute

    if (_year >= 1) {
      result = ~~(_year) + ' 年前'
    } else if (_month >= 1) {
      result = ~~(_month) + ' 个月前'
    } else if (_week >= 1) {
      result = ~~(_week) + ' 周前'
    } else if (_day >= 1) {
      result = ~~(_day) + ' 天前'
    } else if (_hour >= 1) {
      result = ~~(_hour) + ' 个小时前'
    } else if (_min >= 1) {
      result = ~~(_min) + ' 分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },
  getTagTxt (tab, top, good) {
    let str = ''
    if (top) {
      str = '置顶'
    } else if (good) {
      str = '精华'
    } else {
      switch (tab) {
        case 'share':
          str = '分享'
          break
        case 'ask':
          str = '问答'
          break
        case 'job':
          str = '招聘'
      }
    }
    return str
  },
  getTabInfo (tab) {
    let str = ''
    switch (tab) {
      case 'all':
        str = '全部'
        break
      case 'good':
        str = '精华'
        break
      case 'ask':
        str = '问答'
        break
      case 'job':
        str = '招聘'
        break
      case 'share':
        str = '分享'
        break
    }
    return str
  },
  // 配置节流函数
  throttle: (fn, wait, mustRun) => {
    let timeout
    let startTime = new Date()
    return function () {
      let context = this
      let args = arguments
      let curTime = new Date()

      clearTimeout(timeout)
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        fn.apply(context, args)
        startTime = curTime
      // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(fn, wait)
      }
    }
  }
}
