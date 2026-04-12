<script setup>
import { ref } from 'vue'
import viteLogo from '../../assets/vite.svg'
import heroImg from '../../assets/hero.png'
import vueLogo from '../../assets/vue.svg'
import FormBlocks from '../FormBlocks.vue'
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
    <fb-row>
      <fb-col md="7">text</fb-col>
      <fb-col md="10">text2</fb-col>
      <fb-col md="2">text3</fb-col>
    </fb-row>
  </fb-container>

  <div class="ticks"></div>

  <section id="next-steps">
    <div id="docs">
      <form @submit.prevent="handleSubmit">
        <form-blocks
          v-model="formData"
          :groups="groups"
          :errors="formErrors"
        >

        </form-blocks>
      </form>
    </div>
    
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>
