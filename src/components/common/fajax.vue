var vue = new Vue({
        el:"#vueid",  
        data:{
            selectById : "",
        },
        methods:{
            yourMethod:function(id){ 
                 $.ajax({
                    type : "POST",
                    url : "selectCsdbById.shtml",
                    data : {
                        id : id,
                    },
                    success : function(data) {
　　　　　　　　　　　　　　 var message = $.parseJSON(data);//后台返回的json数据需要转为对象
                         vue.selectById=message;//把后台返回的JSON数据赋给selectById
                    },
                    error : function(){
                        alert("错误");
                    }

                });
            },
            updateById:function(){
                $.ajax({
                        type : "POST",
                        url : "updateById.shtml",
                        data : vue.selectById,
                        success : function(data) {
                            alert(data);
                        },
                        error : function(){
                            alert("错误");
                        }

                    });
            },
        }
    })