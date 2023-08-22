<template>
  <div class="tw-text-sm tw-text-gray-b">
    {{ ' App Current Versions iOS' }} {{ props.ios }} • Android
    {{ props.android }} • Windows {{ props.windows }} • Mac
    {{ props.mac }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  ios: number
  android: number
  windows: number
  mac: number
}

const props = withDefaults(defineProps<Props>(), {
  ios: 0,
  android: 0,
  windows: 0,
  mac: 0,
})
</script>
