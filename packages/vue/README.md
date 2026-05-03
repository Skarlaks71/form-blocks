# Form Blocks

> 🚧 Versão Alpha — a API pode sofrer alterações

Form Blocks é um framework modular para construção de formulários dinâmicos e altamente customizáveis, utilizando uma arquitetura baseada em blocos.

Ele foi projetado para separar **lógica de formulário**, **interface (UI)** e **integração com frameworks**, facilitando a escalabilidade entre diferentes ambientes como Vue, React e Angular.

---

## ✨ Funcionalidades

- 🧩 Arquitetura de formulários baseada em blocos
- ⚙️ Core independente de framework (`@form-blocks/core`)
- 🎨 Sistema de estilos centralizado (`@form-blocks/styles`)
- 🔌 Adaptadores para frameworks (atualmente Vue)
- 🔁 Estruturas de formulários reutilizáveis e dinâmicas
- 📦 Pronto para uso em monorepos

---

## 📦 Pacotes

| Pacote | Descrição |
|--------|----------|
| `@form-blocks/core` | Lógica principal (independente de framework) |
| `@form-blocks/styles` | Estilos globais e design system |
| `@form-blocks/vue` | Componentes e integração com Vue 3 |

---

## 🚀 Instalação

```bash
npm install @form-blocks/vue
```

## 🎨 Import styles
```javascript
import '@form-blocks/vue/style.css'
```

## 🔌 Uso (Vue 3)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FormBlocks from '@form-blocks/vue'

import '@form-blocks/vue/style.css'

const app = createApp(App)

app.use(FormBlocks)

app.mount('#app')
```

## 🧱 Exemplo simples

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

![Imagem do resultado esperado (https://github.com/Skarlaks71/form-blocks/wiki/imagem-1)](https://private-user-images.githubusercontent.com/6969905/586837688-5b37824e-90a7-471e-b850-233c6dd802ac.jpeg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzc4MTM2NjEsIm5iZiI6MTc3NzgxMzM2MSwicGF0aCI6Ii82OTY5OTA1LzU4NjgzNzY4OC01YjM3ODI0ZS05MGE3LTQ3MWUtYjg1MC0yMzNjNmRkODAyYWMuanBlZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTAzVDEzMDI0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUyOWJhNjRhNDU4ZGZmZWIzNTYxNjBiMDczNTBkYTIyNzVlY2YxZDFiZjEyNDRkYjFhMzI1OWNmMWEzYThjMDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRmpwZWcifQ.JoI3f5EQzOMmUXuA5Hzfw3T5i0K2SXP6QV_cpWf9M38)

## 🧱 Exemplo Avançado

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
          }
        },
        {
          label: 'Politica de Privacidade',
          component: 'checkbox',
          iProps: {
            name: 'policy',
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

![Imagem do resultado esperado (https://github.com/Skarlaks71/form-blocks/wiki/imagem-2)](https://private-user-images.githubusercontent.com/6969905/586838128-5f7ec032-458a-4d81-a16c-44410d63dd6c.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzc4MTQwNDYsIm5iZiI6MTc3NzgxMzc0NiwicGF0aCI6Ii82OTY5OTA1LzU4NjgzODEyOC01ZjdlYzAzMi00NThhLTRkODEtYTE2Yy00NDQxMGQ2M2RkNmMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDUwMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA1MDNUMTMwOTA2WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NTdkMWUyMGUyODUyNWJhZTdmMmNmMDM5MDEzNzQ4NjRhZDdhZjk5ODg5YWJkNzdkOWYwZmE4YjhjMTBkYTZiYyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIn0.8UPDkONbqPHXpX8tGE7iLon8n9nrywhzbGHm1JbiPF8)

## Designed Shorthand Language

Calma pessoal não fujam para as colinas ainda! 🏃‍♂️⛰️<br>
Se vocês assim como eu acham esse objeto gigante e tem preguiça de escrever algo desse tamanho para um formulário **(mesmo os complexos)**. Seus problemas acabaram, apresento a vocês a nossa dsl ou escrita curta, vou mostrar como criar o mesmo objeto mas escrevendo bem menos.

```javascript
// useTestForm.js with dsl
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
        'Nome Completo',
        'E-mail::email'
        ['Gênero::radio:md4:name=gender:inline', genderOptions],
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
        ['Tipo::select:md4', typeOptions],
        'Valor::md8',
      ],
    },
    {
      noTitle: true,
      forms: [
        'Termos e Condições::checkbox:name=terms',
        'Politica de Privacidade::checkbox:name=policy',
      ],
    },
  ]

  return {
    groupBase,
  }
}
```

## 🧠 Arquitetura
O Form Blocks está dividido em três camadas principais:

**Core**(``@form-blocks/core``)
- Form logic
- Validation handling
- State management
- No UI / no framework

**Styles**(``@form-blocks/styles``)
- Design tokens
- Layout system
- Utility classes

**Plugin Module**(``@form-blocks/vue``)
- UI components
- Vue bindings
- Integration with external libraries

## 📁 Estrutura do Projeto
```bash
packages/
  core/
  styles/
  vue/
```

## ⚠️ Alpha Status
Este projeto está atualmente em alpha.

Coisas que podem mudar:

- API structure
- Component names
- Schema format
- Styling system

## 🛠 Roadmap
- **Modulo React**
- **Modulo Angular**
- **Adição da internacionalização (I18n)**
- **DSL para o groupBase**
- **Site com a documentação**

## 🤝 Contributing

Contribuições, ideias e feedbacks são bem vindas.