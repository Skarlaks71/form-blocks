import { 
  h, 
  inject, 
  ref, 
  onMounted, 
  toRaw, 
  computed, 
  TransitionGroup 
} from 'vue'

import FbRow from '../grid/FbRow'
import FbCol from '../grid/FbCol'
import FormBlocksRepeaterItem from './FormBlocksRepeaterItem'
import { useCloneDeep } from '@form-blocks/core'
import { PREFIX } from '@form-blocks/core/constants'
import FbButton from '../FbButton'

export default {
  name: 'FormBlocksRepeater',
  props: {
    forms: { type: Array, default: () => [] },
    groupModel: { type: String, default: 'groups' },
    groupFormData: { type: Object, default: () => ({}) },
    btnAddVariant: { type: String, default: 'primary' },
    btnAddTexture: { type: String, default: 'carbon' },
    btnAddClean: { type: Boolean, default: false },
    btnRemoveVariant: { type: String, default: 'danger' },
    btnRemoveTexture: { type: String, default: 'carbon' },
    btnRemoveClean: { type: Boolean, default: false },
    noTexture: { type: Boolean, default: false },
  },
  setup(props) {
    const formData = inject('formData')
    const {
      btnAddVariant,
      btnAddTexture,
      btnAddClean,
      btnRemoveVariant,
      btnRemoveTexture,
      btnRemoveClean,
      noTexture,
    } = props

    console.log('btn variant: ', btnAddVariant)

    // Lógica de clonagem para novos itens
    const cloneObject = obj => useCloneDeep(toRaw(obj))

    // Inicialização do modelo no formData global
    if (formData.value) {
      formData.value[props.groupModel] = formData.value[props.groupModel] ?? []
    }

    const addItem = () => {
      formData.value[props.groupModel].push(cloneObject(props.groupFormData))
    }

    const removeItem = index => {
      const target = formData.value[props.groupModel][index]
      if (target.type) {
        target.deleted = true
      } else {
        formData.value[props.groupModel].splice(index, 1)
      }
    }

    const getGroupData = computed(() => formData.value?.[props.groupModel] || [])
    const hasRepeater = computed(() => formData.value !== undefined && props.groupModel in formData.value)

    onMounted(() => {
      if (getGroupData.value.length === 0) {
        addItem()
      }
    })

    return () => {
      if (!hasRepeater.value) return null

      // 1. Renderização da Lista de Itens
      const renderItems = () => getGroupData.value.map((item, key) => {
        return h(FbRow, {
          key: key, // Em um framework real, o ideal seria um ID único, mas mantemos a chave por agora
          class: [
            { 'mt-3': key > 0 },
            { [`${PREFIX}-disabled-row-repeater`]: item.deleted }
          ]
        }, {
          default: () => [
            // O Item do repetidor com os inputs
            h(FormBlocksRepeaterItem, {
              forms: props.forms,
              formData: item
            }),
            // Coluna com o botão de remover
            h(FbCol, { md: 12, lg: 2 }, {
              default: () => h(FbButton, {
                variant: btnRemoveVariant,
                texture: btnRemoveTexture,
                clean: noTexture ? noTexture : btnRemoveClean,
                onClick: () => removeItem(key)
              }, { default: () => 'Remover' })
            })
          ]
        })
      })

      // 2. Renderização Final
      return h('div', { class: `${PREFIX}-repeater ${PREFIX}-container` }, [
        h(TransitionGroup, { name: `${PREFIX}-fade`, tag: 'div' }, {
          default: () => renderItems()
        }),
        // Botão de Adicionar
        h(FbRow, { class: 'mt-3' }, [
          h(FbCol, { md: 12, lg: 2 }, [
            h(FbButton, {
              variant: btnAddVariant, // Adicionando uma cor padrão
              texture: btnAddTexture,
              clean: noTexture ? noTexture : btnAddClean,
              onClick: addItem 
            }, { default: () => 'Adicionar' })
          ]),
        ])
      ])
    }
  }
}