<script setup>
import {
  BRow,
  BCol,
} from 'bootstrap-vue-next'
import FormInputsBlocks from './FormInputsBlocks.vue';
import FormBlocksRepeater from './FormBlocksRepeater.vue'

const props = defineProps({
  group: {
    type: Object,
    default: () => {},
  },
  groupKey: {
    type: [Number, null],
    default: 0,
  },
})
</script>

<template>
  <transition name="fade">
    <b-row v-if="group.dependent?.value ?? true" :class="groupKey > 0 ? 'mt-3' : ''">
      <b-col v-if="!group.noTitle ?? true" cols="12">
        <h3>{{ group.title }}</h3>
      </b-col>
      <template v-if="group.isRepeater">
        <slot name="form-repeater" v-bind="{ form: group.forms, groupModel: group.groupModel }">
          <form-blocks-repeater :forms="group.forms" :group-model="group.groupModel" :group-form-data="group.groupFormData" />
        </slot> 
      </template>
      <template v-else>
        
          <template
            v-for="(form, formKey) in group.forms"
            :key="form.label || formKey"
          >
            <slot :name="`input(${form.formKey || formKey})`" v-bind="{ form, index: formKey }">
              <form-inputs-blocks :input="form" :input-key="formKey">
                <template v-for="(_, slotName) in $slots" #[slotName]="scope">
                  <slot :name="slotName" v-bind="scope"></slot>
                </template>
              </form-inputs-blocks>
            </slot>
          </template>
      </template>
    </b-row>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>