<script setup>
import { computed, inject, onMounted, ref, toRaw } from 'vue'
import FormBlocksRepeaterItem from './FormBlocksRepeaterItem.vue'
import {
  BRow,
  BCol,
  BButton,
} from 'bootstrap-vue-next'

const props =  defineProps({
  forms: {
    type: Array,
    default: () => [],
  },
  groupModel: {
    type: String,
    default: 'groups',
  },
  groupFormData: {
    type: Object,
    default: () => [],
  },
})

const formData = inject('formData')

const formDataRepeater = ref([])

formData.value[props.groupModel] = formData.value[props.groupModel] ?? formDataRepeater.value

const cloneObject = obj => JSON.parse(JSON.stringify(toRaw(obj)))

const addItem = () => {
  // Criamos um novo objeto baseado na estrutura original
  formData.value[props.groupModel].push(cloneObject(props.groupFormData))
}

const removeItem = index => {
  if (formData.value[props.groupModel][index].type) {
    formData.value[props.groupModel][index].deleted = true
  } else {
    formData.value[props.groupModel].splice(index, 1)
  }
}

const hasRepeater = computed(() => (formData.value?.[props.groupModel] !== undefined) && ([props.groupModel] in formData.value))

const getGroupModel = () => {
  return formData.value?.[props.groupModel] || []
}

onMounted(() => {
  if (formData.value[props.groupModel].length === 0) {
    formData.value[props.groupModel].push(cloneObject(props.groupFormData))
  }
})
</script>

<template>
  <div v-if="hasRepeater">
    <transition-group name="fade" tag="div">
      <b-row
        v-for="(item, key) in getGroupModel()"
        :key="key"
        :class="[{ 'mt-3':key > 0 }, { 'disabled-row-repeater':item.deleted }]"
      >
        <form-blocks-repeater-item :forms="forms" :form-data="item" />
        <b-col md="12" lg="2">
          <b-button variant="danger" @click="removeItem(key)">remover</b-button>
        </b-col>
      </b-row>
    </transition-group>
    <div class="mt-3">
      <b-button @click="addItem">Adicionar</b-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.disabled-row-repeater {
  padding: 1rem;
  position: relative;
  background: #f1f1f1;
  border: 3px dashed transparent;
  border-image: repeating-linear-gradient(
    to right,
    #C0C0C0 0px,
    #C0C0C0 15px, /* Tamanho do traço */
    transparent 10px,
    transparent 30px /* Espaço entre os traços */
  ) 20;
  opacity: .3;
  pointer-events: none;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: -.25rem;
    left: -.25rem;
    opacity: .3;
    z-index: 9999;
  }
}
</style>