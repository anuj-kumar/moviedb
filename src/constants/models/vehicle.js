// TODO: Gaurav: Break this file into smaller meaningful files once done.
import Validator from 'validatorjs'

import { getChoiceFromPath, getVehicleMakeOptions, getVehicleBodyTypeOptions } from '../../services'

const DOCUMENT_ELECTRONIC_MV_50_NUMBER = 'EMV50'
const DOCUMENT_PAPER_MV_50_NUMBER = 'PMV50'
const DOCUMENT_TRANSFERABLE_REGISTRATION = 'TREG'
const DOCUMENT_NYS_TITLE = 'NYST'
const DOCUMENT_OUT_OF_STATE_TITLE = 'OOST'
const DOCUMENT_OUT_OF_STATE_TRANSFER_DOCUMENT = 'OSTD' // eslint-disable-line
const DOCUMENT_MCO = 'MCO'
const DOCUMENT_REPO_PAPERS = 'REPO' // eslint-disable-line
const DOCUMENT_SALVAGE_CERTIFICATE = 'MV907A'
const DOCUMENT_OTHER = 'OTHR' // eslint-disable-line

const MAX_GROUSS_WEIGHT_THRESHOLD = 44800

const selectTypeValueMapper = (value, optionsPath) => {
  if (value) {
    const choices = getChoiceFromPath(optionsPath)
    return choices ? { label: choices[value], value } : value
  }
  return value
}

const TEMPORARY_ADDRESS_VALUE_MAPPER = value => {
  try {
    return typeof value === 'string' ? value : JSON.stringify(value)
  }
  catch (e) {
    alert('Address field is not a valid JSON.') // eslint-disable-line
    return null
  }
}

const checkDocType = (form, docType) => {
  const documentType = form.$('document_type') && form.$('document_type').value ?
    form.$('document_type').value.value : null
  return documentType === docType
}

const showPriorOwnerDependencies = form => checkDocType(form, DOCUMENT_PAPER_MV_50_NUMBER) ||
    checkDocType(form, DOCUMENT_NYS_TITLE)

const validate = (data, rules) => {
  const validation = new Validator(data, rules)
  return validation.passes()
}

const validateElectronicMV50DocType = form => {
  const data = {
    document_number: form.$('document_number').value,
  }
  const rules = {
    document_number: 'required|string|between:13,14',
  }
  return validate(data, rules)
}

const validatePaperMV50DocType = form => {
  const data = {
    document_number: form.$('document_number').value,
    transferor_facility_number: form.$('transferor_facility_number').value,
    prior_owner: form.$('prior_owner').value,
    prior_owner_address: form.$('prior_owner_address').value,
  }
  const rules = {
    document_number: 'required|string|between:12,13',
    transferor_facility_number: 'numeric|max:9999999',
    prior_owner: 'required|string|max:20',
    prior_owner_address: 'required',
  }
  return validate(data, rules)
}

const validateTransferableDocType = form => {
  const data = {
    registration_no: form.$('registration_no').value,
    plate_number: form.$('plate_number').value,
    plate_class: form.$('plate_class').value,
    registrant_last_name: form.$('registrant_last_name').value,
  }
  const rules = {
    registration_no: 'required|string|max:64',
    plate_number: 'string|max:8',
    plate_class: 'alpha|min:3|max:3',
    registrant_last_name: 'string|max:20',
  }
  return validate(data, rules)
}

const validateNYSDocType = form => {
  const data = {
    document_number: form.$('document_number').value,
    prior_owner: form.$('prior_owner').value,
    prior_owner_address: form.$('prior_owner_address').value,
  }
  const rules = {
    document_number: 'regex:/^\\d{6}\\w$/',
    prior_owner: 'required|string|max:20',
    prior_owner_address: 'required',
  }
  return validate(data, rules)
}

const validateOutOfStateDocType = form => {
  const data = {
    document_number: form.$('document_number').value,
    state_of_title: form.$('state_of_title').value,
  }
  const rules = {
    document_number: 'regex:/^\\d{6}\\w$/',
    state_of_title: 'string|max:20',
  }
  return validate(data, rules)
}

const validateMCODocType = form => {
  const data = {
    document_number: form.$('document_number').value,
  }
  const rules = {
    document_number: 'required',
  }
  return validate(data, rules)
}

const validateSalvageDocType = form => {
  const data = {
    document_number: form.$('document_number').value,
  }
  const rules = {
    document_number: 'regex:/^\\w\\d{5}\\w$/',
  }
  return validate(data, rules)
}

