<template>
  <el-button
    text
    class="tw-px-3 tw-py-0 tw-my-1.5 tw-text-blue-500 hover:tw-text-blue-700 edit-btn"
    @click="isEditGroupDialogOpen = true"
  >
    <clr-icon
      shape="pencil"
      size="16"
      class="tw-text-blue-500 hover:tw-text-blue-700"
    />
  </el-button>

  <el-dialog
    v-model="isEditGroupDialogOpen"
    destroy-on-close
    append-to-body
    :width="600"
    custom-class="dialog-base"
    @close="isEditGroupDialogOpen = false"
  >
    <template #header>
      <div class="tw-text-2xxl tw-text-black tw-font-extralight">
        {{ $t('gs.editGroupDialog.title') }}
      </div>
    </template>

    <EditGroupDiloagContent @submit="handleEditCurrentGroup" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import { useGroupsStore } from '@gs/store/groups'
import { EditCurrentGroupDTO } from '@gs/models/proto/dto/groups'
import { Edit_Data as EditDataForm } from '@protots/apps/gs/request/group/edit'

import EditGroupDiloagContent from '@gs/components/EditGroupDiloagContent.vue'

const emits = defineEmits<{
  (e: 'edit-group', val: boolean): void
  (e: 'update-key'): void
}>()

const { t } = useI18n()
const groupsStore = useGroupsStore()

const isEditGroupDialogOpen = ref(false)

const handleEditCurrentGroup = async (params: EditDataForm) => {
  try {
    const payload: EditCurrentGroupDTO = {
      data: params,
    }

    await groupsStore.editCurrentGroup(payload)

    isEditGroupDialogOpen.value = false
    ElMessage.success(t('gs.editGroupDialog.success'))
    emits('update-key')
  } catch (e) {
    ElMessage.error(t('gs.editGroupDialog.error'))
  }
}
</script>
