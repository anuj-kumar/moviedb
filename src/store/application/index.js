import ApplicationModel from './ApplicationModel'
import { TodosModel } from '../../models/'

export const applicationStores = {
  applicationModel: new ApplicationModel(),
  todosModel: new TodosModel(),
}
