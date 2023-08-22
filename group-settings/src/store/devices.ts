import { defineStore } from 'pinia'
import { StoreState } from '@shared/models/interfaces/store'
import {
  getInitialState,
  updateState,
} from '@shared/utils/store/http-request-state'
import { defaultJSONOptions } from '@shared/models/proto/constants'
import { get, put, httpDelete } from '@shared/plugins/api'
import {
  GetDevicesDTO,
  UpdateDeviceDTO,
  RemoveDeviceDTO,
} from '@gs/models/proto/dto/device'
import {
  GetDevicesRO,
  GetDevicesInfoCountersRO,
  ItemDeviceRO,
} from '@gs/models/proto/ro/device'
import { IDevice } from '@gs/models/proto/base/device'
import cloneDeep from 'lodash/cloneDeep'

import { Pagination } from '@protots/response/pagination'

interface State {
  devices: StoreState<GetDevicesRO>
  devicePageInfo: StoreState<GetDevicesInfoCountersRO>
}

const state = (): State => ({
  devices: getInitialState({}),
  devicePageInfo: getInitialState({}),
})

export const useDevicesStore = defineStore({
  id: 'devices',
  state,
  actions: {
    async fetchDevices(params: GetDevicesDTO) {
      this.devices = updateState(this.devices)

      try {
        const { data: response } = await get('/devices', {
          namespace: 'gs',
          params: GetDevicesDTO.toJson(params, defaultJSONOptions),
        })

        this.devices = updateState(
          this.devices,
          GetDevicesRO.fromJson(response)
        )
      } catch (e) {
        this.devices = updateState(this.devices, e as Error)
        throw e
      }
    },
    async fetchDevicesInfoCounters() {
      this.devicePageInfo = updateState(this.devicePageInfo)

      try {
        const { data: response } = await get('/devices/info_counters', {
          namespace: 'gs',
        })
        this.devicePageInfo = updateState(
          this.devicePageInfo,
          GetDevicesInfoCountersRO.fromJson(response)
        )
      } catch (e) {
        this.devicePageInfo = updateState(this.devicePageInfo, e as Error)
        throw e
      }
    },
    async updateDevice(params: UpdateDeviceDTO) {
      try {
        const { data: response } = await put(
          '/devices/',
          UpdateDeviceDTO.toJson(params, defaultJSONOptions),
          {
            namespace: 'gs',
          }
        )
        this.updateDeviceState(ItemDeviceRO.fromJson(response))
      } catch (e) {
        this.devices = updateState(this.devices, this.devices.data)
        throw e
      }
    },
    updateDeviceState(result: ItemDeviceRO) {
      const { data: devicesList, meta } = this.devices.data ?? {}
      const device = result.data!

      this.devices = updateState(this.devices, {
        meta,
        data: (devicesList ?? []).map((current_device) =>
          current_device.id === device.id ? device : current_device
        ),
      })
    },
    async removeDevice(params: RemoveDeviceDTO) {
      try {
        await httpDelete('/devices', {
          namespace: 'gs',
          data: RemoveDeviceDTO.toJson(params, defaultJSONOptions),
        })

        const updatedDevicesData = cloneDeep(this.devices?.data?.data) ?? []
        const updatedDevices = {
          meta: this.devices?.data?.meta,
          data: updatedDevicesData.filter(
            (device: IDevice) => !params.deviceIds.includes(device.id)
          ),
        }
        this.devices = updateState(this.devices, updatedDevices)
      } catch (e) {
        this.devices = updateState(this.devices, this.devices.data)
        throw e
      }
    },
    async exportAsCsv() {
      try {
        await get('/devices/export_as_csv', {
          namespace: 'gs',
        })
      } catch (e) {
        this.devicePageInfo = updateState(this.devicePageInfo, e as Error)
        throw e
      }
    },

    updateMeta(meta: Pagination) {
      const { data: devices } = this.devices.data ?? {}
      this.devices = updateState(this.devices, {
        meta,
        data: devices ?? [],
      })
    },
  },
})
