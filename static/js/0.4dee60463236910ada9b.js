webpackJsonp([0],{"+nDU":function(t,a){},"1twv":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("bOdI"),i=s.n(e),n=s("RjMa"),o=s("CS1P"),r=s("oXpM"),c={name:"Index",components:{Header:n.a,Slidebar:o.a,Footer:r.a},data:function(){return i()({url:this.GLOBAL.serviceUrl+"?t=2&de=2",tagUrl:this.GLOBAL.serviceUrl+"?t=3&de=2",tableData:[],total:0,cur_page:1,pageSize:0,pageList:[],tData:[],slide:1,curHeight:"height:272.767px",ltype:0,hData:[],more:0,keywords:this.$route.params.k,dataStatus:0,unload:1,more_load:0},"pageList",[])},created:function(){this.getData(),this.getKData(),this.gettData(),this.getcData(),this.getStarsData()},mounted:function(){},watch:{$route:function(t,a){this.cur_page=1,this.tableData=[],this.more=0,this.getData(),this.getKData(),this.gettData(),this.getcData(),this.getStarsData(),this.dataStatus=0,this.keywords="",this.unload=1,this.more_load=0}},computed:{data:function(){return this.tableData},curPageList:function(){return this.pageList},tagData:function(){return this.tData},hotData:function(){return this.hData},msg:function(){return"asdff"},activeClass:function(){return function(t){return{active:t==this.cur_page}}}},methods:{hideSearch:function(){this.$refs.theHeader.$emit("handleinput",1)},getType:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t==this.ltype)return!1;this.tableData=[],this.more=this.cur_page=1,this.ltype=t,this.getData()},loadMore:function(t){this.more_load=1,this.more=0,this.cur_page=t,void 0!==this.$route.params.k?this.getKData():void 0!==this.$route.params.c?this.getcData():void 0!==this.$route.params.t?this.gettData():void 0!==this.$route.params.stars?this.getStarsData():this.getData()},pslidefunc:function(t){this.slide=parseInt(t),this.curHeight=t?"height:272.767px;":"height:287.403px",console.log(this.curHeight)},refresh:function(){this.getData()},curTitle:function(t){var a;a=this.role_list.find(function(a){return a.id===t}),this.selected_title=a.title},handleCurrentChange:function(t){this.cur_page=t,this.getData()},getTagData:function(){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a),e=this;this.axios.post(this.tagUrl,this.qs.stringify({a:1}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)&&(e.tData=t.data.data)}).catch(function(t){console.log(t)})},getData:function(){if(void 0!==this.$route.params.tag&&""!=this.$route.params.tag){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a);this.tag=this.$route.params.tag;var e=this;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:this.tag,stype:2}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)?(e.tableData=t.data.data,e.pageList=t.data.endPage):e.dataStatus=1,e.unload=0,e.more_load=0}).catch(function(t){console.log(t)})}},getKData:function(){if(void 0!==this.$route.params.k&&""!=this.$route.params.k){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a);this.keywords=this.$route.params.k;var e=this;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:this.keywords,stype:3}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)?(e.tableData=t.data.data,e.pageList=t.data.endPage):e.dataStatus=1,e.unload=0,e.more_load=0}).catch(function(t){})}},getcData:function(){if(void 0!==this.$route.params.c&&""!=this.$route.params.c){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a),e=this,i=parseInt(this.$route.params.c);if(i<1)return alse;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:i,stype:4}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)?(e.tableData=t.data.data,e.pageList=t.data.endPage):e.dataStatus=1,e.unload=0,e.more_load=0}).catch(function(t){console.log(t)})}},getStarsData:function(){if(void 0!==this.$route.params.stars&&""!=this.$route.params.stars){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a),e=this,i=parseInt(this.$route.params.stars);if(i<1)return alse;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:i,stype:6}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)?(e.tableData=t.data.data,e.pageList=t.data.endPage):e.dataStatus=1,e.unload=0,e.more_load=0}).catch(function(t){console.log(t)})}},gettData:function(){if(void 0!==this.$route.params.t&&""!=this.$route.params.t){var t=this.commonfunc._getRandom(),a=parseInt(t),s=this.commonfunc._gtokene(a),e=parseInt(this.$route.params.t);if(e<1)return alse;var i=this;this.axios.post(this.url,this.qs.stringify({page:this.cur_page,word:e,stype:5}),{headers:{"Content-Type":"application/x-www-form-urlencoded",nonce:a,token:s}}).then(function(t){0==parseInt(t.data.message)?(i.tableData=t.data.data,i.pageList=t.data.endPage):i.dataStatus=1,i.unload=0,i.more_load=0}).catch(function(t){console.log(t)})}},search:function(){this.is_search=!0,this.cur_page=1,this.getData()},formatter:function(t,a){return t.address},filterTag:function(t,a){return a.tag===t},strLen:function(t){for(var a=0,s=0;s<t.length;s++){var e=t.charCodeAt(s);e>=1&&e<=126||65376<=e&&e<=65439?a++:a+=2}return a}}},u={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticStyle:{position:"relative"},attrs:{id:"page"}},[s("Header",{ref:"theHeader"}),t._v(" "),s("Slidebar",{ref:"sidebar",on:{child_event:t.pslidefunc}}),t._v(" "),s("div",{attrs:{id:"main"},on:{click:function(a){return t.hideSearch()}}},[t._m(0),t._v(" "),s("div",{attrs:{id:"content"}},[s("div",{staticClass:"pagination "},[s("ul",t._l(t.curPageList,function(a){return s("li",{on:{click:function(s){return t.loadMore(a.val)}}},[s("a",{class:t.activeClass(a.val),attrs:{href:"javascript:void(0);"}},[t._v(t._s(a.title))])])}),0)]),t._v(" "),s("div",{staticClass:"mozaique"},t._l(t.data,function(a){return s("div",{staticClass:"thumb-block  tbm-init-ok"},[s("div",{staticClass:"thumb-inside"},[t._m(1,!0),t._v(" "),s("div",{staticClass:"thumb"},[s("router-link",{attrs:{to:"/detail"+a.id}},[s("img",{attrs:{src:a.vimg,alt:a.title}})])],1),s("span",{staticClass:"video-hd-mark"},[t._v("1080p")]),t._m(2,!0)]),t._v(" "),s("div",{staticClass:"thumb-under"},[s("p",{staticClass:"title"},[s("router-link",{attrs:{to:"/detail"+a.id}},[t._v(t._s(a.title))])],1)])])}),0),t._v(" "),s("div",{staticClass:"pagination "},[s("ul",t._l(t.curPageList,function(a){return s("li",{on:{click:function(s){return t.loadMore(a.val)}}},[s("a",{class:t.activeClass(a.val),attrs:{href:"javascript:void(0);"}},[t._v(t._s(a.title))])])}),0)]),t._v(" "),t.more_load?s("div",{staticClass:"hide-if-premium"},[s("i",{staticClass:"fa fa-cog fa-spin fa-3x fa-fw"}),t._v(" "),s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):t._e(),t._v(" "),t.unload?s("div",{staticClass:"hide-if-premium"},[s("i",{staticClass:"fa fa-cog fa-spin fa-3x fa-fw"}),t._v(" "),s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):t._e(),t._v(" "),t.dataStatus?s("div",{staticClass:"hide-if-premium"},[s("div",{staticClass:"img-nofound"}),t._v(" "),s("p",{staticClass:"tips"},[t._v("抱歉，没有找到您想要的内容")])]):t._e()])]),t._v(" "),s("Footer")],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"xv-tabs ",attrs:{id:"home-tabs"}},[a("ul",{staticClass:"tab-buttons tab-6-buttons"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"microthumb"},[a("div",{staticClass:"microthumb-thumb",staticStyle:{"background-position":"0% 0%"}}),this._v(" "),a("div",{staticClass:"microthumb-border"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"action-menu"},[a("span",{staticClass:"open icon-f icf-ellipsis-v"}),a("span",{staticClass:"close icon-f icf-close-thin"})])}]};var h=s("VU/8")(c,u,!1,function(t){s("7z6S"),s("+nDU")},"data-v-083c65bb",null);a.default=h.exports},"7z6S":function(t,a){}});
//# sourceMappingURL=0.4dee60463236910ada9b.js.map