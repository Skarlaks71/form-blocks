import FbInput from '../components/forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import FbTextarea from '../components/forms/FbTextarea'
import FbRadio from '../components/forms/FbRadio'
import FbCheckbox from '../components/forms/FbCheckbox'

// Mapa inicial padrão
export const registry = {
  'input': {
    component: FbInput,
    supportsLabelFor: true,
  },
  'select': {
    component: VSelect,
    supportsLabelFor: false,
  },
  'flatpickr': {
    component: flatPickr,
    supportsLabelFor: false,
  },
  'textarea': {
    component: FbTextarea,
    supportsLabelFor: true,
  },
  'radio': {
    component: FbRadio,
    supportsLabelFor: false,
  },
  'checkbox': {
    component: FbCheckbox,
    supportsLabelFor: false,
  },
}

