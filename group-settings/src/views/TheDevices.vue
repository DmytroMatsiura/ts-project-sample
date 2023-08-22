<template>
  <div class="tw-flex-1 tw-p-6">
    <GroupHeader />
    <DevicesTab />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TheDevices',
}
</script>

<script setup lang="ts">
import GroupHeader from '@gs/components/GroupHeader.vue'
import DevicesTab from '@gs/components/devices/DevicesTab.vue'
</script>
