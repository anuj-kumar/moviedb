import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

export default class DateCell extends React.Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isSelected: false,
  }

  onChange = () => {
    this.props.onChange(this.props.day)
  }

  render() {
    const { day, isSelected } = this.props
    return (
      <div
        className={classnames(styles['date-column'], { [styles['selected-date-cell']]: isSelected })}
        onClick={this.onChange}>
        {day}
      </div>
    )
  }
}
