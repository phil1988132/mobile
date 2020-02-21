<template>
        <div>
        <div id="nav" class="forced-opened"  v-bind:class="{'opened':isOpen}">
            <nav aria-label="primary">
                <div class="main-categories ordered-label-list">
                    <ul>
                        <li class="mobile-show"><a class="btn btn-default label main" id="main-cat-sub-list-btn"  @click="changeMenu(1)">热点</a></li>
                        <li class="mobile-show"><a class="btn btn-default label main" id="main-cat-sub-list-btn"  @click="changeMenu(2)">热门女优</a></li>
                        <li class="mobile-show"><a class="btn btn-default label main" id="main-cat-sub-list-btn"  @click="changeMenu(3)">热门标签</a></li>
                        <li class="mobile-show"><a class="btn btn-default label main" id="main-cat-sub-list-btn"   @click="changeMenu(4)">标签</a></li>
                        <li class="mobile-show" id="version-country-switch-li"><a id="version-country-switch-a" class="mobile-country-switch btn btn-default init-ok" data-country="cn" style="margin:auto;">菜单 <span class="flag-small flag-cn"></span></a></li>
                        <li>
                        <router-link :to="'/history'" class="btn btn-default label red-label history-label" >
                        观看历史
                        </router-link>  
                        </li>
                    </ul>
                </div>
                <div class="home-trends ordered-label-list">
                    <ul>
                        <li class="sub-list" v-bind:class="{'opened':menu == 1}">
                            <ul>
                                <li  v-for="site in trData" >                               
                                <router-link :to="'/listt/'+site._id"  class="btn btn-default" >
                                {{site.title}}
                                </router-link>   
                                </li>
                            </ul>
                        </li>
                        <li class="sub-list" v-bind:class="{'opened':menu == 2}">
                            <ul>
                                <li  v-for="site in starData" >                               
                                <router-link :to="'/liststar/'+site._id"  class="btn btn-default" >
                                {{site.cname}}
                                </router-link>   
                                </li>
                            </ul>
                        </li>
                        <li class="sub-list" v-bind:class="{'opened':menu == 3}">
                            <ul>
                                <li  v-for="site in catData" >                               
                                <router-link :to="'/listc/'+site._id"  class="btn btn-default" >
                                {{site.title}}
                                </router-link>   
                                </li>
                            </ul>
                        </li>
                        <li class="sub-list"  v-bind:class="{'opened':menu == 4}">
                            <ul>
                                <li  v-for="site in tagData" >                               
                                <router-link :to="'/lista'+site.name"  class="btn btn-default" >
                                {{site.name}}
                                </router-link>   
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="mobile-login-menu" class="hidden"><a href="https://www.xvideos.com/#" class="btn btn-default menu-login-acct" data-mode="signup">Join for FREE</a><a href="https://www.xvideos.com/#" class="btn btn-default menu-login-acct" data-mode="signin">登入</a><a href="https://www.xvideos.com/my-subs/videos" class="btn btn-default my-subs-nav-link">我的訂閱</a><a href="https://www.xvideos.com/videos-i-like" class="btn btn-default">我喜愛的視頻</a></div>
        <a href="https://www.xvideos.com/#" id="x-x-messages-btn" class="x-x-messages-btn-0">
            <span class="ic">
                <span class="icon-f icf-info-circle" title="來自Xvideos.com的消息"></span>
                <span class="icon-f icf-close" title="关闭"></span>
            </span>
            <span class="badge">0</span>
        </a>
        </div>
