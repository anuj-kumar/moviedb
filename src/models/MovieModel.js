import { action, observable, toJS } from 'mobx'
import { stores } from '../store'
import { ApplicationModel } from '../models'
import { getMovieDetails } from '../services'

export default class MovieModel {

	@observable movie = {}
	appModel = {}
	constructor() {
		this.appModel = new ApplicationModel()
		this.init()
	}
	@action
	init() {
		this.movie = {}
	}

	@action
	async fetchMovie(appModel, ID) {
	    appModel.showLoader()
		const response = await getMovieDetails(ID)
		this.setMovie(response)
	    appModel.hideLoader()
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