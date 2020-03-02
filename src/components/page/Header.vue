<template>
    <div>
    <div id="header">
        <header>
            <div class="stripe white-stripe">
                <h1 class="hidden">qcxxx.com</h1>
                <a href="javascript:void(0);" class="animated-hamburger init-ok"  v-bind:class="{'opened':isOpen}" id="header-menu-toggle" title="切换菜单"   @click="openMenu()">
                    <span class="an-h-1"></span>
                    <span class="an-h-2"></span>
                    <span class="an-h-3"></span>
                    <span class="an-h-4"></span>
                </a>
                <a href="/" class="logo" id="site-logo-link" style="max-width: calc(100% - 174px);"   @click="handleinput(1)">

                <img  :src="xlogo" title="qcxxx.com 主頁" height="36" width="144" class="no-blur" id="site-logo"    @click="handleinput(1)"/>

                </a> 
                <form action="#" id="xv-search-form" class="mobile-show" style="max-width: 1159px;" @submit.prevent="onSubmit">
                    <div class="cont">
                        <div class="input-group">
                            <input type="text" name="k" value="" class="search-input form-control" maxlength="2048" placeholder="Search 8,933,298 videos" autocomplete="off" @focus="handleinput()" v-model="keywords"><span class="input-group-btn" @click="doSearch()" ><button type="submit" title="搜索" class="search-submit btn btn-default"><span class="mobile-show-inline-block">搜索</span></button></span>
                        </div>
                    </div>
                </form>
            </div>
            <h2 id="mobile-slogan" class="mobile-show">最佳 <span class="text-danger">免費成人影視</span>網站 </h2>
        </header>
    </div>
    <div class="search-autocomplete" style="top: 88px; left: 8.5px; min-width: 300px; max-width: 354.5px; max-height: 575px; overflow-y: auto;" v-bind:style="{ display: searchList }">
    <ul class="keywords" style="max-height: none;">
        <router-link :to="'/listb/'+v"  v-for="v in search_history">
        <li style="padding-left:12px;padding-right:12px">
                <!--
                <span class="nbres">19,291</span>
                -->
                <span class="keywords"><span class="highlighted">{{v}}</span></span>
        </li>
        </router-link>
    </ul>
    </div>    
    </div> 
</template>
<script>
import vlogo from '@/assets/xvideos.com-christmas.svg'
export default {
  name: 'Header',
  data(){
        return {
            search_history:this.cstorage.get('_search_'),
            keywords:this.$route.params.k,
            vlogo:vlogo,
            xlogo:this.GLOBAL.serviceUrl+'pimg/xlogo.png',
            isOpen:0,
            searchList:'none'
        }
        
  },
  mounted(){
        this.$on('handleinput',(val)=>{
            this.handleinput(val);
        });

  },  
  methods: {
        openMenu() {
            if(this.isOpen == 0){
                this.isOpen = 1
            }else{
                this.isOpen = 0
            }
            this.$parent.$refs.sidebar.isOpen=this.isOpen;
            this.handleinput(1)
        },
        doSearch() {
            //console.log(this.keywords)
            if(this.keywords == ''){
                return
            }
            this.commonfunc.saveSearch(this.keywords); // 本地存储搜索的内容         
            this.$router.replace('/listb/'+encodeURIComponent(this.keywords))
        },
        onSubmit(){
            return false;
        },
        handleinput(type){        //输入框获取焦点显示搜索历史记录
            if(type!=undefined&&parseInt(type) == 1){
                this.searchList = 'none'
                return
            } 
            this.isOpen = 0
            this.$parent.$refs.sidebar.isOpen=this.isOpen;
            let searches=this.cstorage.get('_search_');
            if(searches!=undefined){
                this.search_history = searches
                
            }
            this.searchList = 'block'
                                    
        },        
  },
  watch: {
    '$route' (to,from) {
      this.keywords = this.$route.params.k
      this.search_history=this.cstorage.get('_search_')
      this.searchList = 'none'
    }
  }, 
}
</script>        