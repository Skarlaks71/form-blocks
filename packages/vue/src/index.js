import { vMaska } from "maska/vue"
import FormBlocks from "./components/FormBlocks"
import FormGroupBlocks from "./components/blocks/FormGroupBlocks"
import FormInputsBlocks from "./components/blocks/FormInputsBlocks"
import FormBlocksRepeater from "./components/blocks/FormBlocksRepeater"
import FormBlocksRepeaterItem from "./components/blocks/FormBlocksRepeaterItem"
import FbCol from "./components/grid/FbCol"
import FbContainer from "./components/grid/FbContainer"
import FbRow from "./components/grid/FbRow"
import limitChars from "./Directives/limitChars"
import FbInput from "./components/forms/FbInput"
import FbTextarea from "./components/forms/FbTextarea"
import FbCheckbox from "./components/forms/FbCheckbox"
import FbRadio from "./components/forms/FbRadio"
import FbButton from "./components/FbButton"
import FbFile from "./components/forms/FbFile"
import { useCore } from '@form-blocks/core'
import { registry } from "./composables/componentRegistry"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { HiEye, HiEyeOff } from "oh-vue-icons/icons/hi"
import FbSelect from 'vue-select'
import FbFlatpickr from 'vue-flatpickr-component'

const { registerMultipleComponents } = useCore()
registerMultipleComponents(registry)

addIcons(HiEye, HiEyeOff)

const install = app => {
  app.component("v-icon", OhVueIcon)
  app.component('FbContainer', FbContainer)
  app.component('FbRow', FbRow)
  app.component('FbCol', FbCol)
  app.component('FbInput', FbInput)
  app.component('FbFile', FbFile)
  app.component('FormBlocks', FormBlocks);
  app.component('FbTextarea', FbTextarea);
  app.directive('maska', vMaska);
  app.directive('limit-chars', limitChars);
}

export {
  install,
  FormBlocks,
  FormInputsBlocks,
  FormGroupBlocks,
  FormBlocksRepeater,
  FormBlocksRepeaterItem,
  FbContainer,
  FbRow,
  FbCol,
  FbInput,
  FbFile,
  FbCheckbox,
  FbTextarea,
  FbButton,
  FbRadio,
  FbSelect,
  FbFlatpickr,
}

export default { install }