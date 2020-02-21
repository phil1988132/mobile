// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import global_ from './config/global'//引用文件
import qs from 'qs'
import commonfunc from './commonFunction/common.js'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import md5 from 'js-md5';
import storage from 'good-storage'
Vue.prototype.$md5 = md5
Vue.prototype.$video = Video

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
//Vue.prototype.$axios = axios;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.commonfunc = commonfunc;
Vue.prototype.cstorage = storage;
var _that = this
/*Vue.prototype.navToken = function (num){
	//return global_.token+'sdf'
 	return commonfunc._gtokene(num,global_.token)
}*/
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
