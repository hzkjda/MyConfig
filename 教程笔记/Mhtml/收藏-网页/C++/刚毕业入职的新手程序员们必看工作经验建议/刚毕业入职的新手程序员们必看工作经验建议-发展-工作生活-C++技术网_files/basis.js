/*
*	返回顶部代码
*/
$(function () {
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#back-to-top").fadeIn(800);
            }
            else {
                $("#back-to-top").fadeOut(800);
            }
        });

        //当点击跳转链接后，回到页面顶部位置

        $("#back-to-top").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 800);
            return false;
        });
    });
});
/*
*	搜索代码
*/
function search() {
    var typeid = document.getElementById("SearchType").value.valueOf();
    var gotoUrl = "";
    var url = "/module/search/search.aspx?key=";
    var strKeyWord = document.getElementById("key_word").value;
    var reserve1 = "请输入文章标题关键词,空格分隔多个";
    var reserve2 = "请输入书籍名称，可以模糊匹配";
    var reserve3 = "请输入搜索作者名称";

    if (strKeyWord == "" || strKeyWord == reserve1 || strKeyWord == reserve2 || strKeyWord == reserve3) {
        alert("提示：请输入关键词！");
        return false; //编辑框的关键字
    }

    var search_keyword = ""; //URL的关键字
    search_keyword = strKeyWord.replace(/\+/g, "%2b");
    switch (parseInt(typeid)) {
        case 0: //文章
            url = "/module/search/search.aspx?pn=";
            break;
        case 1: //书籍
            url = "/module/search/searchbook.aspx?bn=";
            gotoUrl = url + search_keyword;
            window.open(gotoUrl, '_blank'); //执行跳转搜索
            return;
        case 2: //作者
            url = "/module/search/search.aspx?un=";
            gotoUrl = url + search_keyword;
            window.open(gotoUrl, '_blank'); //执行跳转搜索
            return;
    }
    gotoUrl = url + search_keyword;
    window.open(encodeURI(gotoUrl), '_blank'); //执行跳转搜索
    window.event.returnValue = false;
}

var sel = "";
function ModeChangeTip() {
    var keyword = document.getElementById("key_word");
    keyword.style.color = "#777777";
    var reserve1 = "请输入文章标题关键词,空格分隔多个";
    var reserve2 = "请输入书籍名称，可以模糊匹配";
    var reserve3 = "请输入搜索作者名称";

    switch (document.getElementById("SearchType").selectedIndex) {
        case 0: //文章
            keyword.value = reserve1;
            sel = keyword.value;
            break;
        case 1: //书籍
            keyword.value = reserve2;
            sel = keyword.value;
            return;
        case 2: //作者
            keyword.value = reserve3;
            sel = keyword.value;
            break;
    }
}

function KeyFocus() {
    var reserve1 = "请输入文章标题关键词,空格分隔多个";
    var reserve2 = "请输入书籍名称，可以模糊匹配";
    var reserve3 = "请输入搜索作者名称";
    var keyword = document.getElementById("key_word");
    if (keyword.value == reserve1 || keyword.value == reserve2 || keyword.value == reserve3) {
        keyword.style.color = "#000000";
        keyword.value = "";
    }
}
function KeyBlur() {
    var reserve1 = "请输入文章标题关键词,空格分隔多个";
    var reserve2 = "请输入书籍名称，可以模糊匹配";
    var reserve3 = "请输入搜索作者名称";

    var keyword = document.getElementById("key_word");
    if (keyword.value == reserve1 || keyword.value == reserve2 || keyword.value == reserve3) {
        keyword.style.color = "#777777";
    }
    else if (keyword.value == "") {
        keyword.style.color = "#777777";
        if (sel == "") {
            ModeChangeTip();
        }
        else {
            keyword.value = sel;
        }
    }
    else {
        keyword.style.color = "#000000";
    }

}
function KeyChange() {
    var reserve1 = "请输入文章标题关键词,空格分隔多个";
    var reserve2 = "请输入书籍名称，可以模糊匹配";
    var reserve3 = "请输入搜索作者名称";

    var keyword = document.getElementById("key_word");
    if (keyword.value == reserve1 || keyword.value == reserve2 || keyword.value == reserve3) {
        keyword.style.color = "#777777";
    }
    else {
        keyword.style.color = "#000000";
        tip = keyword.value;
    }
}
/*
 *	js操作缓存代码
 */
