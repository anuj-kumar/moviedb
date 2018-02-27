import { action, observable, toJS } from 'mobx'
import { getMovies } from '../services'

export default class MovieListModel {

	@observable movies = []

	@action
	async fetchMovies() {
		const response = await getMovies()
		this.setMovies(response)
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