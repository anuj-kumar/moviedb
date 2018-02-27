import { action, observable, toJS } from 'mobx'
import { getMovieDetails } from '../services'

export default class MovieListModel {

	@observable movie = {}

	@action
	async fetchMovie(ID) {
		const response = await getMovieDetails(ID)
		this.setMovie(response)
	}
	@action
	setMovie(response) {
		this.movie = response
	}
	@action
	getMovie() {
		return toJS(this.movie)
	}

}