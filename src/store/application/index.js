import ApplicationModel from './ApplicationModel'
import { MovieModel } from '../../models/'

export const applicationStores = {
  applicationModel: new ApplicationModel(),
  movieModel: new MovieModel(),
}
