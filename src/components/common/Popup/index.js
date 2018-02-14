import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'mobx-react'
import classnames from 'classnames'

import { KEY_CODE_ESCAPE } from '../../../constants'

import styles from './style.css'

const VALID_CONTAINER = 'body'

export default class Popup extends Component {
  static propTypes = {
    backdrop: PropTypes.bool,
    children: PropTypes.node,
    container: PropTypes.string,
    id: PropTypes.string,
    modal: PropTypes.bool,
    noAnim: PropTypes.bool,
    onBackdropClick: PropTypes.func,
    onClose: PropTypes.func,
    store: PropTypes.object,
    style: PropTypes.object,
  }

  static defaultProps = {
    backdrop: true,
    children: null,
    container: null,
    id: 'outerDiv',
    modal: true,
    noAnim: false,
    onBackdropClick: () => {},
    onClose: () => {},
    store: {},
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    const { container } = this.props
    if (container === VALID_CONTAINER) {
      document.body.onkeyup = e => {
        if (new RegExp(KEY_CODE_ESCAPE).test(e.keyCode)) {
          this.flushRender()
        }
      }
      this.renderToBody()
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.container !== newProps.container && newProps.container === 'body') {
      this.renderToBody()
    }
  }

  componentWillUnmount() {
    const { container } = this.props
    if (container === 'body') {
      document.body.onkeyup = undefined
      this.flushRender()
    }
  }

  onBackDropClick = () => {
    const { onBackdropClick, modal } = this.props
    if (!modal) {
      onBackdropClick()
      this.flushRender()
    }
  }

  flushRender = () => {
    const { onClose, id } = this.props
    const element = document.getElementById(id)
    if (element) {
      ReactDOM.unmountComponentAtNode(element)
      document.body.removeChild(element)
      this.setState({
        active: false,
      }, () => {
        onClose(id)
      })
    }
  }

  renderToBody = () => {
    const { backdrop, container, id, children, style = {} } = this.props
    const div = document.createElement('div')
    div.id = id
    div.style.position = 'fixed'
    div.style.top = 0
    div.style.right = 0
    div.style.left = 0
    div.style.bottom = 0
    div.style.zIndex = 99999
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'
    document.body.appendChild(div)
    let elm = (
      <div className={styles.container}>
        {backdrop && <div className={styles.backdrop} onClick={this.onBackDropClick} />}
        <div className={classnames(styles.content, style.contentContainer)}>{children}</div>
      </div>
    )
    if (container === 'body') {
      elm = (
        <Provider store={this.props.store}>
          {elm}
        </Provider>
      )
    }
    ReactDOM.render(elm, document.getElementById(id))
    this.setState({
      active: true,
    })
  }

  render() {
    const { backdrop, container, children, onBackdropClick, noAnim } = this.props
    if (container === 'body') {
      return null
    }
    const containerStyle = { }
    const containerClass = noAnim ? `${styles.container} ${styles['no-anim']}` : styles.container
    return (<div className={containerClass} style={containerStyle}>
      {backdrop && <div className={styles.backdrop} onClick={() => onBackdropClick()} />}
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>)
  }
}