// ######### Custom Validators Start ##########
// TODO: Gaurav: A need for changing the labels of dynamic fields may arise
function validateDocumentNumber(documentNumberField) {
  return ({ field, form }) => {
    const documentType = form.$('document_type') && form.$('document_type').value ?
      form.$('document_type').value : undefined
    let isValidDocumentNumber = false

    if (documentType) {
      switch (documentType.value) {
        case DOCUMENT_ELECTRONIC_MV_50_NUMBER:
          isValidDocumentNumber = validateElectronicMV50DocType(form)
          break
        case DOCUMENT_PAPER_MV_50_NUMBER:
          isValidDocumentNumber = validatePaperMV50DocType(form)
          break
        case DOCUMENT_TRANSFERABLE_REGISTRATION:
          isValidDocumentNumber = validateTransferableDocType(form)
          break
        case DOCUMENT_NYS_TITLE:
          isValidDocumentNumber = validateNYSDocType(form)
          break
        case DOCUMENT_OUT_OF_STATE_TITLE:
          isValidDocumentNumber = validateOutOfStateDocType(form)
          break
        case DOCUMENT_MCO:
          isValidDocumentNumber = validateMCODocType(form)
          break
        case DOCUMENT_SALVAGE_CERTIFICATE:
          isValidDocumentNumber = validateSalvageDocType(form)
          break
        default:
          isValidDocumentNumber = true
          break
      }
    }
    return [isValidDocumentNumber, 'The input for field Document Number is invalid']
  }
}
// ######### Custom Validators End ##########

// ######### Properties Start ##########
export const vin = {
  fieldType: 'string',
  label: 'Vehicle Identification Number',
  field: 'vin',
  placeholder: '',
  editable: false,
  rules: 'required|max:17',
  valueMapper(val) {
    return val
  },
  extra: {
    showAlways: true,
  },
}

export const model_year = {
  fieldType: 'number',
  label: 'Model Year',
  field: 'model_year',
  editable: false,
  rules: 'required|numeric|min:1000|max:9999',
  valueMapper(val) {
    return val
  },
  extra: {
    showAlways: true,
  },
}

export const make = {
  fieldType: 'select',
  label: 'Make',
  field: 'make',
  placeholder: '',
  rules: 'required',
  valueMapper(value) {
    return selectTypeValueMapper(value, ['vehicle', 'make'])
  },
  extra: {
    showAlways: true,
  },
  searchable: true,
  optionsProvider: () =>
    getVehicleMakeOptions().then(response => {
      if (response.results) {
        return response.results.map(obj => ({ label: obj.name, value: obj.id }))
      }
      return []
    }),
}

