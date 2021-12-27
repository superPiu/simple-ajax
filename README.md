# 自定义封装Ajax
参考jQuery Ajax 尝试自己封装一下:

* 新增支持 delay 延迟发送请求


### 参数设置
#### url
* 类型：String
* 默认值: 当前页地址。发送请求的地址。

#### async
* 类型：Boolean
* 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
* *注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。

#### data

* 类型：String/Object
* 发送到服务器的数据。支持字符串形式和对象形式ajax将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。

### dataType

* 类型：String
* 预期服务器返回的数据类型。服务器端返回的数据会根据这个值被解析后，传递给回调函数。

### delay

* 类型：Number
* 延迟发送请求单位为毫秒数。

### timeout

* 类型：Number
* 超时设置,单位为毫秒数。

### success

* 类型：Function
* 请求成功调用的方法。

### success

* 类型：Function
* 请求失败调用的方法。