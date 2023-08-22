<template>
  <AppWrapper>
    <AppToolbar
      :notifications="notifications"
      @fetch-notifications="handleFetchNotifications"
      @clear-notification="(p) => notificationsStore.setNotificationAsReaded(p)"
    />

    <el-main class="tw-flex tw-p-0 tw-flex-auto">
      <el-menu
        :collapse-transition="false"
        :collapse="isMenuCollapsed"
        :class="[
          'tw-bg-gray-e tw-border-0 tw-flex tw-flex-col',
          { 'tw-w-60': !isMenuCollapsed },
        ]"
      >
        <el-menu-item
          index="0"
          class="tw-flex tw-items-center tw-justify-end tw-text-gray-b tw-pl-6 tw-pr-3 tw-mb-3 tw-h-9 tw-border-b tw-border-gray-b tw-border-opacity-20 hover:tw-bg-transparent"
          @click="isMenuCollapsed = !isMenuCollapsed"
        >
          <clr-icon
            :shape="
              isMenuCollapsed ? 'angle-double right' : 'angle-double left'
            "
            class="tw-text-black"
          />
        </el-menu-item>

        <div class="tw-h-full tw-pb-4 tw-overflow-y-auto">
          <div
            v-for="itemGroup in availableMenuItems"
            :key="itemGroup.title"
            class="nav-split"
          >
            <div
              v-show="!isMenuCollapsed"
              class="tw-text-xs tw-font-semibold tw-text-gray-b tw-pl-6 tw-pr-3 tw-py-2.5"
            >
              {{ itemGroup.title }}
            </div>

            <template v-for="(item, i) in itemGroup.items">
              <!-- eslint-disable-next-line -->
              <router-link
                v-if="showItem(item)"
                v-slot="{ navigate }"
                custom
                :to="{ name: item.routeName }"
              >
                <!--TODO: check if isActive-->
                <el-menu-item
                  :index="`${i + 1}`"
                  :class="[
                    'tw-flex tw-items-center tw-pl-6 tw-pr-3 tw-h-9 tw-text-gray-b hover:tw-bg-gray-d hover:tw-bg-opacity-30 focus:tw-bg-transparent',
                    {
                      'focus:tw-bg-white tw-bg-white': isActive(item.routeName),
                    },
                  ]"
                  @click="() => navigate()"
                >
                  <!--TODO: check for item.style-->
                  <clr-icon
                    :shape="item.icon"
                    size="16"
                    :class="[
                      'tw-w-4 tw-h-4 tw-mr-1.5 ' + item.style,
                      isActive(item.routeName)
                        ? 'tw-text-blue-500'
                        : 'tw-text-gray-b',
                    ]"
                  />

                  <template #title>
                    {{ item.label }}
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </div>
      </el-menu>

      <section class="tw-flex-1 tw-overflow-auto">
        <router-view />
      </section>
    </el-main>
  </AppWrapper>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import '@clr/icons'
import '@clr/icons/shapes/all-shapes'

import { useNotificationsStore } from '@gs/store/notifications'
import { useNotificationSocketStore } from '@shared/store/notifications-socket'
import { useGroupsStore } from '@gs/store/groups'
import routeNames from '@gs/router/route-names'

import { GetNotificationsDTO } from '@shared/models/proto/dto/notifications'
import { INotification } from '@shared/models/proto/base/notifications'
import EventBus, { GlobalEvents } from '@shared/event-bus'
import {
  getCurrentUser,
  getStoredSession,
  apiEssentials,
} from '@shared/plugins/api'
import AppWrapper from '@shared/components/AppWrapper.vue'
import AppToolbar from '@shared/components/AppToolbar.vue'
import { useGeneralStore } from '@shared/store/general'
import { INITIAL_PER_PAGE_VARIANTS } from '@shared/utils/constants/pagination'
import { AuthActions } from '@shared/models/enums/session'
import {
  GroupTabs_ManagePagesRules as ManagePagesRulesTabs,
  GroupTabs_ManageFeaturesRules as ManageFeaturesRulesTabs,
} from '@protots/apps/gs/group_tabs'

