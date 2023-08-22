<template>
  <div
    v-for="item in availableSettings"
    :key="item.id"
    class="tw-px-4 tw-py-1 tw-text-black tw-text-opacity-90 tw-cursor-pointer hover:tw-bg-black hover:tw-bg-opacity-5"
  >
    <ConfirmDialog
      :label="item.label"
      :warning="item.warning"
      @confirm="item.handler"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ConfirmDialog from '@gs/components/devices/ConfirmDialog.vue'

import { ISetting } from '@gs/models/interfaces'

const props = defineProps<{
  settings: ISetting[]
}>()

const availableSettings = computed(() =>
  props.settings?.filter((setting) => setting.condition())
)
</script>
