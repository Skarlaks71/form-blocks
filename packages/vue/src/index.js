import FbCol from "./components/grid/FbCol"
import FbContainer from "./components/grid/FbContainer"
import FbRow from "./components/grid/FbRow"

export default {
  install: app => {
    app.component('FbContainer', FbContainer)
    app.component('FbRow', FbRow)
    app.component('FbCol', FbCol)
    // app.component('Form-Block');
    // app.component('Form-Block');
  }
}

export { }