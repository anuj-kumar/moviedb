import fetch from 'isomorphic-fetch'
import { map } from 'lodash'
// TODO: Update the mechanism of fetching the token
import { CONSTANTS as serviceConstants } from '../services'
import { BASE_URL, EMPTY_STRING } from '../constants'

let authToken
let userType
async function fetchResponse(uri, params) {
/*  const token = localStorage.getItem('token')
  if (token) {
    params.headers.Authorization = `token ${token}` // eslint-disable-line
  } */

  try {
    const response = await fetch(uri, params)
    const contentType = response.headers.get('content-type')
    if (response.status === 204) {
      return {}
    }
    if (response.ok) {
      if (contentType === 'application/json') return response.json()
      if (contentType.substring(0, 6) === 'image/') return response.blob()
      return await response.json()
    }
    const error = new Error()
    error.response = response
    error.status = response.status
    throw error
  }
  catch (err) {
    const error = new Error()
    error.statusCode = err.status
    error.message = err.message
    if (error.message === 'Failed to fetch') {
      error.message = 'Unable to connect to the server.'
    }
    if (err.response) {
      const errorBody = await err.response.json()
      error.body = errorBody
    }
    throw error
  }
}

function setAuthHeader(authTokenParam, headers) {
  const newHeader = headers
  if (authTokenParam) {
    newHeader.Authorization = `${serviceConstants.TOKEN_PREFIX} ${authToken}`
  }
  else { // TODO [Saksham] delete else local storage logic once it's no longer needed
    newHeader.Authorization = `${serviceConstants.TOKEN_PREFIX} ${localStorage.getItem('token')}`
  }
  return newHeader
}

export async function api(uri, { headers = {}, method = 'GET', body = {} } = {}) {
  const params = {
    headers: appendCommonHeader(headers),
    method,
  }

  if (params.method !== 'GET') {
    params.body = JSON.stringify(body)
  }

  try {
    return fetchResponse(uri, params)
  }
  catch (e) {
    throw e
  }
}

export function getQueryString(options) {
  let queryString = ''
  let useQuestionConnector = true
  if (options) {
    map(options, (value, prop) => {
      if (useQuestionConnector) {
        queryString += `?${prop}=${value}`
        useQuestionConnector = false
      }
      else {
        queryString += `&${prop}=${value}`
      }
    })
  }
  return queryString
}

export function setToken(token, user) {
  authToken = token
  userType = user
}
// DELETE logic of local storage
export function getUserType() {
  return userType || localStorage.getItem('userType')
}

export function appendCommonHeader(headerOpts) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  headers = setAuthHeader(authToken, headers)
  return headers
}

export function getMappedUrl(urlTemplate = EMPTY_STRING, templateVars = [], queryParams = EMPTY_STRING) {
  let mappedUrl = urlTemplate
  templateVars.forEach((templateVar, index) => {
    mappedUrl = mappedUrl.replace(`$${index + 1}`, templateVar)
  })
  return `${BASE_URL}/${mappedUrl}${getQueryString(queryParams)}`
}
