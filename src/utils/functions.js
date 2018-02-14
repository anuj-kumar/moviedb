import { getFormattedChoiceFromPath } from '../services'

export function concatenator(arr, separator = ',') {
  if (!arr || !arr.length) {
    return ''
  }
  return arr.filter(item => !!item).join(separator)
}

export function keyValueMapper(arr, value) {
  return getFormattedChoiceFromPath(arr).filter(obj =>
    obj.value === value)[0] ? getFormattedChoiceFromPath(arr).filter(obj =>
      obj.value === value)[0].label : null
}
