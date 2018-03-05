import { observable, action } from 'mobx'

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