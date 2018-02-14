import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const commonPlugins = { dvr: validatorjs }

export const createForm = (fields, hooks, plugins) => {
  const extendedPlugins = plugins ? { ...commonPlugins, ...plugins } : commonPlugins
  return new MobxReactForm({ fields }, { plugins: extendedPlugins, hooks })
}

export const transformFields = fieldMap => {
  const fields = []

  Object.keys(fieldMap).map(field => fields.push({
    ...fieldMap[field],
    name: field,
  }))

  return fields
}
