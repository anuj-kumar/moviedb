import React from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'
import Slider from 'rc-slider'

const Handle = Slider.Handle

export default class SliderComponent extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    hideValue: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
  }

  static defaultProps = {
    defaultValue: 0,
    disabled: false,
    hideValue: false,
    max: 100,
    min: 0,
    onChange: _ => _,
    step: 1,
    value: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      marks: {},
      value: props.value,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({ value: newProps.value })
    }
  }

  onChange = value => {
    this.setState({ value })
    this.props.onChange(value)
  }

  getHandle = props => {
    const restProps = omit(props, ['value', 'dragging'])
    return (
      <Handle {...restProps} />
    )
  }

  render() {
    const { disabled, defaultValue, min, max, step } = this.props
    const { marks, value } = this.state
    return (
      <Slider
        disabled={disabled}
        defaultValue={defaultValue}
        handle={this.getHandle}
        min={min}
        marks={marks}
        max={max}
        onChange={this.onChange}
        step={step}
        value={value}
      />
    )
  }
}
