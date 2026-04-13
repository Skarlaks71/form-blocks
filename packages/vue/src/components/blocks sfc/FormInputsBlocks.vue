<script setup>
import { vMaska } from 'maska/vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {
  BRow,
  BCol,
  BFormInvalidFeedback,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue-next'
import { inject } from 'vue';
import limitChars from '../../Directives/limitChars';
import VSelect from 'vue-select'

const props = defineProps({
  input: {
    type: Object,
    default: () => {},
  },
  inputKey: {
    type: [Number, null],
    default: 0,
  },
})

const errors = inject('errors')
const formData = inject('formData')
const vLimitChars = limitChars
const mapComponent = {
  'b-form-input': BFormInput,
  'v-select': VSelect,
}
</script>

<template>
  <transition name="fade">
    <b-col
      v-if="input.dependent?.value ?? true"
      v-bind="{ ...input.colProps || null }"
    >
      <b-form-group
        :label="input.label"
        v-bind="{ ...input.formGroupProps || null }"
      >
        <template #description>
          <slot v-if="input.templateDescKey" :name="`description(${input.templateDescKey})`" />
        </template>
        <component
          :is="mapComponent[input.component]"
          v-model="formData[input.model]"
          :state="errors[input.back] ? false : null"
          v-maska="input.maska"
          v-limit-chars="input.limitChars"
          v-bind="{
            ...input.othersProps || {},
            ...(input.limitChars ? { 'v-limit-chars': input.limitChars } : {}),
            ...(input.maskaOptions ? input.maskaOptions : {})
          }"
          v-on="input.events 
            ? Object.fromEntries(
                Object.entries(input.events).map(([event, handler]) => [
                  event, 
                  (eventData) => handler(eventData, formData)
                ])
              ) 
            : {}"
        >
          <template #no-options>Descupe, sem opções no momento!</template>
        </component>
  
        <b-form-invalid-feedback id="input-live-feedback">
          {{ errors[input.back] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </b-col>
  </transition>
</template>

<style scoped>
</style>