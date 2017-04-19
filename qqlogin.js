var net=require("zhynet.js");
var qqrsa=require("./qqrsa.js");
var loginsig="xiZxkDUforw0tCgxtXwxayR*GniKvthKM0WiwiNJiD4TjdQuFhhzeQok7Wy2VgEs";
function g_tk(skey){
	let base=5381;let len=skey.length;
	for(let i=0;i<len;i++){
		base+=(base<<5)+skey.charCodeAt(i);
	}
	return (base&2147483647)+"";
}
var qqlogin=(qq,pswd)=>{//promise will return cookies when success
return new Promise((yes,no)=>{
let Net=new net();
let nm="";
Net.get(
	"http://check.ptlogin2.qq.com/check?regmaster=&pt_tea=1&uin="+qq+"&appid=715030901&js_ver=10114&js_type=1&login_sig="+loginsig+"&u1=http%3A%2F%2Fqun.qq.com%2F&r=")
.then((res)=>{
let tmparr=net.substr(res,"ptui_checkVC(","');").split(",");
		let verCode=net.substr(tmparr[1],"'","'");
		let salt=""+qq+"";
		let verifysession_v1=net.substr(tmparr[3],"'","'");
		let encryptedpw=qqrsa.getEncryption(pswd,salt,verCode,"");
return Net.get("http://ptlogin2.qq.com/login?u="+qq+"&p="+encodeURIComponent( encryptedpw)+"&verifycode="+verCode+"&aid=715030901&u1=http%3A%2F%2Fqun.qq.com%2F&h=1&ptredirect=1&ptlang=2052&daid=73&from_ui=1&dumy=&low_login_enable=0&regmaster=&fp=loginerroralert&action=5-16-1426352948143&mibao_css=&t=1&g=1&js_ver=10114&js_type=1&login_sig="+loginsig+"&pt_uistyle=17&pt_randsalt=0&pt_vcode_v1=0&pt_verifysession_v1="+verifysession_v1);
})
.then((res)=>{
	if(res.indexOf("登录成功！")==-1){no(res);return;}
	let sigurl=net.substr(res,"ptuiCB('0','0','","','");
	nm=net.substr(res,"','登录成功！', '","');");
	return Net.get(sigurl);
})
.then((res)=>{
	let cookies=Net.getCookies();
	let sk=net.substr(cookies,"skey=",";");
	let pk={
		cookies:cookies,
		name:nm,
		skey:sk,
		gtk:g_tk(sk)
	};
	yes(pk);
})
;
	
});
}/*
qqlogin("854185073","XXXXXX").then((results)=>{
	console.log(results);
});*/

module.exports = qqlogin;
