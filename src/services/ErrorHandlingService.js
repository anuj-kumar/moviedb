import { forOwn } from 'lodash'

import { SEVERITY_ERROR, MESSAGE_MEDIUM_TOAST } from '../constants'

const mapDetailErrorFormat = e => ({
  Error: e.body.detail.message,
})

const mapError = e => {
  if (e.body && e.body.detail) {
    return mapDetailErrorFormat(e)
  }
  return e.body
}

const extractMessages = (e, severity) => {
  const messages = []
  if (e) {
    forOwn(mapError(e), (value, key) => {
      messages.push({
        // TODO: Gaurav: this will have to be updated as per specs
        message: `${key}:${JSON.stringify(value)}`,
        severity,
      })
    })
  }

  return messages
}

export class ErrorHandlingService {
  static showMessages(medium, messages) {

  }

  static handleAPIError({ error, severity = SEVERITY_ERROR, medium = MESSAGE_MEDIUM_TOAST }) {
    const messages = extractMessages(error, severity)
    this.showMessages(medium, messages)
  }

  static showMessage({ message, severity = SEVERITY_ERROR, medium = MESSAGE_MEDIUM_TOAST }) {
    this.showMessages(medium, [{ message, severity }])
  }
}
