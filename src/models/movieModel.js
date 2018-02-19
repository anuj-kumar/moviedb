import { observable } from 'mobx'

export default class MovieModel {
  @observable movie = {}
	async function getMovieDetails({ vehicleId }) {
	  const url = 'http://139.59.19.220:8000/movies' + vehicleId
	  try {
	    return await api(url)
	  }
	  catch (e) {
	    ErrorHandlingService.handleAPIError({ error: e })
	    return null
	  }
	}
}

