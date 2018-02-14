import { observable, action } from 'mobx'

import { calculateApplicationPermissions } from './permissionsService'
import { EMPTY_STRING } from '../../constants'

export default class ApplicationModel {
  @observable application = {
    loader: false,
    token: EMPTY_STRING,
    id: EMPTY_STRING,
  }
  @observable permissions = calculateApplicationPermissions({})

  @action
  showLoader() {
    this.application.loader = true
  }

  @action
  setToken(token) {
    this.application.token = token
  }

  @action
  setPermissions(permissions) {
    this.permissions = calculateApplicationPermissions(permissions)
  }

  @action
  setId(id) {
    this.application.id = id
  }
}
