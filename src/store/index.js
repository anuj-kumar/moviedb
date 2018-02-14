import { RouterStore } from 'mobx-react-router'

import { applicationStores } from './application'
import { commonStores } from './common'

export const stores = {
  ...commonStores,
  ...applicationStores,
  routing: new RouterStore(),
}
