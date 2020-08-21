// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'

import axios from 'axios'



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import { Search, Collapse, CollapseItem, Button, NavBar, Icon, Row, Col, Dialog, Popup, Cell, PullRefresh, List, Toast, DatetimePicker, Calendar } from 'vant';

Vue.use(Search).use(Collapse).use(CollapseItem).use(Button).use(NavBar).use(Icon).use(Row).use(Col).use(Dialog).use(Popup).use(Cell).use(PullRefresh).use(List).use(Toast).use(DatetimePicker).use(Calendar);

import './assets/icon/iconfont.css'


// Vue.prototype.url = 'http://59.36.178.138:8000';

// Vue.prototype.url = 'http://192.168.0.128:8084';
// Vue.prototype.url = 'http://192.168.0.128:8084';
// Vue.prototype.url = 'http://192.168.0.102:8084';
// Vue.prototype.url = 'http://yun.witsoftware.cn/weixin';
// Vue.prototype.url = 'https://gy.szcasic.com/weixin';
Vue.prototype.url = 'http://172.18.0.125/weixinapi';






// 192.168.0.102 8084

// Vue.prototype.url = 'http://localhost:8084';





Vue.config.productionTip = false
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
