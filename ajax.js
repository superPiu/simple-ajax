module.exports = {
    ajax(option){
        const defaultOpt = {
            method:'GET',
            url:'',
            async:false,
            delay:0,
            timeout:10000,
            success:function(){
                console.log('成功')
            }
        }
        const opt = Object.assign(option,defaultOpt);
        let xmlReq = new XMLHttpRequest();
        if(opt.delay > 0){
            setTimeout(()=>{
                xmlReq.open(opt.method,opt.url,opt.async)
                //判断超时
                this.isTimeout(opt.timeout,xmlReq)
                xmlReq.onreadystatechange(function(){
                    if(xmlReq.status === 200 && xmlReq.readyState === 4){
                        opt.success(xmlReq.responseText);
                    }
                })
            },opt.delay)
        }

    },
    isTimeout(time,xmlReq){
        let timeout = setTimeout(()=>{
            xmlReq.abort()
        },time)
    }
}