import FbRow from '../grid/FbRow'
import FbCol from '../grid/FbCol'
import FormInputsBlocks from './FormInputsBlocks'
import { h, Transition, resolveComponent } from 'vue'
import FormBlocksRepeater from './FormBlocksRepeater'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FormGroupBlocks',
  props: {
    group: { type: Object, default: () => ({}) },
    groupKey: { type: [Number, String], default: 0 }
  },
  setup(props, { slots }) {
    const gClass = `${PREFIX}-group`

    return () => {
      const { group, groupKey } = props
      console.log('groups', group)

      // Lógica de dependência do grupo (v-if)
      if (group.dependent?.value === false) return null

      // Preparação dos filhos (Children)
      const renderContent = () => {
        const children = []

        // 1. Título do Grupo
        if (!group.noTitle) {
          children.push(
            h(FbCol, { cols: 12 }, {
              default: () => h('h3', { class: `${gClass}__title` }, group.title)
            })
          )
        }

        // 2. Lógica de Repeater ou Inputs Normais
        if (group.isRepeater) {
          // Slot para customizar o repeater ou o componente padrão
          const repeaterSlot = slots['form-repeater']
          children.push(
            repeaterSlot 
              ? repeaterSlot({ form: group.forms, groupModel: group.groupModel })
              : h(FormBlocksRepeater, {
                  forms: group.forms,
                  groupModel: group.groupModel,
                  groupFormData: group.groupFormData,
                  ...group.repeaterProps,
                })
          )
        } else {
          // Renderização da lista de inputs
          const inputs = group.forms.map((form, formKey) => {
            const slotName = `input(${form.formKey || formKey})`
            
            // Se houver um slot específico para este input, usamos ele
            if (slots[slotName]) {
              return slots[slotName]({ form, index: formKey })
            }

            // Caso contrário, renderizamos o FormInputsBlocks e repassamos TODOS os slots
            // (Isso permite que slots de descrição lá de baixo cheguem até aqui)
            return h(FormInputsBlocks, {
              input: form,
              inputKey: formKey,
              key: form.label || formKey
            }, slots) // Repassa todos os slots recebidos para o filho
          })
          
          children.push(...inputs)
        }

        return children
      }

      // 3. Renderização Final: Transition > FbRow
      return h(Transition, { name: `${PREFIX}-fade` }, {
        default: () => h(FbRow, {
          // Lógica da classe de margem
          class: groupKey > 0 ? 'mt-12' : ''
        }, {
          default: () => renderContent()
        })
      })
    }
  }
}