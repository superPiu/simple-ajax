function ajax(param) {
    function Ajax(param) {
        
        const defaultOpt = {
            method:'GET',
            url:'',
            data:null,
            dataType:'json',
            async:true,
            delay:0,
            header:{},
            timeout:30000,
            success:Function.prototype,
            error:Function.prototype,
            complete:Function.prototype
        }
        let xhr = null;
        const params = Object.assign(defaultOpt,param);
        const requestType = params.dataType === 'jsonp' ? 'jsonpReq' : 'xhrReq';
         //处理data入参,支持字符串形式和对象形式
         Ajax.prototype.formartData = function(data){
            if(typeof data === 'object'){
                let arr = []
                for(param in data){
                    arr.push(`${param}=${data[param]}`)
                }
                data = arr.join('&')
                return data;
            }
        }
        /**
         *  @param {number} [len] 字符串长度
         */
         Ajax.prototype.randomString = function(len) {    
            len = len || 32;
            var str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            strLen = str.length,
            randomStr = "";
            for (i = 0; i < len; i++) randomStr += str.charAt(Math.floor(Math.random() * strLen));
            return randomStr
        }
        //xmlHTTPRequest 请求对象,包含创建和取消两个方法
        this.xhrReq = {
            create:function() {
                xhr = new XMLHttpRequest();
                //xhr = xhr;
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
                    if(xhr.readyState !== 4) return;
                    typeof params.complete === 'function' && params.complete(xhr,xhr.statusText) 
                    if(xhr.status >= 200 && xhr.status <400){
                        let data = xhr.responseText;
                        if(params.dataType=="json"){
                            data=JSON.parse(data);
                        } 
                        params.success(data)
                        
                    }else{
                        if(typeof params.error === "function"){
                            params.error(xhr.status)
                        }else{
                            console.log('请求出错~')
                        }
                    }
                }
            },
            abort:function () {
                xhr.abort()
            }
        }
        //jsonp 请求对象,包含创建和取消两个方法
        this.jsonpReq = {
            create:function () {
                const script = document.createElement('script');
                const data = this.formartData(params.data)
                const funNameSuccess = this.randomString(10)
                window[funNameSuccess] = function(data){
                    params.success(data);
                }
                script.src = `${params.url}?callback=${funNameSuccess}&${data}`;
                document.body.appendChild(script);
            },
            abort:function(){
                params.success = null;
            }
        }
        //延时发起请求
        if(params.delay > 0){
            setTimeout(function() {
                this[requestType].create.call(this)
            },params.delay)
        }else{
            this[requestType].create.call(this)
        }
        //终止请求
        this.abort = function () {
            this[requestType].abort()
        }
        
       
    }
    return new Ajax(param)
}