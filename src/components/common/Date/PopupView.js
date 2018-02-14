import React from 'react'
import PropTypes from 'prop-types'

import DateCell from './DateCell'
import { OptionSelector } from '../'
import { monthOptions, yearOptions, weekLabels, getLastDateOfMonth, getDayOnFirstDateOfMonth } from './Constants'

import styles from './style.css'

export default class DateSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
  }

  static defaultProps = {
    onChange: _ => _,
    value: new Date(),
  }

  constructor(props) {
    super(props)
    const initialValues = this.getValues(props.value)
    this.state = {
      value: props.value,
      ...initialValues,
    }
  }

  onDateChange = date => {
    const { year, month } = this.state
    const value = new Date(year, month, date)
    this.setState({ date, value })
    this.props.onChange(value)
  }

  onMonthChange = month => {
    this.setState({ month: +month })
  }

  onYearChange = year => {
    this.setState({ year: +year })
  }

  getValues(dateValue) {
    return {
      date: dateValue.getDate(),
      month: dateValue.getMonth(),
      year: dateValue.getFullYear(),
    }
  }

  moveBack = () => {
    const { month, year } = this.state
    const stateUpdates = {}
    if (month === 0) {
      stateUpdates.month = 11
      stateUpdates.year = year - 1
    }
    else {
      stateUpdates.month = month - 1
    }
    this.setState(stateUpdates)
  }

  moveForward = () => {
    const { month, year } = this.state
    const stateUpdates = {}
    if (month === 11) {
      stateUpdates.month = 0
      stateUpdates.year = year + 1
    }
    else {
      stateUpdates.month = month + 1
    }
    this.setState(stateUpdates)
  }

  renderCalendar() {
    const { date, month, year } = this.state
    const daysInMonth = getLastDateOfMonth(year, month)
    const startingDay = getDayOnFirstDateOfMonth(year, month)
    const rows = []
    let row = []
    let day = 1
    let i = 0
    let j = 0
    for (i = 0; i < 7; i++) {
      row.push(<div key={`header_${i}`} className={styles['date-column']} >{weekLabels[i]}</div>)
    }
    rows.push(<div key={'row_header'} className={styles['date-row']}>{row}</div>)
    for (i = 0; i < 6; i++) {
      row = []
      for (j = 0; j < 7; j++) {
        if (day <= daysInMonth && (i > 0 || j >= startingDay)) {
          const dateCellProps = {
            key: `cal_key_${i}_${j}`,
            onChange: this.onDateChange,
            day,
            isSelected: date === day,
          }
          row.push(<DateCell {...dateCellProps} />)
          day++
        }
        else {
          row.push(<div key={`cal_key_${i}_${j}`} className={styles['date-column']} />)
        }
      }
      rows.push(<div key={`row_${i}`} className={styles['date-row']}>{row}</div>)
      if (day > daysInMonth) {
        break
      }
    }
    return rows
  }

  renderMonthOptionSelector(month) {
    return <OptionSelector onChange={this.onMonthChange} options={monthOptions} value={month} />
  }

  renderYearOptionSelector(year) {
    return <OptionSelector onChange={this.onYearChange} options={yearOptions} value={year} />
  }

  renderHeader() {
    const { month, year } = this.state
    return (
      <div>
        <div onClick={this.moveBack}>Left</div>
        {this.renderMonthOptionSelector(month)}
        {this.renderYearOptionSelector(year)}
        <div onClick={this.moveForward}>Right</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderCalendar()}
      </div>
    )
  }
}
