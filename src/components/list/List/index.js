import React, { Component } from 'react'

export default class ListComponent extends Component {
  render() {
    return (
      <div className="movie-list">
        <h1>Movies</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    )
  }
}
