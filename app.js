"use strict";

var koa = require('koa2');
var http = require('http');
var https = require('https');
var fs = require('fs');
var enforceHttps = require('koa-sslify');

var app =new koa();

// Force HTTPS on all page
app.use(enforceHttps());

// index page
const main = async (ctx,req) => {
  ctx.body = "hello world";
}
app.use(main);

// SSL options
var options = {
    key: fs.readFileSync('./ssl/henrongyi.top.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/henrongyi.top.cer')  //ssl文件路径
};

// start the server
http.createServer(app.callback()).listen(80);

https.createServer(options, app.callback()).listen(443);


//
console.log('https server is running');