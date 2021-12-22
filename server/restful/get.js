const express = require("express")

const app = express()
app.all('*',(req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    res.header("Access-Control-Allow-Method","POST,GET,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8");
    
    if(req.method === 'OPTIONS'){
        res.send(200)
    }else{
        next()
    }
})
app.use(express.static(__dirname+'/static'))
//用户列表查询
app.get('/user/list',function(req,res,next){
    let {pageSize,pageNo} = req.query
    let resData = {
        'responseCode' : '0000',
        'data':[{id:'001',name:'老王'}],
        'total':10,
        'responseMsg':'成功'

    }
    res.send(resData);
})
//精确查询
app.get('user/:id',function(req,res,next){
    let { id } = req.params;
    let resData = {
        'responseCode' : '0000',
        'data':{id:'001',name:'老王'},
        'responseMsg':'成功'
    }
    res.send(resData)
})

app.listen('5000',() => {
    console.log("static")
})