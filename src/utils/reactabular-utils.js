import { get, isNil } from 'lodash'
import { concatenator, convertDate } from '.'
import { EXPRESS_DELIVERY, NORMAL_DELIVERY, DEFAULT_TRUE, DEFAULT_FALSE } from '../constants'

export function nameConcatenatorFormatter(props = []) {
  return (value, { rowData }) => {
    const properties = []
    props.forEach(prop => properties.push(get(rowData, prop)))
    return concatenator(properties, ' ') || null
  }
}

export function booleanFormatter(trueValue = DEFAULT_TRUE, falseValue = DEFAULT_FALSE) {
  return value => {
    if (isNil(value)) {
      return null
    }
    return value ? trueValue : falseValue
  }
}

export function getTransferPurchaserName() {
  return nameConcatenatorFormatter(['purchaser.last_name', 'purchaser.first_name'])
}

export function renderBooleanValue(value) {
  return (!isNil(value) && value === false) ? 'No' : 'Yes'
}

export function renderDateValue(value) {
  return convertDate(value)
}

export function getOwnershipOwnerName() {
  return nameConcatenatorFormatter(['owner_history.owner.first_name', 'owner_history.owner.last_name'])
}

export function renderAddressValue(value) {
  // TODO Saksham: need to figure a way to make all data entering this uniform fro backend(?)
  return `${value.address_line_1}`
}

export function getDeliveryType() {
  return booleanFormatter(EXPRESS_DELIVERY, NORMAL_DELIVERY)
}
