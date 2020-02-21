<template>    
<div id="page" style="position: relative;">
    <Header ref="theHeader"></Header>
    <Slidebar @child_event="pslidefunc" ref="sidebar"></Slidebar>
    <div id="main" @click="hideSearch();">
        <div id="home-tabs" class="xv-tabs ">
            <ul class="tab-buttons tab-6-buttons">
            </ul>
        </div>
        <div id="content">
          
            <div class="mozaique">
                <div v-for="site in data" class="thumb-block  tbm-init-ok" >
                    <div class="thumb-inside">
                        <div class="microthumb">
                            <div class="microthumb-thumb" style="background-position:0% 0%"></div>
                            <div class="microthumb-border"></div>
                        </div>
                        <div class="thumb">
                        <router-link :to="'/detail'+site.id">
                            <img :src="site.vimg" :alt="site.title">
                        </router-link> 
                        </div><span class="video-hd-mark">1080p</span><button class="action-menu"><span class="open icon-f icf-ellipsis-v"></span><span class="close icon-f icf-close-thin"></span></button>
                    </div>
                    <div class="thumb-under">
                        <p class="title"><router-link :to="'/detail'+site.id">{{site.title}}</router-link></p>
                    </div>
                </div>
            </div>
            <div class="pagination ">
            <ul>
            <li  v-for="site in curPageList"   @click="loadMore(site.val)"><a href="javascript:void(0);"  v-bind:class="activeClass(site.val)">{{site.title}}</a></li>
            </ul>
            </div>   
            <div class="hide-if-premium" v-if="more_load">
                <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
            </div>
            <!--
            <div id="subs-home-toggle-cont" class="hide-if-premium" v-if="more">
                <button id="subs-home-toggle" class="btn btn-default init-ok"  @click="loadMore()">查看更多</button>
            </div>
            -->
        </div>
    </div>
    <Footer></Footer>    
</div>
</template>

<script>
    import Header from './Header.vue'
    import Slidebar from './Slidebar.vue'
    import Footer from './Footer.vue'
    export default {
        name: 'Index',
        components:{
          Header,
          Slidebar,
          Footer,
        },
        data() {
            return {
                url: this.GLOBAL.serviceUrl+'?t=2&de=2',
                tagUrl: this.GLOBAL.serviceUrl+'?t=3&de=2',
                tableData: [],
                total:0,
                cur_page: 1,
                pageSize:0,
                pageList:[],
                tData:[],
                slide:1,
                curHeight:'height:272.767px',
                ltype:0,
                hData:[],
                more:1,
                more_load:0,
                pageList:[]
            }
        },
        created() {
            this.getData();
            /*
            this.getHotData();
            */
        },
        mounted(){
            //this.getData();
        },
        watch: {
          '$route' (to,from) {
            this.more_load = 0
            this.getData();
            //this.getTagData();
            this.getHotData();
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
            hotData() {
                return this.hData
            },
            "msg"(){
                return "asdff"
            },
            activeClass() {            
              return function(_page){
                  return {'active':_page==this.cur_page};         
              }     
            }  
        },
        methods: {
            hideSearch(){
              this.$refs.theHeader.$emit('handleinput',1);
            },
            getType(_type=0){
              this.more_load = 1
              this.more = 0
              if(_type != this.ltype){
                  this.tableData = []
                  this.more = this.cur_page = 1              
              }else{
                return false
              }
              this.ltype = _type
              this.getData();
            },
            loadMore(va){
              this.more_load = 1
              this.more = 0
              this.cur_page =va
              this.getData();
            },
            pslidefunc(data){
              this.slide = parseInt(data)
              if(!data){
                this.curHeight = 'height:287.403px'
              }else{
                this.curHeight = 'height:272.767px;'
              }
              console.log(this.curHeight)
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
                    //console.log(that.total)
                    //that.total=res.        
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                //console.log(window.location.host)
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.url,this.qs.stringify({page: this.cur_page,ltype:this.ltype}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                
                       that.tableData = res.data.data; 
                       that.pageList = res.data.endPage; 
                       //that.total=res.data.count
                       //that.endPage=res.data.endPage
                       /*
                       if(that.cur_page == res.data.endPage||that.cur_page > res.data.endPage){
                          that.more = 0
                       }else{
                          that.more = 1
                       } 
                       */    
                    }
                    that.more_load = 0         
                }).catch(function(err){
                 console.log(err)
                })
                              
            },
            getHotData() {
                var a=this.commonfunc._getRandom()
                var nonce = parseInt(a)
                var token=this.commonfunc._gtokene(nonce)
                var that = this  
                this.axios.post(this.url,this.qs.stringify({page: this.cur_page,ltype:1,pageNum:8}),{
                        headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
                    }).then(function(res){
                    if(parseInt(res.data.message)==0){                  
                       that.hData = res.data.data; 
                       //that.total=res.data.count
                       //that.pageList=res.data.page    
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pActive{
  color:blue;
}
</style>
<style>

.gli_slideIn{
   height: 287.403px;
}
.gli_slideOut{
   height: 272.767px;
}
</style>
