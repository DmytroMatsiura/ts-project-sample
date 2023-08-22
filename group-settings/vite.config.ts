import merge from 'lodash/merge'
import { defineConfig } from 'vite'

import defaultConfig from '../vite.config'

export default defineConfig(
  merge(defaultConfig, {
    root: './group-settings',

    build: {
      outDir: '../dist/group-settings',
    },
  })
)
