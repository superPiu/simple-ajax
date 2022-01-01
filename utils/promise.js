const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
class Promise {
    constructor(executor){//执行器默认立即执行
        this.status = PENDING
        this.val = undefined
        this.reason = undefined
        this.onfulfilledCallbacks = []
        this.onrejectedCallbacks = []
        let resolve = (val) => {
            if(this.status === PENDING){
                this.status = RESOLVED
                this.val = val
                this.onfulfilledCallbacks.forEach(fn=>{
                    fn(this.val)
                })
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING){
                this.status = REJECTED
                this.reason = reason
                this.onrejectedCallbacks.forEach(fn=>{
                    fn(this.val)
                })
            }
        }
        try {
            executor(resolve,reject)
        }catch (e){
            reject(e)
        }
    }
    handlePromise(promise2,x,resolve,reject){
        if(promise2 === x){
            reject(new TypeError('循环引用'))
        }
        if(x && typeof x === 'object' || typeof x === 'function'){
            try{
                let then = x.then
                if(typeof then === 'function'){
                    then.call(x,(y)=>{
                        this.handlePromise(promise2,y,resolve,reject)
                    },(r)=>{
                        reject(r)
                    })
                }else{
                    resolve(x)
                }
            }catch (e){
                reject(e)
            }
        }else{
            resolve(x)
        }
    }
    then(onfulfilled,onrejected){
        let promise2 = new Promise((resolve, reject)=>{
            setTimeout(()=>{//延迟执行保证promise2能取到
                try{
                    if(this.status === RESOLVED){
                        let x = onfulfilled(this.val)
                        this.handlePromise(promise2,x,resolve,reject)
                    }else if(this.status === REJECTED){
                        let x = onrejected(this.val)
                        this.handlePromise(promise2,x,resolve,reject)
                    }else if(this.status === PENDING){
                        this.onfulfilledCallbacks.push(()=>{
                            let x = onfulfilled(this.val)
                            this.handlePromise(promise2,x,resolve,reject)
                        })
                        this.onrejectedCallbacks.push(()=>{
                            let x = onrejected(this.reason)
                            this.handlePromise(promise2,x,resolve,reject)
                        })
                    }
                } catch (e) {
                    reject(e)
                }
            },0)
        })
        return promise2
        // if(this.status === PENDING){//异步执行状态还没有改变,将回调函数保存起来
        //     this.onfulfilledCallbacks.push(()=>{
        //         onfulfilled(this.val)
        //     })
        // }
        // if(this.status === RESOLVED){
        //     onfulfilled(this.val)
        // }
        // if(this.status === REJECTED){
        //     onrejected(this.reason)
        // }
    }
    catch(onrejected){
        return this.then(undefined,onrejected)
    }
    //返回一个以给定值解析后的Promise对象
    static resolve(value){
        if(value && typeof value.then === 'function') return value
        return new Promise((resolve,reject)=>{
            return resolve(value)
        })
    }
    //返回一个带有拒绝原因的Promise对象
    static reject(reason){
        if(value && typeof value.then === 'function') return reason
        return new Promise((resolve,reject)=>{
            return reject(reason)
        })
    }
    static all(promises){
        return new Promise((resolve,reject)=>{
            const result = [];
            let index = 0;
            for(let i = 0; i < promises.length; i++){
                const item = promises[i]
                Promise.resolve(item).then((val)=>{
                    result[i] = val
                    if(++index == promises.length){
                        resolve(result)
                    }
                },(reason)=>{
                    reject(reason)
                })
                
            }
        })
    }
    static race(promises){
        return new Promise((resolve,reject)=>{
            for(let i = 0; i < promises.length; i++){
                const item = promises[i]
                Promise.resolve(item).then((val)=>{
                    resolve(val)
                },(reason)=>{
                    reject(reason)
                })
                
            }
        })
    }
}
module.exports = Promise