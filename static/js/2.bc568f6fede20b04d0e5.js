webpackJsonp([2],{"80Ti":function(t,a){},TxfZ:function(t,a){},vcnP:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("RjMa"),s=e("CS1P"),n=e("oXpM"),r={name:"Index",components:{Header:i.a,Slidebar:s.a,Footer:n.a},data:function(){return{url:this.GLOBAL.serviceUrl+"?t=2",tagUrl:this.GLOBAL.serviceUrl+"?t=3",tableData:[],total:0,cur_page:1,pageSize:0,pageList:[],tData:[],slide:1,curHeight:"height:272.767px",ltype:0,hData:[],more:1,keywords:this.$route.params.k,dataStatus:0,user_history:[]}},created:function(){this.getHistoryData()},mounted:function(){},watch:{$route:function(t,a){this.getHistoryData()}},computed:{data:function(){return this.tableData},curPageList:function(){return this.pageList},tagData:function(){return this.tData},hotData:function(){return this.hData},msg:function(){return"asdff"}},methods:{hideSearch:function(){this.$refs.theHeader.$emit("handleinput",1)},getHistoryData:function(){var t=this.cstorage.get("history");if(void 0!=t){this.dataStatus=0;var a=t.length;console.log(a);for(var e=0;e<a;e++)this.user_history.push(JSON.parse(t[e]));this.dataStatus=0}else this.dataStatus=1},getType:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t==this.ltype)return!1;this.tableData=[],this.more=this.cur_page=1,this.ltype=t,this.getData()},loadMore:function(){this.cur_page+=1,void 0!==this.$route.params.k?this.getKData():this.getData()},pslidefunc:function(t){this.slide=parseInt(t),this.curHeight=t?"height:272.767px;":"height:287.403px",console.log(this.curHeight)},refresh:function(){this.getData()},curTitle:function(t){var a;a=this.role_list.find(function(a){return a.id===t}),this.selected_title=a.title},handleCurrentChange:function(t){this.cur_page=t,this.getData()},getTagData:function(){var t=this.commonfunc._getRandom(),a=parseInt(t),e=this.commonfunc._gtokene(a),i=this;this.axios.post(this.tagUrl,this.qs.stringify({a:1}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:e}}).then(function(t){0==parseInt(t.data.message)&&(i.tData=t.data.data)}).catch(function(t){console.log(t)})},getData:function(){if(void 0!==this.$route.params.tag&&""!=this.$route.params.tag){var t=this.commonfunc._getRandom(),a=parseInt(t),e=this.commonfunc._gtokene(a);this.tag=this.$route.params.tag;var i=this;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:this.tag,stype:2}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:e}}).then(function(t){0==parseInt(t.data.message)?(i.tableData=i.tableData.concat(t.data.data),(i.cur_page==t.data.endPage||i.cur_page>t.data.endPage)&&(i.more=0),i.dataStatus=0,t.data.endPage<1&&(i.dataStatus=1)):i.dataStatus=1}).catch(function(t){console.log(t)})}},getKData:function(){if(void 0!==this.$route.params.k&&""!=this.$route.params.k){var t=this.commonfunc._getRandom(),a=parseInt(t),e=this.commonfunc._gtokene(a);this.keywords=this.$route.params.k;var i=this;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:this.keywords,stype:3}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:e}}).then(function(t){0==parseInt(t.data.message)?(i.tableData=i.tableData.concat(t.data.data),(i.cur_page==t.data.endPage||i.cur_page>t.data.endPage)&&(i.more=0),i.dataStatus=0,t.data.endPage<1&&(i.dataStatus=1)):i.dataStatus=1}).catch(function(t){console.log(t)})}},search:function(){this.is_search=!0,this.cur_page=1,this.getData()},formatter:function(t,a){return t.address},filterTag:function(t,a){return a.tag===t},strLen:function(t){for(var a=0,e=0;e<t.length;e++){var i=t.charCodeAt(e);i>=1&&i<=126||65376<=i&&i<=65439?a++:a+=2}return a}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{position:"relative"},attrs:{id:"page"}},[e("Header",{ref:"theHeader"}),t._v(" "),e("Slidebar",{ref:"sidebar",on:{child_event:t.pslidefunc}}),t._v(" "),e("div",{attrs:{id:"main"},on:{click:function(a){return t.hideSearch()}}},[t._m(0),t._v(" "),e("div",{attrs:{id:"content"}},[e("div",{staticClass:"mozaique"},t._l(t.user_history,function(a){return e("div",{staticClass:"thumb-block  tbm-init-ok"},[e("div",{staticClass:"thumb-inside"},[t._m(1,!0),t._v(" "),e("div",{staticClass:"thumb"},[e("router-link",{attrs:{to:"/detail"+a.id}},[e("img",{attrs:{src:a.vimg,alt:a.title}})])],1),e("span",{staticClass:"video-hd-mark"},[t._v("1080p")]),t._m(2,!0)]),t._v(" "),e("div",{staticClass:"thumb-under"},[e("p",{staticClass:"title"},[e("router-link",{attrs:{to:"/detail"+a.id}},[t._v(t._s(a.title))])],1)])])}),0)])]),t._v(" "),e("Footer")],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"xv-tabs ",attrs:{id:"home-tabs"}},[a("ul",{staticClass:"tab-buttons tab-6-buttons"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"microthumb"},[a("div",{staticClass:"microthumb-thumb",staticStyle:{"background-position":"0% 0%"}}),this._v(" "),a("div",{staticClass:"microthumb-border"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"action-menu"},[a("span",{staticClass:"open icon-f icf-ellipsis-v"}),a("span",{staticClass:"close icon-f icf-close-thin"})])}]};var c=e("VU/8")(r,o,!1,function(t){e("80Ti"),e("TxfZ")},"data-v-7989861a",null);a.default=c.exports}});
//# sourceMappingURL=2.bc568f6fede20b04d0e5.js.map