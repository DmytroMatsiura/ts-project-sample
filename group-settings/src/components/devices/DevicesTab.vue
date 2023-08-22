<template>
  <div class="tw-mt-6 lg:tw-flex lg:tw-justify-between lg:tw-items-center">
    <div class="tw-text-black tw-text-2xxl tw-font-extralight">
      {{ $t('gs.devices.title') }}
    </div>    
    <BehindDeviceVersionsFilterView
      v-if="false"
      :versions-filter="versionsFilter"
      :device-page-info="devicePageInfo"
      @update-versions-filter="updateVersionsFilter"
    />
  </div>
  <el-row :gutter="24" class="tw-my-4 md:tw-my-6">
    <el-col :sm="12">
      <div class="tw-flex-col">
        <template v-for="device in Versions" :key="device?.applicationType">
          <DeviceVersions :device-info="device" />
        </template>
      </div>
    </el-col>
    <el-col :sm="12" class="md:tw-text-right">
      <el-button
        text
        class="tw-py-0 tw-px-3 tw-uppercase tw-my-1.5 tw-text-xs tw-text-blue-500 tw-border-blue-500 tw-bg-transparent hover:tw-text-blue-700 hover:tw-bg-blue-40"
        @click="exportAsCSV"
      >
        {{ $t('buttons.exportCSV') }}
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="24" class="tw-my-4 md:tw-my-6">
    <el-col :sm="12">
      <div class="tw-py-1 tw-mb-4 md:tw-mb-0">
        <SearchField v-model="search" @load-data="updateTableList()" />
      </div>
    </el-col>
    <el-col :sm="12" class="tw-flex tw-items-center md:tw-justify-end">
      <span class="tw-text-sm tw-text-gray-b">
        {{ $t('gs.filterBy') }}
      </span>
      <el-select
        v-model="filterBy"
        class="tw-w-32 tw-px-2 input-decoration input-sm select-arrow"
      >
        <el-option
          v-for="item in filterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
  </el-row>
  <DevicesTable :devices="devices" />
  <TablePagination
    v-model:pagination="meta"
    :per-page-options="perPagesOptions"
    @update:pagination="deviceStore.updateMeta"
    @load-data="updateTableList"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'

import { SelectItem } from '@shared/models/interfaces/element-plus'
import { enumToValuesArray } from '@shared/utils/helpers/enum-to-array'
import {
  INITIAL_PAGES,
  INITIAL_PAGINATION,
  INITIAL_PER_PAGE_VARIANTS,
} from '@shared/utils/constants/pagination'

import { useDevicesStore } from '@gs/store/devices'
import {
  BehindDeviceVersionsFilter,
  DeviceKind,
} from '@gs/models/proto/base/device'
import { GetDevicesDTO } from '@gs/models/proto/dto/device'

import SearchField from '@gs/components/SearchField.vue'
import TablePagination from '@gs/components/TablePagination.vue'
import BehindDeviceVersionsFilterView from '@gs/components/devices/BehindDeviceVersionsFilterView.vue'
import DevicesTable from '@gs/components/devices/DevicesTable.vue'

const { t } = useI18n()
const deviceStore = useDevicesStore()

const filterOptions = ref<SelectItem[]>([])
const search = ref('')
const filterBy = ref<DeviceKind>(DeviceKind.ALL)
const versionsFilter = ref<BehindDeviceVersionsFilter>(
  BehindDeviceVersionsFilter.ALL_DEVICES
)
const perPagesOptions = ref(INITIAL_PER_PAGE_VARIANTS)

const deviceKindArray = enumToValuesArray(DeviceKind)
deviceKindArray.forEach((status, index) => {
  filterOptions.value.push({
    value: index,
    label: startCase(toLower(status)),
  })
})

const meta = computed(
  () => deviceStore.devices?.data?.meta ?? INITIAL_PAGINATION
)
const devices = computed(() => deviceStore.devices)
const devicePageInfo = computed(() => deviceStore.devicePageInfo)
const Versions = computed(
  () => deviceStore.devicePageInfo?.data?.data ?? []
)

const updateVersionsFilter = (value: BehindDeviceVersionsFilter) => {
  versionsFilter.value = value
}

const exportAsCSV = () => {
  deviceStore.exportAsCsv()
}

const updateTableList = () => {
  try {
    const params: GetDevicesDTO = {
      page: meta.value?.page ?? INITIAL_PAGES[0],
      perPage: meta.value?.perPage ?? INITIAL_PER_PAGE_VARIANTS[2],
      search: search.value,
      filterBy: filterBy.value,
      versionsFilter: versionsFilter.value,
    }
    deviceStore.fetchDevices(params)
  } catch (e) {
    ElMessage({
      type: 'error',
      message: t('gs.devices.loadError'),
    })
  }
}

updateTableList()
deviceStore.fetchDevicesInfoCounters()

watch([filterBy], () => updateTableList())
watch([versionsFilter], () => updateTableList())
</script>
