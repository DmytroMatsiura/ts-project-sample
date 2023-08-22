<template>
  <div class="search-group tw-flex">
    <el-input
      v-model="currentSearch"
      :clearable="true"
      :placeholder="$t('buttons.search')"
      @keyup.enter="$emit('load-data')"
    />

    <el-button type="primary" class="tw-ml-2.5" @click="$emit('load-data')">
      {{ $t('buttons.search') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:model-value', 'load-data'],
  setup(props, { emit }) {
    const currentSearch = computed({
      get() {
        return props.modelValue
      },
      set(val: string) {
        emit('update:model-value', val)
      },
    })

    return {
      currentSearch,
    }
  },
})
</script>
