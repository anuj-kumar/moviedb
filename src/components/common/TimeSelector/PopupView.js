import React from 'react'
import { isNil, isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import Slider from '../Slider'

export default class TimeSelector extends React.Component {
  static propTypes = {
    hidePopup: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    hidePopup: _ => _,
    onChange: _ => _,
    value: '',
  }

  constructor(props) {
    super(props)
    this.state = this.getHoursAndMinutes(props.value)
  }

  onHourChange = hour => {
    this.setState(previousState => {
      const { value } = previousState
      const values = value.split(':')
      return { hour, value: `${this.getHourOnMinutedPrependedWithZero(hour)}: ${values[1]}` }
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  onMinuteChange = minute => {
    this.setState(previousState => {
      const { value } = previousState
      const values = value.split(':')
      return { minute, value: `${values[0]}: ${this.getHourOnMinutedPrependedWithZero(minute)}` }
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  onNowButtonClick = () => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    this.setState({
      hour,
      minute,
      value: `${this.getHourOnMinutedPrependedWithZero(hour)}:${this.getHourOnMinutedPrependedWithZero(minute)}`,
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  getHourOnMinutedPrependedWithZero(hourOrMinute) {
    if (hourOrMinute >= 0 && hourOrMinute <= 9) {
      return `0${hourOrMinute}`
    }
    return hourOrMinute
  }

  getHoursAndMinutes(value) {
    if (isNil(value) || isEmpty(value)) {
      return { hour: 0, minute: 0, value: '00:00' }
    }
    const values = value.split(':')
    return {
      hour: +values[0],
      minute: +value[1],
      value,
    }
  }

  render() {
    const { hour, minute, value } = this.state
    return (
      <div>
        <div>Time: {value}</div>
        <div>Hour <Slider min={0} max={23} onChange={this.onHourChange} value={hour} /></div>
        <div>Minute <Slider min={0} max={59} onChange={this.onMinuteChange} value={minute} /></div>
        <div>
          <div onClick={this.onNowButtonClick}>Now</div>
          <div onClick={this.props.hidePopup}>Done</div>
        </div>
      </div>
    )
  }
}
