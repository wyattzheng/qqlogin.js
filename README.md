# qqlogin.js
QQ网页登录获取cookies只要两行<br/>
var qqlogin=require("qqlogin");<br/>
qqlogin("QQ账号","QQ密码").then((results)=>{<br/>
console.log(results);<br/>
});<br/>
或者<br/>
(async ()=>{<br/>
<br/>
var qqlogin=require("qqlogin");
var results=await qqlogin("QQ账号","QQ密码");<br/>
<br/>
})();<br/>