export const classification = {
  fieldType: 'select',
  label: 'Classification of Vehicle',
  field: 'classification',
  placeholder: '',
  searchable: true,
  rules: 'required',
  editable: false,
  optionsPath: ['vehicle', 'classification'],
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const transferor_facility_number = {
  fieldType: 'number',
  label: 'Facility number of transferor',
  field: 'transferor_facility_number',
  rules: 'numeric|max:9999999',
  valueMapper(val) {
    return val
  },
  depends: [
    { validators: [form => checkDocType(form, DOCUMENT_PAPER_MV_50_NUMBER)] },
  ],
}

export const date_of_purchase = {
  fieldType: 'date',
  label: 'Date of Purchase',
  field: 'date_of_purchase',
  placeholder: '',
  rules: 'required',
  editable: false,
  valueMapper(val) {
    return val
  },
}

export const prior_owner = {
  fieldType: 'string',
  label: 'Prior Owner',
  field: 'prior_owner',
  required: true,
  editable: false,
  rules: 'string|max:20',
  valueMapper(val) {
    return val
  },
  depends: [
    { validators: [showPriorOwnerDependencies] },
  ],
}

export const prior_owner_address = {
  fieldType: 'textarea',
  label: 'Prior owner\'s address',
  field: 'prior_owner_address',
  editable: false,
  valueMapper(val) {
    return val ? TEMPORARY_ADDRESS_VALUE_MAPPER(val) : val
  },
  depends: [
    { validators: [showPriorOwnerDependencies] },
  ],
  value: JSON.stringify({
    address_line_1: 'Brooklyn Law School, 250 Joralemon Street',
    address_line_2: null,
    city: 'Brooklyn',
    county: 'New York',
    id: 'ca0a85e1-a5e1-4d35-a424-388ad0e096e4',
    state: 'New York',
    zipcode_1: '11201',
    zipcode_2: null,
  }),
  output: value => JSON.parse(value || '{}'),
}

export const body_type = {
  fieldType: 'select',
  label: 'Body Type',
  field: 'body_type',
  editable: true,
  rules: 'required',
  optionsProvider: () =>
    getVehicleBodyTypeOptions().then(response => {
      if (response.results) {
        return response.results.map(obj => ({ label: obj.name, value: obj.id }))
      }
      return []
    }),
  valueMapper(value) {
    return selectTypeValueMapper(value, ['vehicle', 'body_type'])
  },
}

// TODO: Gaurav: This comment is intentional
// export const body_type_name = {
//   fieldType: 'string',
//   label: 'Body Type Name',
//   field: 'body_type_name',
//   editable: false,
//   rules: 'required',
//   value: 'BUS',
//   valueMapper(val) {
//     return val
//   },
// }

export const model = {
  fieldType: 'string',
  label: 'Model',
  field: 'model',
  editable: false,
  valueMapper(val) {
    return val
  },
  rules: 'required|string|max:32',
}

export const cylinders = {
  fieldType: 'number',
  label: 'Cylinders',
  field: 'cylinders',
  placeholder: '',
  editable: true,
  rules: 'required',
  valueMapper(val) {
    return val
  },
}

export const fuel_type = {
  fieldType: 'select',
  label: 'Fuel Type',
  field: 'fuel_type',
  placeholder: '',
  editable: true,
  searchable: true,
  optionsPath: ['vehicle', 'fuel_type'],
  rules: 'required',
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const color = {
  fieldType: 'select',
  label: 'Color',
  field: 'color',
  placeholder: '',
  editable: true,
  searchable: true,
  optionsPath: ['vehicle', 'color'],
  rules: 'required',
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const color_2 = {
  editable: true,
  fieldType: 'select',
  label: 'Other Color',
  field: 'color_2',
  placeholder: '',
  searchable: true,
  optionsPath: ['vehicle', 'color_2'],
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const weight = {
  fieldType: 'number',
  label: 'Weight',
  field: 'weight',
  editable: true,
  valueMapper(val) {
    return val
  },
  rules: 'required|numeric|max:999999',
}

export const seating_capacity = {
  fieldType: 'number',
  label: 'Seating Capacity',
  field: 'seating_capacity',
  placeholder: '',
  editable: true,
  rules: 'required|max:99',
  valueMapper(val) {
    return val
  },
}

export const maximum_gross_weight = {
  editable: true,
  fieldType: 'number',
  label: 'Maximum gross weight',
  field: 'maximum_gross_weight',
  rules: 'max:999999',
  valueMapper(val) {
    return val
  },
}

export const axles = {
  editable: true,
  fieldType: 'number',
  label: 'Axles',
  field: 'axles',
  depends: [
    {
      validators: [form => {
        const grossWeight = form.$('maximum_gross_weight').value
        if (grossWeight && grossWeight > MAX_GROUSS_WEIGHT_THRESHOLD) {
          return true
        }
        return false
      }],
    },
  ],
  rules: 'max:99',
  valueMapper(val) {
    return val
  },
}

export const distance = {
  editable: true,
  fieldType: 'number',
  label: 'Distance',
  field: 'distance',
  depends: [{
    field: 'axles',
  }],
  rules: 'max:99999',
  valueMapper(val) {
    return val
  },
}

export const odometer = {
  fieldType: 'number',
  label: 'Odometer Reading \n (at the time of purchase)',
  field: 'odometer',
  editable: false,
  rules: 'required|numeric|max:9999999',
  valueMapper(val) {
    return val
  },
}

export const odometer_certificate = {
  fieldType: 'select',
  label: 'Odometer Certification \n Condition',
  field: 'odometer_certificate',
  editable: false,
  rules: 'required',
  optionsPath: ['vehicle', 'odometer_certificate'],
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const document_type = {
  fieldType: 'select',
  label: 'Proof of Ownership (document type)',
  field: 'document_type',
  placeholder: '',
  editable: false,
  optionsPath: ['vehicle', 'document_type'],
  rules: 'required',
  valueMapper(value) {
    return selectTypeValueMapper(value, this.optionsPath)
  },
}

export const document_number = {
  fieldType: 'string',
  label: 'Proof of Ownership (document number)',
  field: 'document_number',
  editable: false,
  depends: [{
    field: 'document_type',
  }],
  validators: [validateDocumentNumber()],
  rules: 'max:50',
  valueMapper(val) {
    return val
  },
}

export const lot_number = {
  fieldType: 'string',
  label: 'Lot Number',
  field: 'lot_number',
  editable: true,
  valueMapper(val) {
    return val
  },
  rules: 'string|max:10',
}

export const plate_number = {
  fieldType: 'string',
  label: 'Plate Number',
  field: 'plate_number',
  valueMapper(val) {
    return val
  },
  rules: 'string|max:8',
  depends: [
    { validators: [form => checkDocType(form, DOCUMENT_TRANSFERABLE_REGISTRATION)] },
  ],
}

export const plate_class = {
  fieldType: 'string',
  label: 'Plate Class',
  field: 'plate_class',
  valueMapper(val) {
    return val
  },
  rules: 'alpha|min:3|max:3',
  depends: [
    { validators: [form => checkDocType(form, DOCUMENT_TRANSFERABLE_REGISTRATION)] },
  ],
}

export const state_of_title = {
  fieldType: 'string',
  label: 'State of title',
  field: 'state_of_title',
  valueMapper(val) {
    return val
  },
  rules: 'string|max:20',
  depends: [
    { validators: [form => checkDocType(form, DOCUMENT_OUT_OF_STATE_TITLE)] },
  ],
}

export const registrant_last_name = {
  fieldType: 'string',
  label: 'Registrant\'s last name',
  field: 'registrant_last_name',
  valueMapper(val) {
    return val
  },
  rules: 'string|max:20',
  depends: [
    { validators: [form => checkDocType(form, DOCUMENT_TRANSFERABLE_REGISTRATION)] },
  ],
}

export const last_plate_number = {
  fieldType: 'string',
  label: 'Last Plate Number',
  field: 'last_plate_number',
  editable: false,
  valueMapper(val) {
    return val
  },
  rules: 'string|max:8',
}

export const facility_number_consignar = {
  fieldType: 'string',
  label: 'Facility Number of \n Consignar',
  field: '', // ask backend team
  editable: false,
  valueMapper(val) {
    return val
  },
}

export const reason = {
  editable: true,
  fieldType: 'string',
  label: 'Modification Reason',
  field: 'reason',
  show: true, // based on condition whether edit mode or creation mode
  valueMapper(val) {
    return val
  },
}

export const registration_no = {
  fieldType: 'string',
  label: 'Registration Number',
  field: 'registration_no',
  editable: false,
  rules: 'required',
  valueMapper(val) {
    return val
  },
}

export const remarks = {
  fieldType: 'textarea',
  label: 'Remarks',
  field: 'remarks',
  editable: true,
  rules: 'required|string',
  valueMapper(val) {
    return val
  },
}

export const purchased_from_name = {
  fieldType: 'string',
  label: 'Name	of	person/Dealer	Vehicle	was	purchased	from',
  field: 'purchased_from_name',
  editable: false,
  rules: 'required|string|max:20',
  valueMapper(val) {
    return val
  },
}

export const purchased_from_address = {
  fieldType: 'textarea',
  label: 'Address	of	person/Dealer	Vehicle	was	purchased	from',
  field: 'purchased_from_address',
  editable: false,
  rules: 'required|string',
  valueMapper(val) {
    return val ? TEMPORARY_ADDRESS_VALUE_MAPPER(val) : val
  },
  value: JSON.stringify({
    address_line_1: 'Brooklyn Law School, 250 Joralemon Street',
    address_line_2: null,
    city: 'Brooklyn',
    county: 'New York',
    id: 'ca0a85e1-a5e1-4d35-a424-388ad0e096e4',
    state: 'New York',
    zipcode_1: '11201',
    zipcode_2: null,
  }),
  output: value => JSON.parse(value || '{}'),
}

export const attested = {
  fieldType: 'string',
  label: 'Attestation',
  field: 'attested',
  valueMapper(val) {
    return val
  },
  value: false,
}

export const status = {
  type: 'hidden',
  field: 'status',
  optionsPath: ['vehicle', 'status'],
}

export const id = {
  type: 'hidden',
  field: 'id',
}

export const make_name = {
  type: 'hidden',
  field: 'make_name',
}

export const current_facility_name = {
  type: 'hidden',
  field: 'current_facility_name',
}
// ######### Properties End ##########
