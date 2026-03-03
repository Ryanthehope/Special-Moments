import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '54015okq',
    dataset: 'firstone'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'sbbrsa7q0gpvrpofmg04eboz',
  }
})
