module.exports = {
    ajax(option){
        //默认参数
        const defaultOpt = {
            method:'GET',
            url:'',
            data:{},
            async:false,
            delay:0,
            header:{},
            timeout:10000,
            success:function(){
                console.log('成功')
            },
            fail:function(e){
                console.log(e)
            }
        }
        const opt = Object.assign(option,defaultOpt);
        let xhr = new XMLHttpRequest();
        xhr.timeout = opt.timeout;
        function request(){
            xhr.open(opt.method,opt.url,opt.async)
                //设置请求头
            for (key in opt.header) {
                xhr.setRequestHeader(key, opt.header[key])
            }
            if(opt.method.toLowerCase() === 'get'){
                xhr.send();
            }else{
                // 请求的请求头
                xhr.setRequestHeader("Content-Type","application/json");
                xhr.send(JSON.stringify(opt.data));
            }
            
            // XMLHttpRequest 超时
            xhr.ontimeout = function () {
                xhr.abort()
            };
            xhr.onreadystatechange(function(){
                if(xhr.status === 200 && xhr.readyState === 4){
                    opt.success(xhr.responseText);
                }
            })
        }
        if(opt.delay > 0){ //处理延时请求
            const _this = this;
            setTimeout(()=>{
                _this.request()
            },opt.delay)
        }

    }
}