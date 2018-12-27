// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button,MessageBox,Message,Row,Col,Collapse,CollapseItem,Popover} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './mock/mockServer' //加载mockServer

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
