import { vMaska } from "maska/vue"
import FormBlocks from "./components/FormBlocks"
import FbCol from "./components/grid/FbCol"
import FbContainer from "./components/grid/FbContainer"
import FbRow from "./components/grid/FbRow"
import limitChars from "./Directives/limitChars"

export default {
  install: app => {
    app.component('FbContainer', FbContainer)
    app.component('FbRow', FbRow)
    app.component('FbCol', FbCol)
    app.component('FormBlocks', FormBlocks);
    app.directive('maska', vMaska);
    app.directive('limit-chars', limitChars);
  }
}

export { }