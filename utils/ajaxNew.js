function ajax(params) {
    function Ajax(params) {
        this.default = {
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
        this.xhr = null;
        this.params = Object.assign(this.default,params);
        this.requestType = this.params.dataType === 'jsonp' ? 'jsonpReq' : 'xhrReq';
         //处理data入参,支持字符串形式和对象形式
         this.formartData = function(data){
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
        this.randomString = function(len) {    
            len = len || 32;
            var str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            strLen = str.length,
            randomStr = "";
            for (i = 0; i < len; i++) randomStr += str.charAt(Math.floor(Math.random() * strLen));
            return randomStr
        }
        this.xhrReq = {
            create:function() {
                const xhr = new XMLHttpRequest();
                this.xhr = xhr;
                //设置请求头
                for (key in this.params.header) {
                    xhr.setRequestHeader(key, this.params.header[key])
                }
                const data = this.formartData(this.params.data)
                if(this.params.method.toLowerCase() === 'get'){
                    this.params.url += ('?'+ data)
                    xhr.open(this.params.method,this.params.url,this.params.async)
                    xhr.send();
                }else{
                    xhr.open(this.params.method,this.params.url,this.params.async)
                    // 请求的请求头
                    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                    xhr.send(data);
                }
                const that = this
                xhr.onreadystatechange = function(){
                    if(xhr.readyState !== 4) return;
                    typeof that.params.complete === 'function' && that.params.complete(xhr,xhr.statusText) 
                    if(xhr.status >= 200 && xhr.status <400){
                        let data = xhr.responseText;
                        if(that.params.dataType=="json"){
                            data=JSON.parse(data);
                        } 
                        that.params.success(data)
                        
                    }else{
                        if(typeof that.params.error === "function"){
                            that.params.error(xhr.status)
                        }else{
                            console.log('请求出错~')
                        }
                    }
                }
            },
            abort:function () {
                this.xhr.abort()
            }
        }
        this.jsonpReq = {
            create:function () {
                const script = document.createElement('script');
                const data = this.formartData(this.params.data)
                const funNameSuccess = this.randomString(10)
                const that = this;
                window[funNameSuccess] = function(data){
                    that.params.success(data);
                }
                script.src = `${this.params.url}?callback=${funNameSuccess}&${data}`;
                document.body.appendChild(script);
            },
            abort:function(){
                
            }
        }
        if(this.params.delay > 0){
            setTimeout(function() {
                this[this.requestType].create.call(this)
            },this.params.delay)
        }else{
            console.log(this.requestType)
            this[this.requestType].create.call(this)
        }
        this.abort = function () {
            this.requestType.abort()
        }
        this.sendRequest = function () {
            
        }
        
       
    }
    return new Ajax(params)
}