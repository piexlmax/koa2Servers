/*
made by QM.奇淼
2018/06/07 14：00
*/
const fs = require('fs');
// 路由 方法

const addMapping = (router,mapping)=>{
    for(var url in mapping){
       if(url.startsWith('GET')){
         let path ='/api'+ url.substring(3)
         router.get(path,mapping[url])
         console.log(`register URL mapping: GET ${path}`)
       }else if(url.startsWith('POST')){
         let path ='/api'+ url.substring(4)
         router.post(path,mapping[url])
         console.log(`register URL mapping: POST ${path}`)
       }else{
         console.log(`invalid URL: ${url}`);
       }
   }
}

// 获取控制器并且内部调用写好的路由方法
const addControllers = (router,dir)=>{
   let controller = fs.readdirSync(__dirname+"/"+dir)
   let js_file = controller.filter(item=>item.endsWith('.js'))
   js_file.map(item=>{
     console.log(`process controller: ${item}...`)
     let mapping = require(__dirname+`/${dir}/` + item)
     // 路由方法
     console.log(mapping)
     addMapping(router,mapping)
   })
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};