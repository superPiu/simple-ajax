const path = require('path')    //引入元素模块
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')    //先需要安装模块yarn add --dev html-webpack-plugin，再引入
module.exports = {
    mode:"development",
    // entry:'./src/one.js',   //入口文件的路径，引入单文件
    // entry:["./src/one.js","./src/two.js"],      //多入口，单出口
    entry:"./index.js",
    output:{    //规定了webpack的出口文件
        // path:path.join(__dirname,'dist'),   //与该文件同级的当前目录，找到当前文件夹
        // path:path.join(__dirname,'../dist'),    //若将改文件放在了别的目录内，就会使打包后的把文件也与此同级，所以给打包的文件指定一个路径
        path:path.join(process.cwd(),"dist"),    //与上面的效果一样，代表的意思是在node进程的目录（当前执行node命令时候的文件夹地址）

        // filename:'one.js'   //重新命名的文件名,单出口
        // filename:'[name].[hash:6].js'    //多出口,（可加后缀并限制长度），当文件没更改的时候是不会重新生成文件的
        filename:'[name].[chunkhash:6].js'  //更改单个文件内容后会指定将更改的文件进行重新打包（默认所有重新打包）
    },
    plugins:[   //直接在打包好的文件中生成一个index.html文件，并自动将其他的文件引入到该html中
        new HtmlWebpackPlugin({
            title:"ajax",     //在html文件中设置<title><%= htmlWebpackPlugin.options.title %></title>，可以将标题名字传入给html
            template:"./index.html"  //可以指定该html模板为打包好的html文件，并可以将其他的js文件自动引入进去，路径从根目录开始
        }),
        new webpack.BannerPlugin('版权归牛XX公司所有')

    ],
    target: 'web',
    devServer:{		//内部集成了 http-proxy-middlerware
        open:true,  //默认自动打开浏览器
        port:8009 
        //proxy:{}  //前端正向代理      后续项目上线打包nginx的反向代理
    }
}
