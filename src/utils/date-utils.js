const LEADING_ZERO = '0'
const DATE_SEPARATOR = '/'

/*
* convert date to YYYY/MM/DD format
* @example 
 * input - "2017-10-13T09:21:06.742380Z"
 * output - 2017/10/13
*/
export function convertDate(dateString) {
  if (dateString) {
    const date = new Date(dateString)
    const day = (LEADING_ZERO + date.getDate()).slice(-2)
    const month = (LEADING_ZERO + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()
    return `${year}${DATE_SEPARATOR}${month}${DATE_SEPARATOR}${day}`
  }
  console.error('Incorrect Date')
  return null
}
