import { updateState } from '@shared/utils/store/http-request-state'

import { useGroupsStore } from '@gs/store/groups'
import { IGroupExt } from '@gs/models/proto/base/group'
import { GroupTabs_ManagePagesRules as ManagePagesRulesTabs } from '@protots/apps/gs/group_tabs'

export const useUpdateAvailablePages = () => {
  const groupsStore = useGroupsStore()

  const addAvailablePages = (name: ManagePagesRulesTabs) => {
    const availableManagePages =
      groupsStore.currentGroup!.data!.availableTabs!.availableManagePages ?? []

    availableManagePages.push(name)

    const data: IGroupExt = {
      ...groupsStore.currentGroup.data!,
      availableTabs: {
        ...groupsStore.currentGroup!.data!.availableTabs!,
        availableManagePages: availableManagePages!,
      },
    }

    groupsStore.currentGroup = updateState(groupsStore.currentGroup, data)
  }

  const removeAvailablePages = (name: ManagePagesRulesTabs) => {
    const availableManagePages =
      groupsStore.currentGroup!.data!.availableTabs!.availableManagePages ?? []

    const index = availableManagePages.findIndex((i) => i === name)

    availableManagePages.splice(index, 1)

    const data: IGroupExt = {
      ...groupsStore.currentGroup.data!,
      availableTabs: {
        ...groupsStore.currentGroup!.data!.availableTabs!,
        availableManagePages: availableManagePages!,
      },
    }

    groupsStore.currentGroup = updateState(groupsStore.currentGroup, data)
  }

  const updateCurrentGroup = () => {
    groupsStore.fetchCurrentGroup()
  }

  return {
    updateCurrentGroup,
    addAvailablePages,
    removeAvailablePages,
  }
}
