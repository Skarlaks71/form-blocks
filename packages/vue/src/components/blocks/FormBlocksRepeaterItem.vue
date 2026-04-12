<script setup>
import { vMaska } from 'maska/vue'
import { inject } from 'vue';
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
} from 'bootstrap-vue-next'
import limitChars from '../../Directives/limitChars';
import VSelect from 'vue-select'

const props = defineProps({
  forms: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => {},
  },
})

const errors = inject('errors')
const vLimitChars = limitChars
const mapComponent = {
  'b-form-input': BFormInput,
  'v-select': VSelect,
}
</script>

<template>
  <b-col md="12" lg="10">
    <b-row>
      <template
        v-for="(input, formKey) in forms"
        :key="formKey"
      >
        <slot :name="`input(${input.formKey || formKey})`" v-bind="{ input, index: formKey }">
          <b-col
            v-bind="{ ...input.colProps || null }"
          >
            <b-form-group
              :label="input.label"
              v-bind="{ ...input.formGroupProps || null }"
            >
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
              >
                <template #no-options>Descupe, sem opções no momento!</template>
              </component>

              <b-form-invalid-feedback id="input-live-feedback">
                {{ errors[input.back] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </slot>
      </template>
    </b-row>
  </b-col>
</template>

<style scoped>

</style>
