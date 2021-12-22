function request(xhr,opt){
    const data = formartData(opt.data)
    if(opt.method.toLowerCase() === 'get'){
        opt.url += ('?'+ data)
        xhr.open(opt.method,opt.url,opt.async)
        xhr.send();
    }else{
        xhr.open(opt.method,opt.url,opt.async)
        // 请求的请求头
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    
    // XMLHttpRequest 超时
    xhr.ontimeout = function () {
        xhr.abort()
        if(typeof opt.finaly == Object){
            finaly(xhr.status)
        }else{
            console.log('请求超时~')
        }
    };
    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4) return;
        if(xhr.status === 200){
            if(typeof opt.success == 'function'){
                opt.success(xhr.responseText)
            }else{
                console.log('请求成功~')
            }
        }else{
            if(typeof opt.finaly == "function"){
                opt.finaly(xhr.status)
            }else{
                console.log('请求出错~')
            }
        }
    }
}
//处理data入参,支持字符串形式和对象形式
function formartData(data){
    if(typeof data === 'object'){
        let arr = []
        for(param in data){
            arr.push(`${param}=${data[param]}`)
        }
        data = arr.join('&')
        return data;
    }
}

function ajax(option){
    //默认参数
    const defaultOpt = {
        method:'GET',
        url:'',
        data:null,
        async:true,
        delay:0,
        header:{},
        timeout:10000,
        success:null,
        finaly:null
    }
    const opt = Object.assign(defaultOpt,option);

    const xhr = new XMLHttpRequest();
    xhr.timeout = opt.timeout;
    //设置请求头
    for (key in opt.header) {
        xhr.setRequestHeader(key, opt.header[key])
    }
    if(opt.delay > 0){ //处理延时请求
        setTimeout(()=>{
            request(xhr,opt)
        },opt.delay)
    }else{
        request(xhr,opt)
    }

}
