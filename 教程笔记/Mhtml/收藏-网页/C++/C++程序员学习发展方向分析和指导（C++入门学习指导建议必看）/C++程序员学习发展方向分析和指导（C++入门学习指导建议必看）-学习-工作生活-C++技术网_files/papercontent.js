$(document).ready(function () {
    $('#id_paper_body').addClass('paper_body_normal paper_body_bkcolor_white');
    var font_class = $('#id_paper_body').attr('class').split(' ')[0];
    var bkclor_class = $('#id_paper_body').attr('class').split(' ')[1];
    $('a').click(function (event) {
        /* Act on the event */
        $('#id_paper_body').removeClass();
        $('.paper_style_control a').css("fontWeight", 'normal');
        $(this).css("fontWeight", 'bold');
        var addr = $(this).attr('id').split('_')[1];
        var class_tem = $(this).attr('id').split('_')[2];
        if (addr == "font") {
            font_class = 'paper_body_' + class_tem;
        } else {
            bkclor_class = 'paper_body_bkcolor_' + class_tem;
        }
        var class_main = font_class + ' ' + bkclor_class;

        $('#id_paper_body').addClass(class_main);
        var temp = $('#id_paper_body').attr('class');
    });
});

$(document).ready(function () {
    //未登录屏蔽代码
    //    $(function () {
    //        $.ajax({
    //            type: "POST",
    //            url: "/service/getPaperBody.ashx?id=" + GetPageName(),
    //            contentType: "application/json;charset=utf-8",
    //            dataType: "json",
    //            success: function (data) {
    //                if (data != null) {
    //                    $("#id_paper_body").html(data);
    //                }
    //            }, error: function (error) {
    //            }
    //        });
    //    });
    $(function () {
        var uid = GetCookie("user_id");
        if (uid == null) {
            $(".prettyprint").html("亲，<b><a href='/user/login.aspx'>点此登陆</a></b>，登录后就可以免费查看代码咯~");
        }
    });

    //赞和踩数量获取显示
    var btngood = $("#good");
    $.ajax({
        type: "POST",
        url: "/service/PaperGood.ashx?bq=1&id=" + GetPageName(),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data >= 0) {
                    btngood.text("赞(" + data + ")");
                }
            }
        }, error: function (error) {
        }
    });
    var btnbad = $("#bad");
    $.ajax({
        type: "POST",
        url: "/service/PaperBad.ashx?bq=1&id=" + GetPageName(),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data >= 0) {
                    btnbad.text("踩(" + data + ")");
                }
            }
        }, error: function (error) {
        }
    })
    //收藏数量
    var btnfavorite = $("#favorite");
    var uid;
    if (GetCookie("user_id") == null) {
        uid = 0;
    } else {
        uid = GetCookie("user_id");
    }
    $.ajax({
        type: "POST",
        url: "/service/PaperFavorite.ashx?bq=1&id=" + GetPageName() + "&uid=" + uid,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                var obj = jQuery.parseJSON(data);
                var count, isFav;
                $.each(obj, function (key, value) {
                    if (key == "count") count = value;
                    if (key == "IsFavorite") isFav = value;
                });
                if (isFav == 1) {
                    if (count >= 0) btnfavorite.text("已藏(" + count + ")");
                }
                else {
                    if (count >= 0) btnfavorite.text("藏(" + count + ")");
                }
            }
        }, error: function (error) {
        }
    })
});
function getjsonvalue(jsonObject, name) {
    var value = "";
    $.each(jsonObject, function (n, v) {
        if (name == n) {
            value = v;
            return false;
        }
    });
    return value;
}
//点赞
function good() {
    $(function () {
        var btn = $("#good");
        var txt = btn.text();
        if (0 == txt.indexOf("已赞")) {
            alert("您已经赞了!");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/service/PaperGood.ashx?bq=0&id=" + GetPageName(),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    if (data > 0) {
                        btn.text("已赞(" + data + ")");
                    }
                }
            }, error: function (error) {
            }
        });
    });
}
//点踩
function bad() {
    alert("不");
    alert("准");
    alert("踩");
    alert("不准踩！");
    return;
    $(function () {
        var btn = $("#bad");
        var txt = btn.text();
        if (0 == txt.indexOf("已踩")) {
            alert("您已经踩了!");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/service/PaperBad.ashx?bq=0&id=" + GetPageName(),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    if (data > 0) {

                        btn.text("已踩(" + data + ")");
                    }
                }
            }, error: function (error) {
            }
        });
    });
}
function favorite() {
    if (GetCookie("user_id") == null) {
        alert("您还未登录，无法收藏文章！");
        return;
    }
    var uid = GetCookie("user_id");

    $(function () {
        var btn = $("#favorite");
        var txt = btn.text();
        if (0 == txt.indexOf("已藏")) {
            alert("您已经收藏了!");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/service/PaperFavorite.ashx?bq=0&id=" + GetPageName() + "&uid=" + uid,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    var obj = jQuery.parseJSON(data);
                    var count, isFav;
                    $.each(obj, function (key, value) {
                        if (key == "count") count = value;
                        if (key == "IsFavorite") isFav = value;
                    });
                    if (isFav == 1) {
                        if (count >= 0) {
                            btn.text("已藏(" + count + ")");
                            alert("收藏的文章请在个人中心中查看");
                        }
                    }
                    else
                        if (isFav == -1 && count == -1) {
                            alert("收藏失败，普通用户一天只能收藏一篇文章。会员不受此限制，如需要请在【用户中心】开通会员。");
                        }
                    else {
                        if (count >= 0) {
                            btn.text("藏(" + count + ")");
                        }
                    }

                    
                }
            }, error: function (error) {
            }
        });
    });
}

function GetPageName() {
    var id = getQueryString("id");
    if (id != null)
        return id;

    var url = window.location.href;
    var tmp = new Array();
    tmp = url.split("/");
    var pp = tmp[tmp.length - 1];
    tmp = pp.split(".");
    return tmp[0];
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

