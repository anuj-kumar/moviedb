import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { isEmpty, isNil } from 'lodash'


export default class TabsComponent extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selectedTab: PropTypes.number,
    tabs: PropTypes.array.isRequired,
  }

  static defaultProps = {
    selectedTab: 0,
    onSelect: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.selectedTab,
    }
  }

  onSelect = selectedTab => {
    this.setState({ selectedTab })
    if (this.props.onSelect) {
      this.props.onSelect(selectedTab)
    }
  }

  render() {
    const { tabs } = this.props
    if (isNil(tabs) || isEmpty(tabs)) {
      return <div>tabs must be provided.</div>
    }
    const { selectedTab } = this.state
    const renderedTabs = []
    const renderedTabsPanels = []
    tabs.forEach((tab, index) => {
      const { component, label, show = true } = tab
      if (show) {
        renderedTabs.push(<Tab key={`tab_title_${label}`}><span className="tabLabel">{label}</span></Tab>)
        renderedTabsPanels.push(<TabPanel key={`tab_component_${label}`}>{component}</TabPanel>)
      }
    })
    return (
      <Tabs onSelect={this.onSelect} selectedIndex={selectedTab} >
        <TabList>
          {renderedTabs}
        </TabList>
        {renderedTabsPanels}
      </Tabs>
    )
  }
}
