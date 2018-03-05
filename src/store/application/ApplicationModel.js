import { observable, action } from 'mobx'

import { calculateApplicationPermissions } from './permissionsService'
import { EMPTY_STRING } from '../../constants'

export default class ApplicationModel {
  @observable application = {
    loader: false
  }

  @action
  showLoader() {
    this.application.loader = true
  }

  @action
  hideLoader() {
    this.application.loader = false
  }
}