import React, { Component } from 'react'
import { CacheService, getMovies } from '../../../services'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('movieListModel')
@observer
class List extends Component {
  componentWillMount(){
    const { movieListModel } = this.props
    movieListModel.fetchMovies()
  }
  handleClick(id) {
      this.props.history.push('/view/' + id)
  }

  renderItem(index, key) {
    return <div key={key.toString()}>{key}</div>;
  }
  render() {
    const { movieListModel : { movies }, history } = this.props
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