type MenuGroup = {
  title: string
  items: MenuItem[]
}

type MenuItem = {
  label: string
  routeName: string
  icon: string
  style?: string
}

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const groupsStore = useGroupsStore()
const generalStore = useGeneralStore()
const notificationsStore = useNotificationsStore()
const notificationsSocketStore = useNotificationSocketStore()

const fetchNotificationsParams = reactive<GetNotificationsDTO>({
  page: 1,
  perPage: INITIAL_PER_PAGE_VARIANTS[3],
})
const isMenuCollapsed = ref(false)
const menuItems = ref({
  manageGroupItems: {
    title: t('gs.menuTabs.manageGroup.title'),
    items: [
      {
        label: t('gs.menuTabs.manageGroup.users'),
        routeName: routeNames.users,
        icon: 'users',
        tabName: ManagePagesRulesTabs.USERS,
      },
      {
        label: t('gs.menuTabs.manageGroup.roles'),
        routeName: routeNames.roles,
        icon: 'assign-user',
        tabName: ManagePagesRulesTabs.ROLES,
      },
      {
        label: t('gs.menuTabs.manageGroup.subgroups'),
        routeName: routeNames.subgroups,
        icon: 'organization',
        tabName: ManagePagesRulesTabs.SUBGROUPS,
      },
      {
        label: t('gs.menuTabs.manageGroup.externalGroups'),
        routeName: routeNames.externalGroups,
        icon: 'organization',
        style: 'is-solid',
        tabName: ManagePagesRulesTabs.EXTERNAL_GROUPS,
      },
      {
        label: t('gs.menuTabs.manageGroup.quickMessages'),
        routeName: routeNames.quickMessages,
        icon: 'inbox',
        tabName: ManagePagesRulesTabs.QUICK_MESSAGES,
      },
      {
        label: t('gs.menuTabs.manageGroup.devices'),
        routeName: routeNames.devices,
        icon: 'devices',
        tabName: ManagePagesRulesTabs.DEVICES,
      },
      {
        label: t('gs.menuTabs.manageGroup.securitySettings'),
        icon: 'shield-check',
        routeName: routeNames.securitySettings,
        tabName: ManagePagesRulesTabs.SECURITY_SETTINGS,
      },
      {
        label: t('gs.menuTabs.manageGroup.personalInvitations'),
        icon: 'envelope',
        routeName: routeNames.personalInvitations,
        tabName: ManagePagesRulesTabs.PERSONAL_INVITATIONS,
      },
      {
        label: t('gs.menuTabs.manageGroup.admins'),
        icon: 'users',
        style: 'is-solid',
        routeName: routeNames.admins,
        tabName: ManagePagesRulesTabs.ADMINS,
      },
      {
        label: t('gs.menuTabs.manageGroup.groupSettings'),
        icon: 'users',
        style: 'is-solid',
        routeName: routeNames.groupSettings,
        tabName: ManagePagesRulesTabs.GROUP_SETTINGS,
      },
      {
        label: t('gs.menuTabs.manageGroup.oncallCallRouting'),
        icon: 'users',
        style: 'is-solid',
        routeName: routeNames.routes,
        tabName: ManagePagesRulesTabs.ONCALL_CALL_ROUTING,
      },
    ],
  },
  manageFeaturesItems: {
    title: t('gs.menuTabs.manageFeatures.title'),
    items: [
      {
        label: t('gs.menuTabs.manageFeatures.STOR'),
        icon: 'cluster',
        routeName: routeNames.Stor,
        tabName: ManageFeaturesRulesTabs.STOR,
      },
      {
        label: t('gs.menuTabs.manageFeatures.DIRECT'),
        icon: 'network-globe',
        routeName: routeNames.Direct,
        tabName: ManageFeaturesRulesTabs.DIRECT,
      },
      {
        label: t('gs.menuTabs.manageFeatures.cloudAPI'),
        icon: 'cloud-traffic',
        routeName: routeNames.cloudAPI,
        tabName: ManageFeaturesRulesTabs.CLOUD_API,
      },
      {
        label: t('gs.menuTabs.manageFeatures.integrations'),
        icon: 'calendar',
        routeName: routeNames.thirdPartyIntegrations,
        tabName: ManageFeaturesRulesTabs.THIRD_PARTY_INTEGRATIONS,
      },
      {
        label: t('gs.menuTabs.manageFeatures.emrIntegrations'),
        icon: 'link',
        routeName: routeNames.emrIntegrations,
        tabName: ManageFeaturesRulesTabs.EMR,
      },
      {
        label: t('gs.menuTabs.manageFeatures.AssistedCalls'),
        icon: 'users',
        routeName: routeNames.AssistedCalls,
        tabName: ManageFeaturesRulesTabs.ASSISTED_CALLS,
      },
    ],
  },
})

