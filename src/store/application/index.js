import { ApplicationModel, MovieModel, MovieListModel } from '../../models/'

export const applicationStores = {
  applicationModel: new ApplicationModel(),
  movieModel: new MovieModel(),
  movieListModel: new MovieListModel(),
}
