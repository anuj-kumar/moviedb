import React from 'react'
import PropTypes from 'prop-types'

export default class OptionSelector extends React.Component {
  static propTypes = {
    labelKey: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueKey: PropTypes.string,
  }

  static defaultProps = {
    labelKey: 'label',
    onChange: _ => _,
    options: [],
    value: '',
    valueKey: 'value',
  }

  onChange = event => {
    this.props.onChange(event.target.value)
  }

  render() {
    const { options, value, valueKey, labelKey } = this.props
    return (
      <select onChange={this.onChange} value={value}>
        {options.map((option, index) => (
          <option key={`select_${option[valueKey]}`} value={option[valueKey]}>{option[labelKey]}</option>
        ))}
      </select>
    )
  }
}
