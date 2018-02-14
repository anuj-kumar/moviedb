import { isEmpty } from 'lodash'
import { CONSTANTS as serviceConstants } from '../services/Constants'
import { getAcceptHeader } from '../../src/constants/url-mappings'

/**
* Method to check http status code and returns boolean value depicting whether error occurred or not.
* @params status : http status code
* return : Boolean
*/
export const isError = status => {
  if (status.toString().startsWith('2') || status.toString().startsWith('3')) {
    return false
  }
  else if (status.toString().startsWith('4') || status.toString().startsWith('5')) {
    return true
  }
  return false
}

/**
 * Method to download an attachement.
 * @param {string} url
 * @param {boolean} excelFlag
 */
export const downloadFile = (url, extension) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function () {
      if (!isError(this.status)) {
        let filename = ''
        const disposition = xhr.getResponseHeader('Content-Disposition')
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '')
          }
        }
        const type = xhr.getResponseHeader('Content-Type')

        const blob = new Blob([this.response], { type })
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE workaround for "HTML7007: One or more blob URLs were revoked
          // by closing the blob for which they were created. These URLs will no longer
          // resolve as the data backing the URL has been freed."
          window.navigator.msSaveBlob(blob, filename)
        }
        else {
          const URL = window.URL || window.webkitURL
          const downloadUrl = URL.createObjectURL(blob)

          if (filename) {
            // use HTML5 a[download] attribute to specify filename
            const a = document.createElement('a')
            // safari doesn't support this yet
            if (typeof a.download === 'undefined') {
              window.location = downloadUrl
            }
            else {
              a.href = downloadUrl
              a.download = filename
              document.body.appendChild(a)
              a.click()
            }
          }
          else {
            window.location = downloadUrl
          }

          setTimeout(() => {
            URL.revokeObjectURL(downloadUrl)
          }, 100) // cleanup
        }
        resolve()
      }
      else {
        reject(new Error('An error has occurred.'))
      }
    }

    let token = localStorage.getItem('token')
    if (token) {
      token = `${serviceConstants.TOKEN_PREFIX} ${token}`
    }

    xhr.setRequestHeader('Authorization', `${token}`)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    if (!isEmpty(extension)) {
      const accept = getAcceptHeader(extension)
      if (!isEmpty(accept)) {
        xhr.setRequestHeader('Accept', accept)
      }
    }
    xhr.send()
  })
)

