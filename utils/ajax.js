const Promise = require('./promise')
function ajax(param) {
    function Ajax(param) {
        return new Promise((resolve,reject)=>{
            this.defaultOpt = {
                method:'GET',
                url:'',
                data:null,
                dataType:'json',
                async:true,
                jsonpCallback:'',
                delay:0,
                header:{},
                timeout:0,
                success:Function.prototype,
                error:Function.prototype,
                complete:Function.prototype
            }
            this.xhr = null;
            this.params = Object.assign(this.defaultOpt,param);
            //xmlHTTPRequest 请求对象,包含创建和取消两个方法
            Object.assign(this,{
                create() {
                        const params = this.params;
                        let xhr = this.xhr = new XMLHttpRequest();
                        //设置请求头
                        for (key in params.header) {
                            xhr.setRequestHeader(key, params.header[key])
                        }
                        const data = this.formartData(params.data)
                        if(params.method.toLowerCase() === 'get'){
                            params.url += ('?'+ data)
                            xhr.open(params.method,params.url,params.async)
                            xhr.send();
                        }else{
                            xhr.open(params.method,params.url,params.async)
                            // 请求的请求头
                            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                            xhr.send(data);
                        }
                        xhr.onreadystatechange = function(){
                            if(xhr.readyState !== 4 || this.isTimeout) return;
                            clearTimeout(this.timer)
                                typeof params.complete === 'function' && params.complete(xhr,xhr.statusText) 
                                if(xhr.status >= 200 && xhr.status <400){
                                    let data = xhr.responseText;
                                    if(params.dataType=="json"){
                                        data=JSON.parse(data);
                                    } 
                                    resolve(params.success(data))
                                    
                                }else{
                                    if(typeof params.error === "function"){
                                        reject(params.error(xhr.status))
                                    }else{
                                        reject('请求出错~')
                                    }
                                }
                        }
                },
                abort() {
                    this.xhr.abort()
                },
                timeout(e) {
                    this.xhr.abort()
                    clearTimeout(this.timer)
                    this.params.error(e)
                    reject(e)
                }
            })
            //如果是jsonp请求则覆盖上面的create/abort/timeout方法
            if(this.params.dataType.toLowerCase() === 'jsonp'){
                Object.assign(this,{
                    create() {
                        const params = this.params
                        this.script = document.createElement('script');
                        const data = this.formartData(params.data)
                        const funNameSuccess = params.jsonpCallback || 'jsonp_callback_' + this.randomString(10)
                        const that = this
                        window[funNameSuccess] = function(data){
                            clearTimeout(this.timer)
                            params.success && params.success(data);
                            document.body.removeChild(that.script)
                            resolve(data)
                        }
                        this.script.src = `${params.url}?callback=${funNameSuccess}&${data}`;
                        document.body.appendChild(this.script);
                    },
                    abort(){
                        this.params.success = null;
                    },
                    timeout(e) {
                        this.params.success = null;
                        document.body.removeChild(this.script)
                        this.params.error(e)
                        reject(e)
                    }
                })
            }
            //是否延时发起请求
            if(this.params.delay > 0){
                setTimeout(function() {
                    this.create()
                },this.params.delay)
            }else{
                this.create()
            }
            //是否设置了超时
            if(this.params.timeout > 0) {
                this.timer = setTimeout(()=>{
                    this.isTimeout = true
                    this.timeout( new Error('请求超时了'))
                },this.params.timeout + this.params.delay)
            }
        })
    }

    Ajax.prototype = {
        /**
         *  @param {object/string} [data] 
         *  @description 处理data入参,支持字符串形式和对象形式,返回拼接字符串
         */
         formartData(data){
            if(typeof data === 'object'){
                let arr = []
                for(param in data){
                    arr.push(`${param}=${data[param]}`)
                }
                data = arr.join('&')
                return data;
            }
        },
        /**
        *  @param {number} [len] 字符串长度
        */
        randomString(len) {    
            len = len || 32;
            var str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            strLen = str.length,
            randomStr = "";
            for (i = 0; i < len; i++) randomStr += str.charAt(Math.floor(Math.random() * strLen));
            return randomStr
        }
    }

    return new Ajax(param)
}
module.exports = ajax