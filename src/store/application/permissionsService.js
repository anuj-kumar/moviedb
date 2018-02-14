const isUserTypeDealer = () => localStorage.getItem('userType') === 'dealer'
const isUserTypeDMV = () => localStorage.getItem('userType') === 'dmv'

export const calculateApplicationPermissions = (permissions) => {
  return {
    vehicles: {
      showSoldVehiclesHistoryTab: isUserTypeDealer(),
    },
    userType: {
      dmv: isUserTypeDMV(),
      dealer: isUserTypeDealer(),
    },
  }
}
