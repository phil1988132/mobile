// store.js
import Vue from 'Vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    test01: {
      name: 'Wise Wrong'
    },
    test02: {
      tell: '12312345678'
    }
  },
  actions: {
    // 封装一个 ajax 方法
    saveForm (context) {
      axios.post('/',{aa:'1'}).then(function(res){
        console.log(res)
      })
      .catch(function(err){
        console.log(err)
      })
    }
  }
})

export default store