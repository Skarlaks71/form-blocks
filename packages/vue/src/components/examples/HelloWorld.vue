<script setup>
import { ref } from 'vue'
import viteLogo from '../../assets/vite.svg'
import heroImg from '../../assets/hero.png'
import vueLogo from '../../assets/vue.svg'
import useOrganForms from '../../composables/forms/useOrganForms'

const props = defineProps({
  // as variaveis do model que geram inputs no front
  backVars: {
    type: Array,
    default: () => [
      'organ_code',
      'name',
      'cnpj',
      'legislation',
      'dispatch_date',
      'administrative_unit_type_code',
      'allocation',
      ['address', Object,
      'zipcode',
      'street',
      'number',
      'complement',
      'district',
      'state',
      'city'],
      ['contacts', Array,
      'type',
      'value'],
    ],
  },
})
const count = ref(0)

const formData = ref({});
const formErrors = ref({})
const { groups: makeGroups } = useOrganForms();
const groups = makeGroups(props.backVars, {})
</script>

<template>
  <fb-container>
    <form @submit.prevent="handleSubmit" class="fb-form">
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="formErrors"
      >

      </form-blocks>
    </form>
  </fb-container>
</template>
