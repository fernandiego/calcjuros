// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import VueApexCharts from 'vue3-apexcharts'

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueApexCharts)  // Register ApexCharts globally
}
