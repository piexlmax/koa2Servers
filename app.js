"use strict";

const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const enforceHttps = require('koa-sslify');
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
const app =new Koa();
const controller = require('./controller');
// Force HTTPS on all page
app.use(enforceHttps());
app.use(bodyParser());

//log
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

// router  with controller
app.use(controller());

// SSL options
var options = {
    key: fs.readFileSync('./ssl/henrongyi.top.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/henrongyi.top.cer')  //ssl文件路径
};

app.use(router.routes())
// start the server
http.createServer(app.callback()).listen(80);

https.createServer(options, app.callback()).listen(443);


//
console.log('https server is running');