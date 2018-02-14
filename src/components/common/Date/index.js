import React from 'react'
import PropTypes from 'prop-types'

import PopupView from './PopupView'

import styles from './style.css'

export default class DateSelector extends React.Component {
  static propTypes = {
    value: PropTypes.object,
  }

  static defaultProps = {
    value: new Date(),
  }

  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      value: props.value,
    }
  }

  onChange = value => {
    this.setState({ value, showPopup: false })
  }

  getElementRef = ref => {
    this.elementRef = ref
  }

  showPopup = () => {
    this.setState({ showPopup: true })
  }

  hidePopup = event => {
    event.stopPropagation()
  }

  popupContainerClick = event => {
    event.stopPropagation()
    this.setState({ showPopup: false })
  }

  renderPopup() {
    const { top, left, height } = this.elementRef.getBoundingClientRect()
    return (
      <div className={styles.backdrop} onClick={this.popupContainerClick} >
        <div
          className={styles['popup-container']}
          onClick={this.hidePopup}
          style={{ top: top + height, left }}>
          <PopupView onChange={this.onChange} value={this.state.value} />
        </div>
      </div>
    )
  }

  render() {
    const { showPopup, value } = this.state
    console.log('value...', value)
    return (
      <div>
        <div
          ref={this.getElementRef}
          onClick={this.showPopup}
          style={{ height: 20, width: 100, border: '1px solid' }}>
          Hello
        </div>
        {showPopup && this.renderPopup()}
      </div>
    )
  }
}
