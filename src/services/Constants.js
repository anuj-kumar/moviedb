// TODO: Rahul remove DMV_USER_ID and FACILITY_USER_ID after refactoring
export const CONSTANTS = {
  TOKEN_PREFIX: 'jwt',
  DMV_USER_ID: '14a91d8e-8be7-47e2-9454-3d9ab28fd673',
  FACILITY_USER_ID: 'a581fd91-68b0-430b-824c-c4f1e4c9779e',
  dmv: localStorage.getItem('id'),
  dealer: localStorage.getItem('id'),
}

export const setDmvId = id => {
  CONSTANTS.DMV_USER_ID = id
  CONSTANTS.dmv = id
}

export const setDealerId = id => {
  CONSTANTS.FACILITY_USER_ID = id
  CONSTANTS.dealer = id
}
