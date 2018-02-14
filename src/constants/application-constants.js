import NPMPackage from '../../package.json'

export const AppConstants = {
  name: NPMPackage.name,
  title: NPMPackage.title,
  timeout: {
    time: 2000,
    retries: 0,
  },
  dataUrl: process.env.DATA_URL,
  supportUrl: 'support@verifi.com',
  validateResponses: true,
}
