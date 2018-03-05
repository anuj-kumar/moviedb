import { action, observable, toJS } from 'mobx'
import { getMovieDetails } from '../services'
import { ApplicationModel } from '../store'

export default class MovieModel extends ApplicationModel {

	@observable movie = {}

	@action
	async fetchMovie(ID) {
        this.showLoader()
		const response = await getMovieDetails(ID)
		this.setMovie(response)
        this.hideLoader()
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