/** 获取COOKIE */
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
/** 设置COOKIE */
function SetCookie(name, value) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value)
         + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
         + ((path == null) ? "path=/" : ("; path=" + path))
         + ((domain == null) ? "" : ("; domain=" + domain))
         + ((secure == true) ? "; secure" : "");
}
/* 评论设置使用的*/
function SetCookieByComment(name, value) {
    var argv = SetCookieByComment.arguments;
    var argc = SetCookieByComment.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value)
         + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
         + ((path == null) ? "" : ("; path=" + path))
         + ((domain == null) ? "" : ("; domain=" + domain))
         + ((secure == true) ? "; secure" : "");
}
/** 删除COOKIE */
function DeleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = 0;
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + ";path=/";
}
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
/*
 *	提示框
 */
//关闭等待窗口
function closediv() {
    //Close Div 
    document.body.removeChild(document.getElementById("bgDiv"));
    document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));
    document.body.removeChild(document.getElementById("msgDiv"));
}
//显示等待窗口
function showdiv(heightAdd, str) {
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow: hidden;");
    var msgw, msgh, bordercolor;
    msgw = 400; //提示窗口的宽度 
    msgh = 100; //提示窗口的高度 
    bordercolor = "#336699"; //提示窗口的边框颜色 
    titlecolor = "#99CCFF"; //提示窗口的标题颜色 

    var sWidth, sHeight;
    sWidth = document.body.clientWidth;
    sHeight = document.body.clientHeight + heightAdd;

    var bgObj = document.createElement("div");
    bgObj.setAttribute('id', 'bgDiv');
    bgObj.style.position = "absolute";
    bgObj.style.top = "0";
    bgObj.style.background = "#777";
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity = "0.6";
    bgObj.style.left = "0";
    bgObj.style.width = sWidth + "px";
    bgObj.style.height = sHeight + "px";
    document.body.appendChild(bgObj);
    var msgObj = document.createElement("div")
    msgObj.setAttribute("id", "msgDiv");
    msgObj.setAttribute("align", "center");
    msgObj.style.position = "absolute";
    msgObj.style.background = "white";
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.border = "1px solid " + bordercolor;
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.top = (window.screen.availHeight / 2 + 300) + "px";
    msgObj.style.left = (sWidth - msgw) / 2 + "px";
    var title = document.createElement("h4");
    title.setAttribute("id", "msgTitle");
    title.setAttribute("align", "right");
    title.style.margin = "0";
    title.style.padding = "3px";
    title.style.background = bordercolor;
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity = "0.75";
    title.style.border = "1px solid " + bordercolor;
    title.style.height = "18px";
    title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color = "white";
    //title.style.cursor = "pointer";
    //title.innerHTML = "关闭";
    //title.onclick = closediv;
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt = document.createElement("p");
    txt.style.margin = "1em 0"
    txt.setAttribute("id", "msgTxt");
    txt.innerHTML = str;
    document.getElementById("msgDiv").appendChild(txt);
    document.body.onmousewheel = function () { return; }
}
//屏蔽F5
document.onkeydown = mykeydown;
function mykeydown() {
    if (event.keyCode == 116) //屏蔽F5刷新键   
    {
        window.event.keyCode = 0;
        return false;
    }
}
/*
 *	复制文章和切换列表
 */
function show(index, count) {

    for (var i = 1; i <= count; i++) {
        if (i == index) {
            document.getElementById('id_content_' + i).setAttribute("class", "");
            document.getElementById('list_' + i).setAttribute("class", "sel");
        } else {
            document.getElementById('id_content_' + i).setAttribute("class", "hide");
            document.getElementById('list_' + i).setAttribute("class", "");
        }
    }
}

