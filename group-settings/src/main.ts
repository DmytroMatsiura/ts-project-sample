import { createApp } from 'vue'

import pinia from '@/shared/plugins/pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import { plugins } from './element-plus'

import '@shared/scss/styles.scss'
import '@fontsource/metropolis'
import '@clr/icons'
import '@clr/icons/shapes/all-shapes'
import 'element-plus/theme-chalk/src/index.scss'
import 'vue-advanced-cropper/dist/style.css'
import ClickOutsideDirective from '@shared/directives/click-outside'

const appPlugins = [pinia, router, i18n, ...plugins]

const app = createApp(App)

appPlugins.forEach((plugin) => {
  app.use(plugin)
})

app.directive('click-outside', ClickOutsideDirective)

app.mount('#group-settings-app')
