import React, { Component } from 'react'
import { CacheService, getMovies } from '../../../services'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Loader } from '../../loader'

@inject('movieListModel', 'applicationModel')
@observer
class List extends Component {
  componentWillMount(){
    const { movieListModel, applicationModel } = this.props
    movieListModel.fetchMovies(applicationModel)    
  }
  handleClick(id) {
      this.props.history.push('/view/' + id)
  }

  renderItem(index, key) {
    return <div key={key.toString()}>{key}</div>;
  }
  render() {
    const { applicationModel, movieListModel : { movies }, history } = this.props
    if (applicationModel.application.loader) {
      return <Loader/>
    }
    let movieList = movies.toJS()
    return (
      <div>
        <h1>Movies</h1>
        <ul>
          {
            movieList.map((movie) => {
              return <li key={movie.id} onClick={(e) => this.handleClick(movie.id)}>
                <h3>{movie.title}</h3>
                <p>year: {movie.year}</p>
              </li>
            })
          }
      </ul>
      </div>
    )
  }
}
export default withRouter( List )