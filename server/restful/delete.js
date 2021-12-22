const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.all('*',(req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods","POST,GET,DELETE,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8");
    
    if(req.method === 'OPTIONS'){
        res.sendStatus(200)
    }else{
        next()
    }
})
app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//删除用户
app.delete('/user',function(req,res,next){
    let { id } = req.body;
    let resData = {
        'responseCode' : '0000',
        'responseMsg':`用户${id}删除成功`
    }
    res.send(resData)
})
app.listen('5000',() => {
    console.log("delete")
})