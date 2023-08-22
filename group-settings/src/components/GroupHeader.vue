<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import { getStoredSession, getPeerProps } from '@shared/plugins/api'
import { SetCurrentGroupDTO } from '@shared/models/proto/dto/header'
import { getAddressReadableString } from '@shared/utils/helpers/string-formatter'

import { useAppsHeaderStore } from '@shared/store/apps-header'
import { useGroupsStore } from '@gs/store/groups'

import EditGroupDialog from '@gs/components/EditGroupDialog.vue'

defineEmits<{
  (e: 'update-key'): void
}>()

const { t } = useI18n()
const groupsStore = useGroupsStore()
const appsHeaderStore = useAppsHeaderStore()

const currentGroup = computed(() => groupsStore.currentGroup.data)
const parentGroup = computed(
  () => getStoredSession()?.currentGroup?.parentGroup
)
const Id = getStoredSession()?.currentGroup?.Id ?? 0

const handleSetCurrentGroup = async () => {
  try {
    const payload: SetCurrentGroupDTO = {
      groupId: parentGroup.value!.id ?? 0,
    }

    await appsHeaderStore.setCurrentGroup(payload)

    const host = getPeerProps()?.apiHost ?? ''
    const link = `${host}/group_admin/users`
    window.location.href = link
  } catch (e) {
    ElMessage.error(t('gs.subgroups.someError'))
  }
}
</script>

<template>
  <div class="md:tw-flex md:tw-justify-between">
    <div class="tw-mb-4 md:tw-mb-0">
      <div class="">
        <template v-if="parentGroup">
          <div class="tw-flex tw-items-end">
            <a
              href="#"
              class="tw-text-blue-500 hover:tw-underline tw-text-2xxl tw-font-extralight tw-mr-1"
              @click="handleSetCurrentGroup"
            >
              {{ parentGroup.name }}
            </a>
            /
            <span class="tw-text-gray-b tw-text-sm tw-font-extralight tw-ml-1">
              {{ currentGroup?.name }}
            </span>
          </div>
        </template>

        <template v-else>
          <div class="tw-text-black tw-text-2xxl tw-font-extralight">
            {{ currentGroup?.name }}
          </div>
        </template>
      </div>
      <div class="tw-flex tw-items-center">
        <div class="tw-text-sm tw-text-gray-b tw-mr-1"> ID:</div>
        <div
          class="tw-px-3 tw-py-0.5 tw-text-xxs2 tw-text-gray-b tw-rounded-full tw-border tw-border-orange-500"
        >
          {{ Id }}
        </div>
      </div>
    </div>
    <el-button-group
      class="tw-flex tw-flex-col md:tw-inline-block tw-mb-4 md:tw-mb-0"
    >
      <el-button
        text
        size="small"
        class="tw-px-3 tw-py-0 tw-uppercase tw-text-xxs2 tw-text-blue-500 tw-border-blue-500 tw-bg-transparent hover:tw-text-blue-700 hover:tw-bg-blue-40"
      >
        {{ $t('buttons.userGuide') }}
      </el-button>
      <el-button
        text
        size="small"
        class="tw-px-3 tw-py-0 tw-uppercase tw-text-xxs2 tw-text-blue-500 tw-border-blue-500 tw-bg-transparent hover:tw-text-blue-700 hover:tw-bg-blue-40"
      >
        {{ $t('buttons.adminGuide') }}
      </el-button>
      <el-button
        text
        size="small"
        class="tw-px-3 tw-py-0 tw-uppercase tw-text-xxs2 tw-text-blue-500 tw-border-blue-500 tw-bg-transparent hover:tw-text-blue-700 hover:tw-bg-blue-40"
      >
        {{ $t('buttons.troubleShooting') }}
      </el-button>
    </el-button-group>
  </div>
  <div class="tw-flex tw-items-center tw-text-sm tw-text-gray-b">
    {{ getAddressReadableString(currentGroup?.organization?.address) }} •
    {{ currentGroup?.organization?.phone }}

    <EditGroupDialog @update-key="$emit('update-key')" />
  </div>
</template>
