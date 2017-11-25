$(document).ready(function () {
    showqr();
    showcourse();
});

function showcourse() {
    return;
    var c = document.getElementById("c");
    c.innerHTML = 
'<div class="paper_list_small"><h2><font color="red">免费零基础入门课程</font><a href="#" target="_blank"></a></h2><ul style=" background-image:url()">'+
'<li><a href="/paper/zyxz/course/course_c.aspx" target="_blank">C语言编程入门</a></li>'+
'<li><a href="/paper/zyxz/course/course_cpp.aspx" target="_blank">C++语言零基础入门</a></li>'+
'<li><a href="/paper/zyxz/course/course_windows.aspx" target="_blank">Windows零基础入门</a></li>'+
'<li><a href="/paper/zyxz/course/course_linux_shell.aspx" target="_blank">Linux的Shell编程零基础入门</a></li>'+
'<li><a href="/paper/zyxz/course/course_qt.aspx" target="_blank">QT零基础入门</a></li>' +
'<li><a href="/paper/zyxz/course/course_opencv.aspx" target="_blank">OpenCV零基础入门</a></li></ul></div><div class="paper_list_small">'+
'<h2><font color="red">小额赞助免费课程(支付宝:18972143253)</font><a href="#" target="_blank"></a></h2>'+
'<a href="/user/list.aspx" target="_blank">查看最新捐赠列表</a></div>';

}
function showqr() {
    return;
    var qr = document.getElementById("qr");
    qr.innerHTML =
'<div style="margin:0px;width:100%;padding:0px;">' +
'关注微信号，回复“干货”获取干货下载地址（干货即项目源码哦！）或者登陆个人中心下载<br/>' +
'<img src="/image/global/qr.jpg" alt="扫一扫微信公众号:cpp_coder，小白变大神哦~" title="扫一扫微信公众号:cpp_coder，小白变大神哦~"/>' +
'<img src="/image/global/donate.jpg" alt="扫码大力支持网站原创精品文章建设。" title="扫码大力支持网站原创精品文章建设。"/>' +
'<img src="/image/global/cjjjs.jpg" alt="扫码加入C++技术网QQ群，一起学习。" title="扫码加入C++技术网QQ群，一起学习。"/></div>';
}