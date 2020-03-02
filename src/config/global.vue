<script>
var _host = window.location.host

const serviceUrl = window.location.protocol+"//"+"source."+_host.replace(/www./, "").replace(/m\./,"")+'/info'
const sourceUrl = window.location.protocol+"//"+"source."+_host.replace(/www./, "").replace(/m\./,"")+'/'
//'http://kk.com:8080/info';
const token = '12345,.Abc33678';
//  const hasEnter=false;
//  const userSite="中国钓鱼岛";

export default
{
  serviceUrl,
  token
}

</script>