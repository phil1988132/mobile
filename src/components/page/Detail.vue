<template>
  <div id="page" style="position: relative;" class="video-page">
    <Header ref="theHeader"></Header>
    <Slidebar @child_event="pslidefunc" ref="sidebar"></Slidebar>
    <div id="main" @click="hideSearch();">  
      <div id="ad-header-mobile-contener">
        
        <div id="ad-header-mobile" class=" ad-mobilerectangle ad-support-mobile" v-if="ads1Data" style="text-align: center;overflow:hidden;">
        <a :href="ads1Data.url" target="_blank" rel="noopener"><img :src="ads1Data.vimg"></a>
        </div>
        
      </div>
      <h2 class="page-title">{{urVideo.title}} <span class="duration">({{urVideo.view_times}})次观看</span> </h2>
      <div class="video-metadata video-tags-list ordered-label-list cropped">
        <ul>
          <li v-for="site in urVideo.tags">
            <router-link :to="'/lista'+site" class="btn btn-default label main uploader-tag hover-name"><span class="name">{{site}}</span></router-link>
          </li>
        </ul>
      </div>


      <div class="myVideos">
        <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup='{}'>
            <source id="source" :src="avatar1" type="application/x-mpegURL"></source>
        </video>
      </div>

      <div id="related-videos" class="with-footer-ad with-ad"  style="margin-top:5px;">
        <div class="thumb-block video-ad video-ad-pos-5 video-ad-support-mobile">
          <div class="thumb-inside">
            <a :href="ads2Data.url" target="_blank" rel="noopener"><img :src="ads2Data.vimg"></a>          
          </div>
        </div>      
        <div class="mozaique">
          <div class="thumb-block after-15 after-16 tbm-init-ok" v-for="site in curPageList" style="overflow:hidden;display:block;">
            <div class="thumb-inside">
              <div class="thumb">
                <router-link :to="'/detail'+site.id" class="item-title" :title="site.title"><img :src="site.vimg"></router-link>
              </div>
              <button class="action-menu"><span class="open icon-f icf-ellipsis-v"></span><span class="close icon-f icf-close-thin"></span></button>
            </div>
            <div class="thumb-under" style="min-height:36px;">
              <p class="title">
                <router-link :to="'/detail'+site.id" class="item-title" :title="site.title">{{site.title}}</router-link>
              </p>
            </div>
          </div>
        </div>
        <div class="hide-if-premium"  v-if="unload">
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </div>
        <!--
            <a href="javascript:void(0);" class="btn btn-default show-more">Show more related videos</a>
            -->
      </div>
    </div>
    <div style="z-index:100;margin-top:10px;">
    <Footer></Footer>
    </div>   
  </div>
</template>
<script>

