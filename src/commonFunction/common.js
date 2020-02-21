import md5 from 'js-md5';
import eglobal_ from '@/config/global'
import CryptoJS from 'crypto-js';
import crypto from 'crypto'
//开源storage的库，对localstorage和sessionstorage的封装
import storage from 'good-storage'
//import locutus from 'locutus/php/strings/md5'
export default {
/*把搜索的结果保存下来*/
/*用export把方法暴露出来*/
/*定义存储搜索的key  _search_定义内部使用的key*/
    /*插入方法     arr存储的数据  val传入存储的值  compare前后比较的函数  maxlen存入的最大值*/
    insertArray(arr,val,compare,maxlen){
        //findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。
/*        console.log(val)
        console.log(arr)*/
        const index=arr.findIndex(compare)
        if(index===0){  //数据为数组中的第一个数据 不做任何操作
            return 
        }
        if(index>0){  //数组中有这条数据并且不再第一个位置
            arr.splice(index,1)  //删掉这个数
        }
        arr.unshift(val);//把这条数据存储到数组中的第一个位置上
        if(maxlen && arr.length>maxlen){
            //如果有条数限制并且数组的个数大于限制数
            arr.pop() //方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值
            
        }
    },
    saveSearch(query,type=0){
        if(type==0){
            var SEARCH_KEY='_search_'
            var SEARCH_MAX_LENGTH=15
        }else{
            var SEARCH_KEY='history'
            var SEARCH_MAX_LENGTH=15
        }
        let searches=storage.get(SEARCH_KEY,[])
        /*逻辑是最后一次搜索的结果放到搜索历史的第一个*/
        this.insertArray(searches,query,(item)=>{
/*            console.log(JSON.parse(query).id) 
            console.log(JSON.parse(item).id)*/
            if(type == 0){
                return item===query //这是传入的一个比较函数 说明query在这个数组中
            }else{
                return JSON.parse(query).id == JSON.parse(item).id
            }
                
        },SEARCH_MAX_LENGTH)
        storage.set(SEARCH_KEY,searches)
        return searches
    },
    set(key,value){
        var curTime = new Date().getTime();
        localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
    },
    get(num){
        //var random = getRandom(0,100)
/*        var _token = md5(num)
        return _token*/
        //var names=new Array(random,_token);
        //return names
/*        var data = localStorage.getItem(key);
        if(!data){
            //console.log('1')
            return false;
        }
        var exp = localStorage.getItem('expire');
        if(!exp){
            exp = 24*60*60*7;
        }
        var dataObj = JSON.parse(data);
        //console.log('aaa'+(new Date().getTime() - dataObj.time)+'sdf'+exp)
        if (parseInt((new Date().getTime() - dataObj.time)/1000)<exp) {
            return dataObj.data;
        }else{
            return false;
        }*/
    },    
    _gtokene(num,token){
        token=eglobal_.token
        var n = num + ""
        var str =n+"..,"+token
        //return str
        var crypto_md5 = crypto.createHash('md5');
        crypto_md5.update(str, 'utf8'); // 加入编码
        return crypto_md5.digest('hex');        
/*      num = 3333 
      return locutus.md5('Kevin van Zonneveld') 
/*      return CryptoJS.MD5(num).toString();
      var md5 = crypto.createHash("md5");
      //update("中文", "utf8")
     md5.update(num);
      var a = md5.digest('hex');*/
      //47bce5c74f589f4867dbd57e9ca9f808
      //return a;
/*         token=eglobal_.token
        var n = n + ""
        return md5(n)
        return md5(n+"..,"+token)*/
    },
    _getRandom(){
       var num = Math.random()*10000
       return num
    },

}