const ajax = require('./utils/ajax')
console.log(ajax)
document.getElementById("search").onclick = function(){
    let params = {
        method:"get",
        url:"http://localhost:5001/user/list",
        data:"pageSize=10&pageNo=1",
        success:function(res){
            console.log(res)
            alert("请求成功")
            return res
        }

    }
    ajax(params).then((res)=>{
        console.log(res)
    })
}
document.getElementById("add").onclick = function(){
    let params = {
        method:"post",
        url:"http://localhost:5001/user",
        data:{
            name:"大大王",
            age:23
        },
        success:function(res){
            console.log(res)
            alert(res.responseMsg)
        }

    }
    ajax(params)
}

document.getElementById("modify").onclick = function(){
    let params = {
        method:"put",
        url:"http://localhost:5001/user",
        data:{
            id:22,
            name:"大大王",
            age:23
        },
        success:function(res){
            console.log(res)
            alert(res.responseMsg)
        }

    }
    ajax(params)
}
document.getElementById("delete").onclick = function(){
    let params = {
        method:"delete",
        url:"http://localhost:5001/user",
        data:{
            id:23
        },
        success:function(res){
            console.log(res)
            alert(res.responseMsg)
        }

    }
    ajax(params)
}
document.getElementById("jsonpGet").onclick = function(){
    let params = {
        method:"get",
        dataType:'jsonp',
        url:"http://localhost:5001/user/list",
        data:{
            pageSize:23,
            pageNo:1
        },
        success:function(res){
            console.log(res)
            alert(JSON.stringify(res))
        },
        error:function(e){
            alert(e.message)
        }

    }
    ajax(params).then((res)=>{
        console.log(res)
    })
}