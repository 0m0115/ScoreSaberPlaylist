<script setup>
import { reactive, defineEmits, defineProps, watch } from 'vue'

const props = defineProps({
  loading: Boolean
})

const sort = reactive({
  type: 'pp',
  order: 'DESC'
})

watch(() => props.loading, (newValue, oldValue) => {
  if (newValue) {
    sort.type = 'pp'
    sort.order = 'DESC'
  }
})

const sortTypeOptions = reactive([
  {
    value: 'pp',
    label: 'PP'
  },
  {
    value: 'timeSet',
    label: '日期'
  },

  {
    value: 'stars',
    label: '星级'
  },
  {
    value: 'acc',
    label: 'ACC'
  }
])

const sortOrderOptions = reactive([
  {
    value: 'DESC',
    label: '从大到小'
  },
  {
    value: 'ASC',
    label: '从小到大'
  }
])

const emits = defineEmits(['change'])

function handleChange () {
  emits('change', sort)
}

</script>

<template>
  <a-space>
    按
    <a-select
      ref="select"
      size="small"
      v-model:value="sort.type"
      style="width: 120px"
      :options="sortTypeOptions"
      @change="handleChange"
    />

    <a-select
      ref="select"
      size="small"
      v-model:value="sort.order"
      style="width: 120px"
      :options="sortOrderOptions"
      @change="handleChange"
    />排序
  </a-space>
</template>
