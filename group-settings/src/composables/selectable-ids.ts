import { ref, Ref } from 'vue'

export const useSelectableIds = (modelArray: Ref<{ id: number }[]>) => {
  const selectedIds = ref<number[]>([])

  const selectId = (index: number) => {
    const { id: modelId } = modelArray.value[index]

    if (selectedIds.value.includes(modelId)) {
      return (selectedIds.value = selectedIds.value.filter(
        (id) => id !== modelId
      ))
    }
    selectedIds.value.push(modelId)
  }

  const selectAllIds = () => {
    if (selectedIds.value.length === modelArray.value.length) {
      selectedIds.value = []
      return
    }
    selectedIds.value = selectedIds.value
      .concat(modelArray.value.map(({ id }) => id))
      .filter((v, i, a) => a.indexOf(v) === i)
  }

  return {
    selectedIds,
    selectId,
    selectAllIds,
  }
}
