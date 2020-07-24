import Vue from 'vue'
import moment from 'moment'

export const getDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()
  const sortedDate =
    year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second
  return sortedDate
}

export { Vue, moment }