function addFavorite() {
    var title = "C++技术网";
    var url = "http://www.cjjjs.com";
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

function GetBodyText(id) {
    if (navigator.appName.indexOf("Explorer") > -1)
        return document.getElementById(id).innerText;
    else
        return document.getElementById(id).textContent;
}
function CopyBodyHTML() {
    var AddContent = "<br/>本内容来源：<a href='http://www.cjjjs.com' target='_blank'>C++技术网</a>，阅读更多原创精品文章，欢迎访问C++技术网。<br/>本文地址：<a href='" + window.location.href + "' target='_blank'>查看原文</a><br/>";
    window.clipboardData.setData("text", AddContent + document.getElementById("id_paper_body").innerHTML + AddContent);
    alert("文章格式化内容已经复制到剪切板！");
}
function CopyURL() {
    window.clipboardData.setData("text", window.location.href);
    alert("文章地址已经复制到剪切板！");
}
/*
 *	基本代码
 */
function obj(a1,a2)  //a2为类时必须带前缀 .
{
	switch(arguments.length){
		case 1://基础选择器 标签、id、类
			switch(a1.charAt(0)){
				case '#':
					return document.getElementById(a1.substring(1));
				break;
				//只能一个类
				case '.':
					return getByClass(document,a1.substring(1));
				break;
				//只能一个标签
				//可以采取 NodeType来判别
				default:
					var oc=[];
					var otags = document.getElementsByTagName('body')[0].getElementsByTagName(a1);
					for(var i=0;i<otags.length;i++){
						oc.push(otags[i]);
					};
					return oc;
					break;
			};
		break;
		case 2:
			//a1为对象时
			switch(typeof a2)
			{
				case 'string':
					switch(a2.charAt(0))
					{
						case '.':return getByClass(a1,a2.substring(1));break;
						default:
							var oc = [];
							var otags = a1.getElementsByTagName(a2);
							for(var i=0;i<otags.length;i++)
							{
								oc.push(otags[i]);
							};
							return oc;
						break;
					}
				break;
				default:break;
			}
		break;
		default:break;
	};
}
function getByClass(oParent,sClass)//解决了一个标签有多个类的问题c sClass为一个类 
{	
	var tags = oParent.getElementsByTagName('*');
	var aResult=[];
	//匹配 类中是否有 :
	if(sClass.search(':')==-1)//没有过滤操作 ：
	{
		for(var i=0;i<tags.length;i++){
			var classArr = str2arr(tags[i].className);
			for(var j=0;j<classArr.length;j++){
				if(classArr[j]==sClass){
					aResult.push(tags[i]);
					break;
				};
			};
		};
		return aResult;
	}
	else //有过滤操作 ：
	{
		var oterm = sClass.split(':')[1];
		sClass=sClass.split(':')[0];
		switch(oterm)//：even/first/last/odd/eq/arr
		{
			case 'even'://此路径已测试：成功
				for(var i=0;i<tags.length;i+=2)
				{
					var classArr = str2arr(tags[i].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[i]);
							break;
						}
					};
				};
				return aResult;
			break;
			case 'odd'://此路径已测试：成功
				for(var i=1;i<tags.length;i+=2)
				{
					var classArr = str2arr(tags[i].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[i]);
							break;
						}
					};
				};
			break;
			case 'first'://此路径已测试：成功
				if(tags.length>0)
				{
					var classArr = str2arr(tags[0].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[0]);
							break;
						}
					}
				}
			break;
			case 'last'://此路径已测试：成功
				if(tags.length>0)
				{
					var classArr = str2arr(tags[tags.length-1].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[tags.length-1]);
							break;
						}
					}
				}
			break;
			default:
				var n = oterm.match(/\d+/g);
				switch(oterm.charAt(0))
				{
					case 'e'://此路径已测试：成功
						if(tags.length>n)//1 -> 0
						{
							var classArr = str2arr(tags[n].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[n]);
									break;
								}
							}
						}
					break;//eq(n) 等于n
					case 'l'://此路径已测试：成功
						for(var i=0;i<n;i++)
						{
							var classArr = str2arr(tags[i].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[i]);
									break;
								}
							};
						};
					break;//lt(n) 小于n n比tags.length大时 出错
					case 'g'://此路径已测试：成功
						for(var i=n;i<tags.length;i++)
						{
							var classArr = str2arr(tags[i].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[i]);
									break;
								}
							};
						};
					break;//gt(n) 大于n n 小于0时 出错
					case 'a'://此路径已测试：成功
						n=n.sort();
						for(var i=0;i<n.length;i++)
						{
							if(i<tags.length)
							{
								var classArr = str2arr(tags[n[i]-0].className);
								for(var j=0;j<classArr.length;j++)
								{
									if(classArr[j]==sClass)
									{
										aResult.push(tags[n[i]-0]);
										break;
									}
								}
							}
						}
					break;//array(-,-,-,...) 数组
					default:break;
				}
			break;
		}
		return aResult;
	}
}
function hasClass(obj,sclass)//这里的sclass参数中不能有空格
{
	var all=str2arr(obj.className);
	for(var i=0;i<all.length;i++)
	{
		if(all[i]==sclass)
			return true;
	};
	return false;
}
function addClass(obj,sclass)//可同时添加多个class 中间用空格分开
{
	var all = str2arr(obj.className);
	var adding = str2arr(sclass);
	all=all.concat(adding);
	obj.className = all.join(' ');
}
function removeClass(obj,sclass)//可同时移除多个class
{
	var all = str2arr(obj.className);
	var deleting = str2arr(sclass);
	for(var i=0;i<all.length;i++)
	{
		for(var j=0;j<deleting.length;j++)
		{
			if(all[i]==deleting[j])
				all[i]='';
		};
	};
	obj.className=all.join(' ');
}
function str2arr(str)//以空格为界限，将字符串转为数组
{
	var strArr="";
	var z=true;
	var arr=[];
	for(var i=0;i<str.length;i++)
	{
		if(str.charAt(i)==' ')
		{
		//刚从 有字符到空格
			if(z==false)
			{
				strArr+='=';
				z=true;
			}
			else
				continue;
		}
		else
		{
			z=false;
			strArr+=str.charAt(i);
		}		
	};
	arr = strArr.split('=');
	return arr;
}
function css(obj,attr,oval)//  获取样式/设置多个样式
{	
/*
JS中style属性
现在我需要对这个标签赋值，其内容为： 
1、需要显示的字为“HELLO WORLD”； 
2、span的 background-color : red ，另外还要：border:1px solid #333333;cursor:hand; 
我需要在<script></script>内把他们赋值，请问怎么写呢？难道要： 
document.getElementById("a").style.background="red"; 来一项一项的写？ 
能不能一下子把style写完啊，怎么写啊？ 
解决办法：
1、先定义一个CSS规则，然后this.className=''
2、document.getElementById("a").style.cssText="border-collapse:collapse;border-spacing:1;border:1 solid #0B2565;background-color:white;color:black;"

 

JS操作css的float属性的特殊写法
使用js操作css属性的写法是有一定的规律的：

1、对于没有中划线的css属性一般直接使用style.属性名即可。
如：obj.style.margin，obj.style.width，obj.style.left，obj.style.position等。

2、对于含有中划线的css属性，将每个中划线去掉并将每个中划线后的第一个字符换成大写即可。
如：obj.style.marginTop，obj.style.borderLeftWidth，obj.style.zIndex，obj.style.fontFamily等。

这个规律我想大多数的前端开发者也都熟知。但在css中有一个特殊的属性其js使用方法比较特殊。
这个特殊的属性就是:float。我们不能直接使用obj.style.float来使用，这样操作是无效的。

其正确的使用方法是为：IE:obj.style.styleFloat，其他浏览器:obj.style.cssFloat。
*/
	if(arguments.length==2){
		if(typeof attr=='string')
		{
			if(obj.currentStyle)
				return obj.currentStyle[attr];
			else
				return getComputedStyle(obj,false)[attr];
		}
		else
		{
			for(var i='' in attr)
			{
				if(i=='opacity')
				{
					obj.style[i]=attr[i];
					obj.style['filter']=(attr[i]*100).toFixed(0);
				}
				else
					obj.style[i]=attr[i];
				
			}
		}
	}
	//  设置单个样式
	else
	{
		if(attr=='opacity')
		{
			obj.style['filter']='alpha(opacity='+oval*100+')';
		}
		obj.style[attr]=oval;
	}
}
function attr(obj,attr,oval)
{
	// 获取单个属性/设置多个属性
	// name 等 关键字、保留字不能作为属性 不然会出问题
	if(arguments.length==2)
	{
		if(typeof attr=='string')
			return obj.attributes[attr].value;
		else
		{
			for(var i='' in attr)
				obj.attributes[i].value=attr[i];
		}
	}
	//设置单个属性
	else
		obj.attributes[attr].value=oval;
}
function removeAttr(obj,arg)
{
	switch(typeof arg)
	{
		case 'string':
			if(obj.removeAtrribute)//为什么不行？
				obj.removeAtrribute(arg);
			else
				console.log('error');
		break;
		default:
			for(var k='' in arg)
			{
				obj.removeAttribute(arg[k]);
			}
		break;
	}
}
function sports(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(
		function(){
			var bStop=true;//这一次运动就结束了——所有的值都到达了
			for(var attr='' in json){
				//1.取当前的值
				var iCur=0;
				if(attr=='opacity')
					iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
				else
					iCur=parseInt(getStyle(obj, attr));
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3.停止检测
			if(iCur!=json[attr])
				bStop=false;
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
				obj.style[attr]=iCur+iSpeed+'px';
		};
			if(bStop)
			{
				clearInterval(obj.timer);
				if(fn)
					fn();
			}
		},30);
}
var EventInit = {
        addEvent : function(obj, type, fn) {  
            var handler = fn;
            if (obj.addEventListener) { //ff 
                obj.addEventListener(type, handler, false);  
            } 
			else if (obj.attachEvent) {  //ie
				handler=function(e){
					fn.call(obj);
				};
                obj.attachEvent('on' + type, handler);  
            }  
        },
		delEvent : function(obj,type,fn)
		{
			if(obj.removeEventListener)
			{
				obj.removeEventListener(type,fn,false);
			}
			else
			{
				if(obj.detachEvent)
				{
					obj.detachEvent('on'+type,fn);
				}
			}
		}
};

//document.onkeydown = function(evt)
//{
//	evt = (evt) ? evt : window.event;
//	//屏蔽ctrl+U 禁止查看源代码
//	if(evt.ctrlKey && evt.keyCode==85)
//	{
//		if(evt.preventDeault)
//			evt.preventDeault();
//		else
//			evt.returnValue=false;
//		return false;
//	}
//	//阻止F12
//	if(evt.keyCode==123)
//	{
//		if(evt.preventDeault)
//			evt.preventDeault();
//		else
//			evt.returnValue=false;
//		return false;
//	}
//	
//}

//document.oncontextmenu = function(e) {
//	return false;//阻止右键菜单
//}

//document.onkeydown = function(){ 
//	if (event.ctrlKey && window.event.keyCode==67){ 
//	    return false; // - 阻止Ctrl+C
//	}
//}

//document.onselectstart = function(){ 
//    return false; // - 阻止选择
//}


//document.ondragstart = function () {
//    return false;
//};

//document.onbeforecopy = function () {
//    return false;
//};
//document.onselect = function () {
//    document.selection.empty();
//};
//document.oncopy = function () {
//    document.selection.empty();
//};


