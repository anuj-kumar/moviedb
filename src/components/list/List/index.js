import React, { Component } from 'react'
import { CacheService, getMovies } from '../../../services'
import { inject, observer } from 'mobx-react'
import ReactTable from "react-table";
import "react-table/react-table.css";

@inject('movieListModel')
@observer
export default class List extends Component {
  componentWillMount(){
    const { movieListModel } = this.props
    movieListModel.fetchMovies()
  }
  render() {
    const { movieListModel : { movies } } = this.props
    let movieList = movies.toJS()
    return (
      <div>
        <ReactTable
          data={movieList}
          columns={[
              {
                Header: "Title",
                accessor: "title"
              },
              {
                Header: "Released",
                accessor: "year"
              }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )
  }
}
