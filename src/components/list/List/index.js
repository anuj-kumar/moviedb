import React, { Component } from 'react'
import { movieModel } from '../../../models'
import { CacheService, getMovies } from '../../../services'
import { inject, observer } from 'mobx-react'

@inject('movieModel')
@observer
export default class List extends Component {
  ComponentWillMount(){
    const data = getMovies();
    console.log(data);
  }
  render() {
    // setItem('a', 1)
    console.log(this.state)
    return (
      <div className="movie-list">
        <h1>Movies</h1>
        <ul>
          <li>Hi</li>
        </ul>
      </div>
    )
  }
}
