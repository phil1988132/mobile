<template>
<div>
<!--广告后期开放-->
<div class="remove-ads" v-if="ads2Data" style="text-align: center;overflow:hidden;">
    <p>
  <a :href="ads2Data.url" target="_blank" rel="noopener"><img :src="ads2Data.vimg"></a>
    </p>
</div>
<div class="remove-ads" v-if="ads1Data" style="text-align: center;overflow:hidden;">
    <p>
  <a :href="ads1Data.url" target="_blank" rel="noopener"><img :src="ads2Data.vimg"></a>
    </p>
</div>
<div id="footer">
    <footer>
        <p class="slogan">qcxxx.com - 網絡上的最佳成人影視，100%免費</p>
    </footer>
</div>
</div>
</template>
<script>
export default {
  name: 'Footer',
    data() {
        return {
            trendsUrl: this.GLOBAL.serviceUrl+'?t=9',
            adsUrl: this.GLOBAL.serviceUrl+'?t=12',
            trendsData:[],
            ads1:{},
            ads2:{},
        }
    },
    created() {
        //this.getTrendsData();
        this.getAdsData();
        this.getAdsData(1);
    },
    computed: {
        trData() {
            return this.trendsData
        },
        ads1Data() {
            return this.ads1
        },
        ads2Data() {
            return this.ads2
        },
    },
    watch: {
      '$route' (to,from) {
        this.more_load = 0
        this.getAdsData();
        this.getAdsData(1);
      }
    },
    methods: {
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
    }
}
</script>        