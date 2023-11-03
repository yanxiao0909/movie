// 引入setting.ts
import COUNTRY from './setting.js'

try{
	var title1 = document.createElement("title");
	title1.innerText = COUNTRY.title
	
	var link1 = document.createElement("link");
	link1.rel = "icon";
	link1.href = COUNTRY.icon; //icon 图标
	
	var meta1 = document.createElement("meta");
	meta1.name = "application-name"
	meta1.content = COUNTRY.title
	
	var meta2 = document.createElement("meta");
	meta2.name = "apple-mobile-web-app-title"
	meta2.content = COUNTRY.title
	
	
	var link2 = document.createElement("link");
	link2.rel = "apple-touch-icon-precomposed"
	link2.size = "120x120"
	link2.href = COUNTRY.icon
	
	var meta3 = document.createElement("meta");
	meta3.name = "apple-mobile-web-app-capable"
	meta3.content = "yes"
	
	document.getElementsByTagName("head")[0].appendChild(title1);
	document.getElementsByTagName("head")[0].appendChild(link1);
	document.getElementsByTagName("head")[0].appendChild(meta1);	
	document.getElementsByTagName("head")[0].appendChild(meta2);
	document.getElementsByTagName("head")[0].appendChild(link2);
	document.getElementsByTagName("head")[0].appendChild(meta3);
	document.getElementsByTagName('title')[0].innerHTML = COUNTRY.title
	document.getElementsByTagName('title')[1].innerHTML = COUNTRY.title
}catch(e){
	//TODO handle the exception
}
	