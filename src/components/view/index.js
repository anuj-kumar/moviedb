import React from 'react'

export default class View extends React.Component {
  state = {
    value: '',
  }

  onChange = e => {
    let updatedValue = e.target.value
    const value = this.state.value

    if (isNaN(updatedValue)) {
      updatedValue = value
    }
    else {
      updatedValue = +updatedValue
    }

    this.setState({ value: updatedValue })
  }

  render() {
    return (
      <input type={'text'} value={this.state.value} onChange={this.onChange} />
    )
  }
}
