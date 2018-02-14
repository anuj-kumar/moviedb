import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { BreadcrumbComponent } from '../../components'

@inject('internalRoutingModel')
@observer
export class BreadcrumbContainer extends Component {
  static propTypes = {
    internalRoutingModel: PropTypes.object.isRequired,
  }

  renderBreadcrumb = breadcrumb => <BreadcrumbComponent breadcrumb={breadcrumb} />

  render() {
    const { internalRoutingModel } = this.props
    return internalRoutingModel.route ? this.renderBreadcrumb(internalRoutingModel.route.split('/'))
      : null
  }
}
