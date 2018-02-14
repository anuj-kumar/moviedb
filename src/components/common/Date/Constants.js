export const monthOptions = [
  { label: 'Jan', value: 0 },
  { label: 'Feb', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Apr', value: 3 },
  { label: 'May', value: 4 },
  { label: 'Jun', value: 5 },
  { label: 'Jul', value: 6 },
  { label: 'Aug', value: 7 },
  { label: 'Sep', value: 8 },
  { label: 'Oct', value: 9 },
  { label: 'Nov', value: 10 },
  { label: 'Dec', value: 11 },
]
export const yearOptions = []

export const getYearOptions = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const startYear = currentYear - 10
  const endYear = currentYear + 10
  for (let k = startYear; k <= endYear; k++) {
    yearOptions.push({ label: k, value: k })
  }
}
getYearOptions()

export const weekLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const getLastDateOfMonth = (year, month) => (new Date(year, month + 1, 0).getDate())

export const getDayOnFirstDateOfMonth = (year, month) => {
  const clonedDate = new Date(year, month, 1)
  return clonedDate.getDay()
}