const availableMenuItems = computed<MenuGroup[]>(() => {
  const availableMenuItems = []

  const manageGroupItems: MenuGroup = {
    title: menuItems.value?.manageGroupItems.title,
    items: menuItems.value?.manageGroupItems.items?.filter((item) =>
      groupsStore.currentGroup.data?.availableTabs?.availableManagePages.includes(
        item.tabName
      )
    ),
  }

  const manageFeaturesItems: MenuGroup = {
    title: menuItems.value?.manageFeaturesItems.title,
    items: menuItems.value?.manageFeaturesItems.items?.filter((item) =>
      groupsStore.currentGroup.data?.availableTabs?.availableFeaturePages.includes(
        item.tabName
      )
    ),
  }
  availableMenuItems.push(manageGroupItems, manageFeaturesItems)

  return availableMenuItems
})

const notifications = computed(() => notificationsStore.notifications)

const isActive = (routeName: string) => {
  return route.matched.some((item) => item.name === routeName)
}
const handleFetchNotifications = () => {
  fetchNotificationsParams.page += 1
}
const showItem = (item: MenuItem) => {
  if (item.routeName === routeNames.emrIntegrations) {
    const { currentGroup } = getStoredSession() ?? {}
    return (
      currentGroup?.isEmrIntegrationSubscribed &&
      currentGroup.groupSettingEmrConnectionsEnabled.length > 0
    )
  }

  return true
}

const createNotificationChannel = () => {
  if (notificationsSocketStore.socket === null) {
    return
  }

  const channelName = `NotificationChannel:${getCurrentUser()?.chatUserId}`
  const subscription = notificationsSocketStore.socket.channel(channelName)

  subscription.on('notification', (json) => {
    notificationsStore.addNewNotification(INotification.fromJson(json))
  })
}

watch([() => fetchNotificationsParams.page], () =>
  notificationsStore.fetchNotifications(fetchNotificationsParams)
)

notificationsStore.fetchNotifications(fetchNotificationsParams)

if (apiEssentials().wsParams) {
  notificationsSocketStore.createConnection()
  notificationsSocketStore.socket?.onOpen(createNotificationChannel)

  watch(
    () => generalStore.currentUser,
    (newUser, prevUser) => {
      if (newUser?.id !== prevUser?.id) {
        groupsStore.fetchCurrentGroup()
      }
    },
    { deep: true }
  )

  if (generalStore.currentUser?.id) {
    groupsStore.fetchCurrentGroup()
  }
}

onMounted(() => {
  EventBus.on(GlobalEvents.UnAuthenticated, () => {
    if (route.name === routeNames.authCheck) {
      return
    }

    router.replace({
      name: routeNames.authCheck,
      query: { action: AuthActions.Renew },
    })
  })
})
</script>

<style lang="scss" scoped>
::v-deep(.el-menu--collapse) {
  @apply tw-w-12;

  .el-menu-item {
    @apply tw-pl-3 #{!important};

    div {
      @apply tw-p-0 tw-flex tw-items-center tw-justify-center #{!important};
    }
  }
}

::v-deep(.el-menu:not(.el-menu--collapse)) {
  .nav-split:not(:last-child) {
    @apply tw-mb-3 tw-pb-3 tw-border-b tw-border-gray-b tw-border-opacity-20;
  }
}
</style>

<style lang="scss">
.el-alert__description {
  @apply tw-text-base #{!important};
}
</style>
