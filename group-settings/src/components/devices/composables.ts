import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'

import { useDevicesStore } from '@gs/store/devices'
import {
  UpdateDeviceDataDTO,
  RemoveDeviceDTO,
} from '@gs/models/proto/dto/device'
import { IDevice } from '@gs/models/proto/base/device'
import { WorkflowState } from '@gs/models/enums'
import { ISetting } from '@gs/models/interfaces'

interface Props {
  device?: IDevice
  selectedDevices?: IDevice[]
}

export const useDevicesLogic = (props: Props) => {
  const { t } = useI18n()
  const devicesStore = useDevicesStore()

  const deviceAttributes = reactive<UpdateDeviceDataDTO>({
    appSupported: props.device?.appSupported ?? false,
    batterySave: props.device?.batterySave ?? false,
    lock: false,
    unlock: false,
    wipeData: false,
  })

  const defaultParams = {
    id: props.device?.id ?? 0,
    data: deviceAttributes,
  }

  const deviceSettingsList = computed<ISetting[]>(() => [
    {
      label: props.device?.appSupported
        ? t('gs.settings.deviceActions.markUnsupportedOption.titleOff')
        : t('gs.settings.deviceActions.markUnsupportedOption.titleOn'),
      id: 1,
      condition: () => true,
      handler: async () => {
        const params = cloneDeep(defaultParams)
        params.data.appSupported = !params.data.appSupported
        try {
          await devicesStore.updateDevice(params)
          ElMessage.success(
            t('gs.settings.deviceActions.markUnsupportedOption.successMessage')
          )
        } catch (e) {
          ElMessage.error(
            t('gs.settings.deviceActions.markUnsupportedOption.errorMessage')
          )
        }
      },
      warning: props.device?.appSupported
        ? t('gs.settings.deviceActions.markUnsupportedOption.warningOff')
        : t('gs.settings.deviceActions.markUnsupportedOption.warningOn'),
    },
    {
      label: ![WorkflowState.Locking, WorkflowState.Locked].includes(
        props.device?.workflowState as WorkflowState
      )
        ? t('gs.settings.deviceActions.lockAppOption.titleLock')
        : t('gs.settings.deviceActions.lockAppOption.titleUnlock'),
      id: 3,
      condition: () => true,
      handler: async () => {
        const params = cloneDeep(defaultParams)
        if (
          [WorkflowState.Locking, WorkflowState.Locked].includes(
            props.device?.workflowState as WorkflowState
          )
        ) {
          // If state is locking we have to unlock
          params.data.unlock = true
          params.data.lock = false
        } else {
          // If state is not locking we have to lock
          params.data.lock = true
          params.data.unlock = false
        }
        try {
          await devicesStore.updateDevice(params)
          ElMessage.success(
            t('gs.settings.deviceActions.lockAppOption.successMessage')
          )
        } catch (e) {
          ElMessage.error(
            t('gs.settings.deviceActions.lockAppOption.errorMessage')
          )
        }
      },
      warning:
        props.device?.workflowState !== WorkflowState.Locking
          ? t('gs.settings.deviceActions.lockAppOption.warningLock')
          : t('gs.settings.deviceActions.lockAppOption.warningUnlock'),
    },
    {
      label: t('gs.settings.deviceActions.wipeDataOption.title'),
      id: 4,
      condition: () => props.device?.workflowState !== WorkflowState.Locking,
      handler: async () => {
        const params = cloneDeep(defaultParams)
        params.data.wipeData = true
        try {
          await devicesStore.updateDevice(params)
          ElMessage.success(
            t('gs.settings.deviceActions.wipeDataOption.successMessage')
          )
        } catch (e) {
          ElMessage.error(
            t('gs.settings.deviceActions.wipeDataOption.errorMessage')
          )
        }
      },
      warning: t('gs.settings.deviceActions.wipeDataOption.warning'),
    },
    {
      label: t('gs.settings.deviceActions.removeOption.title'),
      id: 5,
      condition: () => true,
      handler: () => handleRemoveDevices({ deviceIds: [props.device!.id] }),
      warning: t('gs.settings.deviceActions.removeOption.warning', {
        name: props.device!.userName,
        device: props.device!.kind,
      }),
    },
  ])

  const devicesTableSettingsList = computed<ISetting[]>(() => [
    {
      label: t('gs.settings.devicesTableActions.removeOption.title'),
      id: 5,
      condition: () => true,
      handler: () =>
        handleRemoveDevices({
          deviceIds: props.selectedDevices!.map((d) => d.id),
        }),
      warning: t('gs.settings.devicesTableActions.removeOption.warning'),
    },
  ])

  const handleRemoveDevices = async (payload: RemoveDeviceDTO) => {
    try {
      await devicesStore.removeDevice(payload)
      ElMessage.success(
        t('gs.settings.deviceActions.removeOption.successMessage')
      )
    } catch (e) {
      ElMessage.error(
        t('gs.settings.devicesTableActions.removeOption.errorMessage')
      )
    }
  }

  return {
    deviceSettingsList,
    devicesTableSettingsList,
  }
}
