import { DASHBOARD_DATA_PAGE_SIZE } from './constants'

export const onPageChange = dataModel => pageNumber =>
  dataModel.setPageOpts({ page: pageNumber, pageSize: DASHBOARD_DATA_PAGE_SIZE })
