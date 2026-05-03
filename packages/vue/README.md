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

![Imagem do resultado esperado](https://gitlab.com/-/project/81216579/uploads/74f8a83784dadf1bb3c56f69c310a372/WhatsApp_Image_2026-04-30_at_11.14.53.jpeg)

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

![Imagem do resultado esperado](https://gitlab.com/-/project/81216579/uploads/223ff1028c355088f08577a5d2e9a764/image.png)

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