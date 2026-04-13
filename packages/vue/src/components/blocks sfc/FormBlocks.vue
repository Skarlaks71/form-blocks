<script setup>
import { vMaska } from 'maska/vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { provide, toRefs, ref, computed } from 'vue';
import FormGroupBlocks from './blocks/FormGroupBlocks.vue'

const props = defineProps({
  modelValue: {
    type: Object,
  },
  vehicleOptions: {
    type: Array,
    defaut: () => [],
  },
  errors: {
    type: [Object, null],
    default: null,
  },
  groups: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])

provide('errors', toRefs(props).errors)

const unmaskedValue = ref('')

defineExpose({ unmaskedValue })

const formData = computed({
  get: () => props.modelValue,
  set(val) {
    emits('update:modelValue', val)
  },
})

provide('formData', formData)
</script>

<template>
  <div class="form-blocks">
    <template v-for="(group, key) in groups" :key="key">
      <slot :name="`group(${group.key || key})`" v-bind="{ group, index: key }">
        <form-group-blocks :group="group" :group-key="key">
          <template v-for="(_, slotName) in $slots" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </form-group-blocks>
      </slot>
    </template>
  </div>
</template>

<style scoped>

/* eslint-disable */
html[data-bs-theme="dark"] .v-select::v-deep() {
  --vs-controls-color: rgb(210.6, 209.6, 215);
  --vs-border-color: rgb(66.3, 62.05, 85);

  --vs-dropdown-bg: rgb(66.3, 62.05, 85);
  --vs-dropdown-color: #b0c4d9;
  --vs-dropdown-option-color: rgb(210.6, 209.6, 215);

  --vs-selected-bg: rgb(66.3, 62.05, 85);
  --vs-selected-color: rgb(210.6, 209.6, 215);

  --vs-search-input-color: rgb(210.6, 209.6, 215);

  --vs-dropdown-option--active-bg: #b0c4d9;
  --vs-dropdown-option--active-color: #0b2b78;
}
</style>