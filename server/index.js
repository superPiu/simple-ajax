const express = require("express")
const bodyParser = require("body-parser")


const app = express()
app.all('*',(req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS,PUT,DELETE")
    res.header("Content-Type", "application/json;charset=utf-8");
    
    if(req.method === 'OPTIONS'){
        res.send(200)
    }else{
        next()
    }
})
app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

 //用户列表查询
 app.get('/user/list',function(req,res,next){
    let {callback,pageSize,pageNo} = req.query
    let resData = {
        'responseCode' : '0000',
        'data':[{id:'001',name:'老王'}],
        'total':10,
        'responseMsg':'成功'

    }
    if(callback){
        //res.send(`${callback}(${JSON.stringify(resData)})`)
    }else{
        res.send(resData);
    }
    
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

app.post('/user',function(req,res,next){
    let params = req.body
    console.log(params)
    let resData = {
        'responseCode' : '0000',
        'responseMsg':`用户 ${params.name} 新增成功`
    }
    res.send(resData)
})
app.put('/user',function(req,res,next){
    let params = req.body
    console.log(params)
    let resData = {
        'responseCode' : '0000',
        'responseMsg':`用户修改成功`
    }
    res.send(resData)
})
//删除用户
app.delete('/user',function(req,res,next){
    let { id } = req.body;
    let resData = {
        'responseCode' : '0000',
        'responseMsg':`用户${id}删除成功`
    }
    res.send(resData)
})

app.listen('5001',() => {
    console.log("server ok")
})