import Header from './Header.vue'
import Slidebar from './Slidebar.vue'
import vfull from '@/assets/player/icon-volume-full.svg'
import vmilus from '@/assets/player/icon-volume-mute-bold.svg'
import vpause from '@/assets/player/icon-pause.svg'
import vplay from '@/assets/player/icon-play.svg'
import vrepeat from '@/assets/player/icon-repeat.svg'
import scFull from '@/assets/player/icon-screen-fullscreen.svg'
import Footer from './Footer.vue'
//  import avatar from '@/assets/setVideoUrlLow.mp4'
export default {
  name: 'Index',
  components: {
    Header,
    Slidebar,
    Footer,
  },
  data() {
    return {
      url: this.GLOBAL.serviceUrl + '?t=1',
      tagUrl: this.GLOBAL.serviceUrl + '?t=3',
      relateUrl: this.GLOBAL.serviceUrl + '?t=4',
      likesUrl: this.GLOBAL.serviceUrl + '?t=5',
      viewUrl: this.GLOBAL.serviceUrl + '?t=6',
      topUrl: this.GLOBAL.serviceUrl + '?t=7',
      adsUrl: this.GLOBAL.serviceUrl+'?t=12',
      tableData: [],
      total: 0,
      cur_page: 1,
      pageSize: 0,
      pageList: [],
      tData: [],
      avatar: "http://www.qcxxx.icu/setVideoUrlLow.mp4",
      avatar1: "http://www.qcxxx.icu/setVideoUrlLow.mp4",
      vrepeat: vrepeat,
      vplay:vplay,
      vpause:vpause,
      vmilus:vmilus,
      scFull:scFull,
      vfull:vfull,
      slide: 1,
      curHeight: 'height:272.767px',
      urVideo: {},
      user_history: [],
      cur_history: '',
      isClick: 0,
      firstLick: 0,
      myPlayer: '',
      topPageList: [],
      is_voice: 1,
      is_play: 0,
      muted:false,
      fullFlag:false,
      posterOnce:1,
      unload:1,
      ads1:{},
      ads2:{},
    }
  },
  created() {
    //this.iniVideo()
    this.getData();
    this.getRelatedData()
    this.getViewData()
    this.getTopData()
    this.getAdsData(1)
    this.getAdsData()
  },
  mounted() {
    //this.getData();
  },
  watch: {
    '$route'(to, from) {
      //this.iniVideo()
      this.getData();
      this.getRelatedData()
      this.getViewData()
      this.is_play = 0
      this.posterOnce=1
      this.unload = 1
      this.getAdsData(1)
      this.getAdsData()
    }
  },
  computed: {
    data() {
      return this.tableData
    },
    curPageList() {
      return this.pageList
    },
    newAvatar() {
      return this.avatar
    },
    tagData() {
      return this.tData
    },
    "msg"() {
      return "asdff"
    },
    ads1Data() {
        return this.ads1
    },
    ads2Data() {
        return this.ads2
    },
  },
  methods: {
    hideSearch(){
      this.$refs.theHeader.$emit('handleinput',1);
    },  
    rePlay() {

    },
    gtouchstart() {
      console.log('cm')
    },
    like() {
      if (this.isClick == 0) {
        this.isClick = 1
        this.urVideo.like_times += 1
        if (this.firstLick == 0) {
          this.firstLick = 1
          this.addLikes()
        }
      } else {
        this.isClick = 0
        this.urVideo.like_times -= 1
      }
    },
    addLikes() {
      var a = this.commonfunc._getRandom()
      var nonce = parseInt(a)
      var token = this.commonfunc._gtokene(nonce)
      var that = this
      this.no = this.$route.params.no
      var that = this
      this.axios.post(this.likesUrl, this.qs.stringify({ no: this.no }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'nonce': nonce, 'token': token }
      }).then(function(res) {

      }).catch(function(err) {

      })
    },
    setHistoryData() {
      if (this.cur_history != undefined || this.cur_history != '') {
        this.commonfunc.saveSearch(this.cur_history, 1);
      }
    },
    //  controlsList='nofullscreen nodownload noremote nofootbar  noremoteplayback nomuted nounmuted' 
    iniVideo() {
      this.myPlayer = this.$video(document.getElementById('myVideo'), {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: false,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        // width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px",
        fluid: true,
        notSupportedMessage: '暂无法播放，请刷新或稍后再试',
        controlBar: {
          playToggle: true,
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏
        }   
      });

    },
    showFull() {
          var videoBox =  document.getElementById("myVideo")
          if (videoBox.requestFullscreen) {
              videoBox .requestFullscreen();
          } else if (videoBox .mozRequestFullScreen) {
              videoBox .mozRequestFullScreen();
          } else if (videoBox .webkitRequestFullScreen) {
              videoBox .webkitRequestFullScreen();
          }  
          this.fullFlag = true   
    }, 
    doPlay() {
      this.myPlayer.play()
      //console.log(this.is_play)
      this.is_play = 1
      this.posterOnce=0
    },
    doPause() {
      this.myPlayer.pause()
      this.is_play = 0
    },
    cancelVoice() {
       this.muted = true
       this.is_voice = 0
    },
    playVoice(){
        this.muted = false
        this.is_voice = 1
    },
    playVideo(url) {
      let vdo = document.getElementById("video-9012899_html5_api")
      vdo.src = url;
      vdo.play();
    },
    getType(_type = 0) {
      if (_type != this.ltype) {
        this.tableData = []
        this.more = this.cur_page = 1
      } else {
        return false
      }
      this.ltype = _type
      this.getData();
    },
    loadMore() {
      this.cur_page += 1
      if (this.$route.params.k !== undefined) {
        this.getKData();
      } else {
        this.getData();
      }

    },
    pslidefunc(data) {
      this.slide = parseInt(data)
      if (!data) {
        this.curHeight = 'height:287.403px'
      } else {
        this.curHeight = 'height:272.767px;'
      }
      console.log(this.curHeight)
    },
    refresh() {
      this.getData();
    },
    curTitle(val) {
      let obj = {};

      obj = this.role_list.find((item) => {

        return item.id === val;

      });
      this.selected_title = obj.title
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      if (this.$route.params.no != '' || this.$route.params.no !== undefined) {
        var a = this.commonfunc._getRandom()
        var nonce = parseInt(a)
        var token = this.commonfunc._gtokene(nonce)
        var that = this
        this.no = this.$route.params.no
        var that = this
        this.axios.post(this.url, this.qs.stringify({ no: this.no }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'nonce': nonce, 'token': token }
        }).then(function(res) {
          if (parseInt(res.data.message) == 0) {
            that.iniVideo()
            that.myPlayer.src(res.data.data.highUrl)
            that.avatar = res.data.data.highUrl
            that.myPlayer.load()
            //that.myPlayer.play()
            that.urVideo = res.data.data
            that.cur_history = JSON.stringify(res.data.data)
            that.setHistoryData()
            if (that.urVideo.view_times === undefined || that.urVideo.view_times == null) {
              that.urVideo.view_times = 27506
            }
            if (that.urVideo.like_times === undefined || that.urVideo.like_times == null) {
              that.urVideo.like_times = 27936
            }
          }
          //console.log(that.total)
          //that.total=res.        
        }).catch(function(err) {
          this.unload = 0
          console.log(err)
        })
      }
    },
    getRelatedData() {
      if (this.$route.params.no != '' || this.$route.params.no !== undefined) {
        var a = this.commonfunc._getRandom()
        var nonce = parseInt(a)
        var token = this.commonfunc._gtokene(nonce)
        var that = this
        this.no = this.$route.params.no
        var that = this
        this.unload = 1
        this.pageList = []
        this.axios.post(this.relateUrl, this.qs.stringify({ no: this.no, page: this.page }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'nonce': nonce, 'token': token }
        }).then(function(res) {
          if (parseInt(res.data.message) == 0) {
            that.pageList = res.data.data
            that.total = res.data.count
            that.unload = 0
          }
          //console.log(that.total)
          //that.total=res.        
        }).catch(function(err) {
          that.unload = 0
          console.log(err)
        })
      }
    },
    getViewData() {
      if (this.$route.params.no != '' || this.$route.params.no !== undefined) {
        var a = this.commonfunc._getRandom()
        var nonce = parseInt(a)
        var token = this.commonfunc._gtokene(nonce)
        var that = this
        this.no = this.$route.params.no
        var that = this
        this.axios.post(this.viewUrl, this.qs.stringify({ no: this.no }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'nonce': nonce, 'token': token }
        }).then(function(res) {}).catch(function(err) {})
      }
    },
    getTopData() {
      if (this.$route.params.no != '' || this.$route.params.no !== undefined) {
        var a = this.commonfunc._getRandom()
        var nonce = parseInt(a)
        var token = this.commonfunc._gtokene(nonce)
        var that = this
        this.no = this.$route.params.no
        var that = this
        this.axios.post(this.topUrl, this.qs.stringify({ no: this.no }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'nonce': nonce, 'token': token }
        }).then(function(res) {
          if (parseInt(res.data.message) == 0) {
            that.topPageList = res.data.data
          }

        }).catch(function(err) {})
      }
    },

    getAdsData(_type) {
        var a=this.commonfunc._getRandom()
        var nonce = parseInt(a)
        var token=this.commonfunc._gtokene(nonce)
        var that = this  
        this.axios.post(this.adsUrl,this.qs.stringify({de: 2}),{
                headers: {'Content-Type':'application/x-www-form-urlencoded','nonce':nonce,'token':token}
            }).then(function(res){
            if(parseInt(res.data.message)==0){
               if(_type){
                    that.ads1 = res.data.data;   
               }else{
                    that.ads2 = res.data.data;  
               }                  
                 
            }
            that.loadTag = 0       
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
    strLen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

@font-face {
  font-family: VideoJS;
  src: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");
  font-weight: normal;
  font-style: normal; }

  //.video-js .vjs-tech {position: relative !important;}
  #myVideo{
    width: 100%;overflow:hidden;height: 400px;
  }
  .video-js .vjs-big-play-button{
      font-size: 2.5em;
      line-height: 2.3em;
      height: 2.5em;
      width: 2.5em;
      -webkit-border-radius: 2.5em;
      -moz-border-radius: 2.5em;
      border-radius: 2.5em;
      background-color: #73859f;
      background-color: rgba(115,133,159,.5);
      border-width: 0.15em;
      margin-top: -1.25em;
      margin-left: -1.75em;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
      font-size: 1.63em;
  }
  /* 加载圆圈 */
  .vjs-loading-spinner {
      font-size: 2.5em;
      width: 2em;
      height: 2em;
      border-radius: 1em;
      margin-top: -1em;
      margin-left: -1.5em;
  }  
  #app{margin-top:0px;}
</style>
