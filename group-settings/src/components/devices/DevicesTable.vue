<template>
  <el-skeleton animated :loading="isLoading">
    <el-table
      ref="multipleTableRef"
      :data="props.devices?.data?.data ?? []"
      class="table-style tw-w-full tw-mt-6"
      header-cell-class-name="tw-py-0 tw-text-xxs2 tw-tracking-xs tw-font-semibold tw-text-gray-b tw-bg-gray-6"
      cell-class-name="tw-py-1"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label=""
        type="selection"
        width="50"
        label-class-name="checkbox-badge"
      />
      <el-table-column
        :label="$t('gs.fields.devices.member')"
        prop="userName"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.memberType')"
        prop="memberType"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.device')"
        prop="kind"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.description')"
        prop="displayName"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.App')"
        prop="applicationType"
        sortable
        label-class-name="tw-text-blue-500"
      >
        <template #default="{ row }">
          {{ row.applicationType || 'Not assigned' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('gs.fields.devices.loggedApp')"
        prop="loggedApplicationType"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.os')"
        prop="osVersion"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.appVer')"
        prop="appVersion"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.lastWipe')"
        prop="lastWipeCompletedAt"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.status')"
        prop="workflowState"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column
        :label="$t('gs.fields.devices.lastLogin')"
        prop="lastLoginAt"
        sortable
        label-class-name="tw-text-blue-500"
      />
      <el-table-column width="60">
        <template #header>
          <el-popover
            placement="bottom-start"
            :width="206"
            trigger="click"
            :show-arrow="false"
            popper-class="w-border-black tw-border-opacity-20 tw-p-3 tw-px-0"
          >
            <template #reference>
              <el-button class="tw-px-2.5 tw-border-0 tw-bg-transparent">
                <clr-icon shape="cog" class="tw-text-black" size="14" />
              </el-button>
            </template>

            <DevicesTableActions :selected-devices="selectedDevices" />
          </el-popover>
        </template>
        <template #default="item">
          <el-popover
            placement="bottom-start"
            :width="206"
            trigger="click"
            :show-arrow="false"
            popper-class="w-border-black tw-border-opacity-20 tw-p-3 tw-px-0"
          >
            <template #reference>
              <el-button class="tw-px-2.5 tw-border-0 tw-bg-transparent">
                <clr-icon shape="cog" class="tw-text-black" size="14" />
              </el-button>
            </template>
            <DeviceActions :device="item.row" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ElTable } from 'element-plus'

import { isPending } from '@shared/utils/helpers/request-status'
import { StoreState } from '@shared/models/interfaces/store'
import { GetDevicesRO } from '@gs/models/proto/ro/device'
import { IDevice } from '@gs/models/proto/base/device'

import DeviceActions from '@gs/components/devices/DeviceActions.vue'
import DevicesTableActions from '@gs/components/devices/DevicesTableActions.vue'

const props = defineProps<{
  devices: StoreState<GetDevicesRO>
}>()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const selectedDevices = ref<IDevice[]>([])

const isLoading = computed(() => isPending(props.devices))

const handleSelectionChange = (val: IDevice[]) => {
  selectedDevices.value = val
}
</script>
