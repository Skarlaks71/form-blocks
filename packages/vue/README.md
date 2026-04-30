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

useTestForm.js
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