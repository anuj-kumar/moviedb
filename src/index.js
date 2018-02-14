import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import mobX from 'mobx'
import DevTools from 'mobx-react-devtools'

import { AppContainer } from './containers'
import { stores } from './store'

mobX.useStrict(true)

render(
  // This provider is responsible for injecting the mobx store into the components
  <Provider {...stores}>
    <div>
      { process.env.NODE_ENV !== 'production' && <DevTools /> }
      <AppContainer {...stores} />
    </div>
  </Provider>,
  document.getElementById('root'),
)

window.store = stores
