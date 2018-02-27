import { ErrorHandlingService } from '.'
import { api } from '../utils'

const API_URL = 'http://139.59.19.220:8000'

export const getMovieDetails = async ({ ID }) => {
  const url = API_URL + '/movies/' + ID
  try {
    return await api(url)
  }
  catch (e) {
    ErrorHandlingService.handleAPIError({ error: e })
    return null
  }
}

export async function getMovies() {
  const url = API_URL + '/movies/'
  // try {
    console.log(url)
    return await api(url)
  // }
  // catch (e) {
  //   ErrorHandlingService.handleAPIError({ error: e })
  //   return null
  // }
}
