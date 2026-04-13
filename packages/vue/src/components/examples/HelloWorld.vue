<script setup>
import { ref } from 'vue'
import viteLogo from '../../assets/vite.svg'
import heroImg from '../../assets/hero.png'
import vueLogo from '../../assets/vue.svg'
import useOrganForms from '../../composables/forms/useOrganForms'
import useTestForm from '../../composables/useTestForm'
import { useFormHandle } from '../../composables/useFormHandle'

const props = defineProps({
  // as variaveis do model que geram inputs no front
  backVars: {
    type: Array,
    default: () => [
      'name',
      'administrative_unit_type_code',
    ],
  },
})
const count = ref(0)
const organBackVars = ref([
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
    ])

const formData = ref({});
const formOrganData = ref({});
const formErrors = ref({})
const { groupBase } = useTestForm()
const { groups: makeOrganGroups } = useOrganForms();
const { groups: makeGroups } = useFormHandle();
const groups = makeGroups(props.backVars, groupBase, [2])
const groupsO = makeOrganGroups(organBackVars.value, {})
console.log('groups: ', groups)

const handleSubmit = () => {
  console.log('formData: ', formData.value)
}
const handleSubmit2 = () => {
  console.log('formData: ', formOrganData.value)
}
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
      <button type="submit">enviar</button>
    </form>
    <fb-row>
      <fb-col>
        <p>
          {{ formData }}
        </p>
      </fb-col>
      <fb-col>
        <fb-input label="teste"></fb-input>
      </fb-col>
    </fb-row>
    <!-- <form @submit.prevent="handleSubmit2" class="fb-form">
      <form-blocks
        v-model="formOrganData"
        :groups="groupsO"
        :errors="formErrors"
      >
      </form-blocks>
      <button type="submit">enviar</button>
    </form>
    <fb-row>
      <fb-col>
        <p>
          {{ formOrganData }}
        </p>
      </fb-col>
    </fb-row> -->
  </fb-container>
</template>

<style scoped>
* {
  text-align: left !important;
}
</style>
