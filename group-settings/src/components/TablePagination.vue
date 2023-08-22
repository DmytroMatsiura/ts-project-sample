<template>
  <div class="sm:tw-flex sm:tw-justify-end tw-mt-6">
    <div
      class="tw-flex tw-items-center tw-text-sm tw-text-gray-b tw-my-4 sm:tw-my-0"
    >
      {{ $t('pagination.fromTo', fromTo) }}
    </div>
    <div
      class="tw-flex tw-items-center tw-mr-6 tw-text-sm tw-text-gray-b tw-ml-6 tw-my-4 sm:tw-my-0"
    >
      {{ $t('pagination.show') }}
      <el-select
        v-model="selectedPerPage"
        class="tw-w-16 tw-px-2 input-decoration input-sm select-arrow"
      >
        <el-option
          v-for="item in perPageOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      {{ $t('pagination.perPage') }}
    </div>
    <div
      class="tw-flex tw-items-center sm:tw-ml-6 tw-text-sm tw-text-gray-b tw-my-4 sm:tw-my-0"
    >
      {{ $t('pagination.page') }}
      <el-select
        v-model="selectedPage"
        class="tw-w-16 tw-px-2 input-decoration input-sm select-arrow"
      >
        <el-option
          v-for="item in rangeArray"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <el-button
      text
      size="small"
      class="tw-px-3 tw-py-0 tw-text-xxs2 tw-uppercase tw-border-0 tw-text-blue-500 hover:tw-text-blue-700"
      :disabled="selectedPage === 1"
      @click="changePage(selectedPage - 1)"
    >
      {{ $t('buttons.previous') }}
    </el-button>
    <el-button
      text
      size="small"
      class="tw-px-3 tw-py-0 tw-text-xxs2 tw-uppercase tw-border-0 tw-text-blue-500 hover:tw-text-blue-700"
      :disabled="selectedPage === pagination.totalPages"
      @click="changePage(selectedPage + 1)"
    >
      {{ $t('buttons.next') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { INITIAL_PER_PAGE_VARIANTS } from '@shared/utils/constants/pagination'
import range from 'lodash/range'
import { IPaginationRO } from '@shared/models/proto/ro/pagination'

export default defineComponent({
  props: {
    pagination: {
      type: Object as PropType<IPaginationRO>,
      default: () => ({
        page: 0,
        perPage: 0,
        totalCount: 0,
        totalPages: 0,
      }),
    },
    perPageOptions: {
      type: Array as PropType<number[]>,
      default: () => INITIAL_PER_PAGE_VARIANTS,
    },
  },
  emits: ['update:pagination', 'load-data'],
  setup(props, { emit }) {
    const selectedPerPage = computed({
      get() {
        return props.pagination.perPage
      },
      set(val: number) {
        emit('update:pagination', {
          ...props.pagination,
          perPage: val,
        })
        emit('load-data')
      },
    })

    const selectedPage = computed({
      get() {
        return props.pagination.page
      },
      set(val: number) {
        changePage(val)
      },
    })

    const fromTo = computed(() => ({
      from: (props.pagination.page - 1) * props.pagination.perPage + 1,
      to:
        Math.min(
          (props.pagination.page - 1) * props.pagination.perPage +
            props.pagination.perPage,
          props.pagination.totalCount
        ) || 0,
      entries: props.pagination.totalCount,
    }))

    const changePage = (page: number) => {
      emit('update:pagination', {
        ...props.pagination,
        page: page,
      })
      emit('load-data')
    }

    const rangeArray = computed(() => range(1, props.pagination.totalPages + 1))

    return {
      selectedPerPage,
      selectedPage,
      fromTo,
      rangeArray,
      changePage,
    }
  },
})
</script>
