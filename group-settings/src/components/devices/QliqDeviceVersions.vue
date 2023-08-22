<template>
  <div class="tw-text-sm tw-text-gray-b">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { DevicesInfoCounters_ApplicationTypeInfo as DevicesInfo } from '@protots/apps/gs/response/device/devices_info_counters'

interface Props {
  deviceInfo: DevicesInfo
}

const props = defineProps<Props>()

const { t } = useI18n()

const label = computed(() => {
  let labelType

  switch (props.deviceInfo?.applicationType) {
    case 'connect':
      labelType = 'gs.devices.AppVersions'
      break
    case 'chat':
      labelType = 'gs.devices.ChatVersions'
      break
    default:
      labelType = 'unknown'
  }

  return t(labelType, {
    ...props.deviceInfo?.appVersions,
  })
})
</script>
