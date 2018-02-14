import { observable } from 'mobx'

export default class TodosModel {
  @observable todos = []
}
