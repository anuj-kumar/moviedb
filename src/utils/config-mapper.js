import React from 'react'

import { ACTION_TYPE_LINK, FIELDS_VEHICLE } from '../constants'
import { VehicleFields } from '../constants/models'
import { HeaderField } from '../components'

const modelMap = {
  [FIELDS_VEHICLE]: VehicleFields,
}

export function getDashboardDocketAction({
  label = 'View All',
  style = {},
  type = ACTION_TYPE_LINK,
  callback = () => {} } = {}) {
  return [{
    label,
    type,
    style,
    callback,
  }]
}

export function getPlainDocketAction({
  label = 'View All',
  style = {},
  type = ACTION_TYPE_LINK,
  callback = () => {} } = {}) {
  return {
    label,
    type,
    style,
    callback,
  }
}

export function getDocketHeaderConfig({ actions, title } = {}) {
  return { actions, title }
}

export function getDocketFooterConfig({ actions, onPageChange, page, pageSize, showPagination,
  totalResultCount } = {}) {
  return { actions, paginationInfo: { onPageChange, page, pageSize, showPagination, totalResultCount } }
}

export function getBaseColumnConfig({ model, ...options }) {
  const modelFields = modelMap[model]
  const baseColumnConfig = {}
  if (modelFields[options.property] && modelFields[options.property].optionsPath) {
    baseColumnConfig.choiceResolver = modelFields[options.property].optionsPath
  }
  return {
    ...baseColumnConfig,
    ...options,
  }
}

/* eslint-disable */
/**
 * Takes in some options to generate the field formatter.
 * @param: onBlur
 * @param: onChange
 * @param: onSort
 * @param: showFilters, activates the filters
 * @param: field, the field options. extra params will be inserted automatically
 *//* eslint-disable */
export const fieldFormatterFactory = ({ onBlur, onChange, onSort, showFilters = false, field = {}, isSortable = true } = {}) =>
  (name, extraParameters) => {
    const finalFieldOpts = {
      ...field,
      extraParameters,
    }
    const finalInputOpts = {}
    if (isSortable) {
      finalInputOpts.onSort = onSort
    }
    if (showFilters) {
      switch (field.type) {
        case 'select':
          finalInputOpts.onChange = onChange
          break
        default:
          finalInputOpts.onBlur = onBlur
      }
    }

    return (<HeaderField
      field={finalFieldOpts}
      input={finalInputOpts}
      label={name}
      isEditable={showFilters}
      isSortable={isSortable || false}
    />)
  }
/* eslint-enable */
