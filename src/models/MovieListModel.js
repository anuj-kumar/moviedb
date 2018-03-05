import { action, observable, toJS } from 'mobx'
import { getMovies } from '../services'

export default class MovieListModel {

	@observable movies = []

	@action
	async fetchMovies(appModel) {
	    appModel.showLoader()
		const response = await getMovies()
		this.setMovies(response)
		appModel.hideLoader()
	}
	@action
	setMovies(response) {
		this.movies = response
	}
	@action
	getMovies() {
		return toJS(this.movies)
	}

}