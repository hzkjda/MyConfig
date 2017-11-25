//高亮代码关键词
function getElementsClass(classnames){ 
var classobj= new Array();//定义数组 
var classint=0;//定义数组的下标 
var tags=document.getElementsByTagName("*");//获取HTML的所有标签 
for(var i in tags)
{//对标签进行遍历 
	if(tags[i].nodeType==1)
	{//判断节点类型 
		if(tags[i].getAttribute("class") == classnames)//判断和需要CLASS名字相同的，并组成一个数组 
		{ 
			classobj[classint]=tags[i]; 
			classint++; 
		} 
	} 
} 
return classobj;//返回组成的数组 
}
$(document).ready(function () {

    var keywords_c_space = ["auto", "char", "const", "double", "enum", "extern", "float", "int", "long", "register", "return", "short", "unsigned", "signed", "static", "struct", "typedef", "union", "void", "volatile", "case", "bool", "FILE"];
    var keywords_c_nospace = ["break", "continue", "default", "do", "else", "for", "goto", "if", "sizeof", "switch", "while", "include"];
    var keywords_win_space = ["WCHAR", "TCHAR", "CHAR", "BYTE", "USHORT", "SHORT", "DWORD", "WORD", "UINT", "INT", "ULONG", "LONG", "CONST", "PWSTR", "PTSTR", "LPSTR", "LPWSTR", "LPTSTR", "LPCSTR", "LPCWSTR", "LPCTSTR", "PSTR", "LPVOID",
"HWND", "HDC", "HMENU", "WPARAM", "LPARAM", "RECT", "PAINTSTRUCT", "COLORREF", "HBRUSH", "HPEN", "HINSTANCE", "MSG", "WNDCLASS", "POINT", "LRESULT"
];
    var keywords_win_nospace = ["TRUE", "FALSE", "NULL"];
    if (GetCookie("user_id") == null) return;

    var objs = getElementsClass("prettyprint lang-cpp");
    for (var oi = 0; oi < objs.length; oi++) {
        var divText = objs[oi].innerHTML;
        divText = divText.replace(/\r\n/ig, " <br/>");
        divText = divText.replace(/\n/ig, " <br/>");
        //需要空格的
        for (var i = 0; i < keywords_c_space.length; i++) {
            divText = divText.replace(new RegExp(keywords_c_space[i] + ' ', "g"), "<font@color=#0000ff>" + keywords_c_space[i] + ' ' + "</font>");
        }
        for (var i = 0; i < keywords_win_space.length; i++) {
            divText = divText.replace(new RegExp(keywords_win_space[i] + ' ', "g"), "<font@color=#107c10>" + keywords_win_space[i] + ' ' + "</font>");
        }
        //不需要空格的
        for (var i = 0; i < keywords_c_nospace.length; i++) {
            divText = divText.replace(new RegExp(keywords_c_nospace[i], "g"), "<font@color=#0000ff>" + keywords_c_nospace[i] + "</font>");
        }
        for (var i = 0; i < keywords_win_nospace.length; i++) {
            divText = divText.replace(new RegExp(keywords_win_nospace[i], "g"), "<font@color=#107c10>" + keywords_win_nospace[i] + "</font>");
        }
        divText = divText.replace(/ /ig, "&nbsp;");
        divText = divText.replace(/@/ig, " ");
        objs[oi].innerHTML = divText;
    }
});