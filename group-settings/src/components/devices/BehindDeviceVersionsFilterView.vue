<template>
  <el-progress
    v-if="isPending(devicePageInfo)"
    :percentage="50"
    indeterminate
    :show-text="false"
    class="tw-m-3"
    :duration="1.5"
  />

  <div v-else-if="hasFailed(devicePageInfo)" class="tw-grow-0">
    <el-alert type="error" data-fail-alert class="tw-p-4" :closable="false">
      {{ $t('gs.devices.fetchError') }}
    </el-alert>
  </div>

  <div v-else class="lg:tw-flex lg:tw-items-center">
    <div class="tw-mb-2 lg:tw-mb-0 tw-flex tw-items-center">
      <span
        class="tw-whitespace-nowrap tw-text-sm tw-text-blue-500 hover:tw-underline"
        :class="{
          'tw-underline':
            props.versionsFilter === BehindDeviceVersionsFilter.ALL_DEVICES,
        }"
        @click="updateVersionsFilter(BehindDeviceVersionsFilter.ALL_DEVICES)"
      >
        {{ $t('gs.devices.all') }}
      </span>
    </div>
    <span class="tw-mx-1 tw-hidden lg:tw-inline-block">|</span>
    <div class="tw-mb-2 lg:tw-mb-0 tw-flex tw-items-center">
      <span
        class="tw-whitespace-nowrap tw-text-sm tw-text-blue-500 hover:tw-underline"
        :class="{
          'tw-underline':
            props.versionsFilter === BehindDeviceVersionsFilter.BEHIND_ONE,
        }"
        @click="updateVersionsFilter(BehindDeviceVersionsFilter.BEHIND_ONE)"
      >
        {{ $t('gs.devices.oneVersionBehind') }}
      </span>
      <span
        class="tw-px-1 tw-mx-1 tw-inline-block tw-rounded-xl tw-text-xxs tw-text-white tw-bg-blue-700"
      >
        {{ behindDeviceVersionsCounter?.behindOne ?? 0 }}
      </span>
    </div>
    <span class="tw-mx-1 tw-hidden lg:tw-inline-block">|</span>
    <div class="tw-mb-2 lg:tw-mb-0 tw-flex tw-items-center">
      <span
        class="tw-whitespace-nowrap tw-text-sm tw-text-blue-500 hover:tw-underline"
        :class="{
          'tw-underline':
            props.versionsFilter === BehindDeviceVersionsFilter.BEHIND_TWO,
        }"
        @click="updateVersionsFilter(BehindDeviceVersionsFilter.BEHIND_TWO)"
      >
        {{ $t('gs.devices.twoVersionsBehind') }}
      </span>
      <span
        class="tw-px-1 tw-mx-1 tw-inline-block tw-rounded-xl tw-text-xxs tw-text-white tw-bg-blue-700"
      >
        {{ behindDeviceVersionsCounter?.behindTwo ?? 0 }}
      </span>
    </div>
    <span class="tw-mx-1 tw-hidden lg:tw-inline-block">|</span>
    <div class="tw-mb-2 lg:tw-mb-0 tw-flex tw-items-center">
      <span
        class="tw-whitespace-nowrap tw-text-sm tw-text-blue-500 hover:tw-underline"
        :class="{
          'tw-underline':
            props.versionsFilter ===
            BehindDeviceVersionsFilter.BEHIND_THREE_PLUS,
        }"
        @click="
          updateVersionsFilter(BehindDeviceVersionsFilter.BEHIND_THREE_PLUS)
        "
      >
        {{ $t('gs.devices.threeVersionsBehind') }}
      </span>
      <span
        class="tw-px-1 tw-mx-1 tw-inline-block tw-rounded-xl tw-text-xxs tw-text-white tw-bg-blue-700"
      >
        {{ behindDeviceVersionsCounter?.behindThreePlus ?? 0 }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { StoreState } from '@shared/models/interfaces/store'
import { hasFailed, isPending } from '@shared/utils/helpers/request-status'

import { GetDevicesInfoCountersRO } from '@gs/models/proto/ro/device'
import { BehindDeviceVersionsFilter } from '@gs/models/proto/base/device'

interface Props {
  versionsFilter: BehindDeviceVersionsFilter
  devicePageInfo: StoreState<GetDevicesInfoCountersRO>
}

const props = defineProps<Props>()

const behindDeviceVersionsCounter = computed(
  // [0] - should be fixed when this component will be restored
  () => props.devicePageInfo.data?.data?.[0].behindDeviceVersionsCounter?.data
)

const emit = defineEmits<{
  (e: 'update-versions-filter', val: BehindDeviceVersionsFilter): void
}>()

const updateVersionsFilter = (value: BehindDeviceVersionsFilter) => {
  emit('update-versions-filter', value)
}
</script>
