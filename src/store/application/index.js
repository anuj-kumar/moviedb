import ApplicationModel from './ApplicationModel'
import { MovieModel, MovieListModel } from '../../models/'

export const applicationStores = {
  applicationModel: new ApplicationModel(),
  movieModel: new MovieModel(),
  movieListModel: new MovieListModel(),
}
