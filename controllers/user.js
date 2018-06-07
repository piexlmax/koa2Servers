const fn_hellow = async (ctx,next)=>{
    let name = ctx.params.name
    ctx.body =`<h1>Hello,${name}!</h1>`
  }
  
  
module.exports = {
    'GET/hello/:name': fn_hellow
}