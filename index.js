document.getElementById("search").onclick = function(){
    let params = {
        method:"get",
        url:"http://localhost:5000/user/list",
        data:"pageSize=10&pageNo=1",
        success:function(res){
            console.log(res)
            alert("请求成功")
        }

    }
    ajax(params)
}
document.getElementById("add").onclick = function(){
    let params = {
        method:"post",
        url:"http://localhost:5000/user",
        data:{
            name:"大大王",
            age:23
        },
        success:function(res){
            console.log(res)
            alert(JSON.parse(res).responseMsg)
        }

    }
    ajax(params)
}

document.getElementById("modify").onclick = function(){
    let params = {
        method:"put",
        url:"http://localhost:5000/user",
        data:{
            id:22,
            name:"大大王",
            age:23
        },
        success:function(res){
            console.log(res)
            alert(JSON.parse(res).responseMsg)
        }

    }
    ajax(params)
}
document.getElementById("delete").onclick = function(){
    let params = {
        method:"delete",
        url:"http://localhost:5000/user",
        data:{
            id:23
        },
        success:function(res){
            console.log(res)
            alert(JSON.parse(res).responseMsg)
        }

    }
    ajax(params)
}