</template>
<script>
    export default {
        name: 'Slidebar',
        data() {
            return {
                url: this.GLOBAL.serviceUrl+'?t=2',
                tagUrl: this.GLOBAL.serviceUrl+'?t=3',
                cateUrl: this.GLOBAL.serviceUrl+'?t=8',
                trendsUrl: this.GLOBAL.serviceUrl+'?t=9',
                starUrl:this.GLOBAL.serviceUrl+'?t=10',
                tableData: [],
                total:0,
                cur_page: 1,
                pageSize:0,
                pageList:[],
                tData:[],
                trendsData:[],
                cateData:[],
                starsData:[],
                showTag:1,
                loadTag:1,
                tag:this.$route.params.tag,
                trends:this.$route.params.t,
                cate:this.$route.params.c,
                stars:this.$route.params.stars,
                menu:0,
                isOpen:0
            }
        },
        created() {
            this.getTagData();
            this.getTrendsData();
            this.getCateData();
            this.getStarsData();
        },
        mounted(){
            //this.getData();
        },
        watch: {
          '$route' (to,from) {
            this.tag = this.$route.params.tag
            this.trends = this.$route.params.t
            this.cate = this.$route.params.c
            this.stars = this.$route.params.stars
            this.loadTag = 1
            this.menu = 0
            //this.getData();
            //this.getTagData();
          }
        },  
        computed: {
            data() {
                return this.tableData             
            },
            curPageList() {
                return this.pageList             
            },
            tagData() {
                return this.tData
            },
            trData() {
                return this.trendsData
            },
            catData() {
                return this.cateData
            },
            starData() {
                return this.starsData
            },
            "msg"(){
                return "asdff"
            } 
        },
        methods: {
            changeMenu(id){
                this.menu = parseInt(id)
            },
            handleChangeLoggle(type=0){
                this.showTag = type
                this.$emit('child_event',type)
            },
            refresh(){
                this.getData();
            },
            curTitle(val){
                let obj = {};

            　　obj = this.role_list.find((item)=>{

            　　　　return item.id === val;

            　　});
                this.selected_title=obj.title
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getTagData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.tagUrl,this.qs.stringify({a: 1}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.tData = res.data.data;   
                    }
                    that.loadTag = 0       
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            getTrendsData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.trendsUrl,this.qs.stringify({a: 1}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.trendsData = res.data.data;   
                    }
                    that.loadTag = 0       
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            getCateData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.cateUrl,this.qs.stringify({a: 1}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.cateData = res.data.data;   
                    }
                    that.loadTag = 0       
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            getStarsData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.starUrl,this.qs.stringify({a: 1}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.starsData = res.data.data;   
                    }
                    that.loadTag = 0       
                }).catch(function(err){
                 console.log(err)
                })
                              
            },


            // 获取 easy-mock 的模拟数据
            getData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.url,this.qs.stringify({page: this.cur_page}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.tableData = res.data.data; 
                       that.total=res.data.count
                       that.pageList=res.data.page    
                    }
                    //console.log(that.total)
                    //that.total=res.        
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            search() {
                this.is_search = true;
                this.cur_page = 1;
                this.getData();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            // 确定删除
            deleteRow(){  
                var that = this
                this.axios.post(this.GLOBAL.serviceUrl+'a_user_del',this.qs.stringify({id: this._delId}),{
                        headers: {'token': that.commonfunc.get('token')}
                    }).then(function(res){
                    var msg = '删除成功'
                    if('400'!=res.data.ret){
                        that.$message.success(msg);
                    }else{
                        that.$message.error(res.data.msg);
                    }
                    that.delVisible = false;
                    that.tableData.splice(that.idx, 1);
                    //console.log(res)
                    //console.log(res.data.data.list)
                    //that.tableData = res.data.data.list;
                    //that.total=res.        
                }).catch(function(err){
                 console.log(err)
                })             
                //this.tableData.splice(this.idx, 1);

            },
            strLen(str){
                var len = 0;
                for (var i=0; i<str.length; i++) { 
                 var c = str.charCodeAt(i); 
                //单字节加1 
                 if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
                   len++; 
                 } 
                 else { 
                  len+=2; 
                 } 
                } 
                return len;           
            },
        }
    }

</script>
<style scope>
.mod-sidebar .sidebar-toggle-out{
    width:250px;
}
</style>
<!--
$(".mod-sidebar").on("click", ".btn-toggle-in,.btn-toggle-out", function() { var $this = $(this); if ($this.hasClass("btn-toggle-in")) { $(".mod-sidebar").addClass("toggle");
        $(".o-wrap").addClass("hide-sidebar") } else { $(".mod-sidebar").removeClass("toggle");
        $(".o-wrap").removeClass("hide-sidebar") } commonUtil.initNarrow() });
-->