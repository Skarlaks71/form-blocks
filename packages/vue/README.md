# Form Blocks

> 🚧 Alpha version — APIs may change

Form Blocks is a modular framework for building dynamic and customizable forms using a block-based architecture.

It is designed to separate **form logic**, **UI**, and **framework integration**, making it easy to scale across different environments like Vue, React, and Angular.

---

## ✨ Features

- 🧩 Block-based form architecture
- ⚙️ Framework-agnostic core (`@form-blocks/core`)
- 🎨 Centralized styling system (`@form-blocks/styles`)
- 🔌 Framework adapters (currently Vue)
- 🔁 Reusable and dynamic form structures
- 📦 Monorepo-ready

---

## 📦 Packages

| Package | Description |
|--------|------------|
| `@form-blocks/core` | Core logic (framework agnostic) |
| `@form-blocks/styles` | Global styles and design system |
| `@form-blocks/vue` | Vue 3 components and integration |

---

## 🚀 Installation

```bash
npm install @form-blocks/vue
```

## 🎨 Import styles
```javascript
import '@form-blocks/vue/style.css'
```

## 🔌 Usage (Vue 3)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FormBlocks from '@form-blocks/vue'

import '@form-blocks/vue/style.css'

const app = createApp(App)

app.use(FormBlocks)

app.mount('#app')
```

## 🧱 Basic Example

```vue
// HelloWorld.vue
<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import useTestForm from '../composables/useTestForm'

const props = defineProps({
  // as variaveis do model que geram inputs no front
  backVars: {
    type: Array,
    default: () => [
      'full_name',
      'email',
      'password',
    ],
  },
})

const formData = ref({})
const errors = ref({})

const { groupBase } = useTestForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(props.backVars, groupBase, [3])
</script>

<template>
  <div>
    <form>
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="errors"
      />
    </form>
  </div>
</template>
```

#### useTestForm.js
```javascript
export default () => {
  const groupBase = [
    {
      title: 'Meu Formulário',
      forms: [
        { label: 'Nome Completo' },  
        { label: 'E-mail' },  
        { 
          label: 'Senha',
          iProps: {
            type: 'password'
          }
        },  
      ]
    },
  ]

  return {
    groupBase,
  }
}
```

![Imagem do resultado esperado](https://gitlab.com/-/project/81216579/uploads/74f8a83784dadf1bb3c56f69c310a372/WhatsApp_Image_2026-04-30_at_11.14.53.jpeg)

## 🧱 Advanced Example

```vue
// HelloWorld.vue
<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import useTestForm from '../composables/useTestForm'

const props = defineProps({
  // as variaveis do model que geram inputs no front
  backVars: {
    type: Array,
    default: () => [
      'full_name',
      'email',
      'gender',
      'accepted_terms',
      'privacy_policy',
      ['Contacts', Array,
        'type',
        'value',
      ]
    ],
  },
})

const formData = ref({})
const errors = ref({})

const { groupBase } = useTestForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(props.backVars, groupBase, [3, [5, 6], [3, 5]])
</script>

<template>
  <div>
    <form>
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="errors"
      />
    </form>
  </div>
</template>
```

#### useTestForm.js
```javascript
export default () => {
  const genderOptions = [
    { label: 'Masculino', value: 'm' },
    { label: 'Feminino', value: 'f' },
    { label: 'Outro', value: 'o' },
  ]

  const typeOptions = [
    { label: 'Telefone', value: 'phone' },
    { label: 'E-mail', value: 'email' },
    { label: 'Fax', value: 'fax' },
  ]

  const groupBase = [
    {
      title: 'Meu Formulário',
      forms: [
        { label: 'Nome Completo' },
        {
          label: 'E-mail',
          iProps: {
            type: 'email',
          },
        },
        {
          label: 'Gênero',
          component: 'radio',
          colProps: { md: 4 },
          iProps: {
            name: 'gender',
            options: genderOptions,
            inline: true,
            reduce: val => val.value,
          },
        }
      ]
    },
    {
      title: 'Contatos',
      isRepeater: true,
      groupModel: 'contacts',
      groupFormData: { type: null, value: '' },
      repeaterProps: {
        btnAddVariant: 'outline-success',
      },
      forms: [
        {
          label: 'Tipo',
          component: 'select',
          colProps: { md: 4 },
          iProps: {
            options: typeOptions,
            reduce: val => val.value,
          }
        },
        {
          label: 'Valor',
          colProps: { md: 8 },
        },
      ],
    },
    {
      noTitle: true,
      forms: [
        {
          label: 'Termos e Condições',
          component: 'checkbox',
          iProps: {
            name: 'terms',
            options: [{ value: true }],
            reduce: val => val.value,
          }
        },
        {
          label: 'Politica de Privacidade',
          component: 'checkbox',
          iProps: {
            name: 'policy',
            options: [{ value: true }],
            reduce: val => val.value,
          }
        }
      ],
    },
  ]

  return {
    groupBase,
  }
}
```

![Imagem do resultado esperado](https://gitlab.com/-/project/81216579/uploads/67a99158d9c430ab50a7c8294b0df7bc/image.png)