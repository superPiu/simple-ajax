const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.all('*',(req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,OPTIONS")
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

app.put('/user',function(req,res,next){
    let params = req.body
    console.log(params)
    let resData = {
        'responseCode' : '0000',
        'responseMsg':`用户修改成功`
    }
    res.send(resData)
})

app.listen('5000',() => {
    console.log("put")
})