<template>
  <ActionList :settings="availableSettings" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { IDevice } from '@gs/models/proto/base/device'
import { useDevicesLogic } from '@gs/components/devices/composables'

import ActionList from '@gs/components/devices/ActionList.vue'

const props = defineProps<{
  selectedDevices: IDevice[]
}>()

const { devicesTableSettingsList } = useDevicesLogic(props)

const availableSettings = computed(() =>
  devicesTableSettingsList.value.filter((setting) => setting.condition())
)
</script>
