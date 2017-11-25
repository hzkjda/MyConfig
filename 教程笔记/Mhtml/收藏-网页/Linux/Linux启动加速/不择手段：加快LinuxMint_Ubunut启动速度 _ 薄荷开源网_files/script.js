/**
 * script v1.0 by Ality.
 */

$(document).ready(function(){

// 搜索
$(".menu-search").click(function(){
	$("#search-main").slideToggle("slow");
return false;
});

// 引用
$(".backs").click(function(){
	$(".track").slideToggle("slow");
	return false;
});

// 迷你菜单
$('#simple-menu').sidr();
$('#simple-menu-s').sidr();

// 链接图标
$(".content-main p a, .content-main ul li a, .content-main ol li a").each(function() {
    if ($(this).children('img').length <= 0) {
        $(this).append('<i class="icon-link"></i>');
    }
});

// 文字展开
$(".showmore span").click(function(e){
	$(this).html(["▼", "▲"][this.hutia^=1]);
	$(this.parentNode.parentNode).next().slideToggle();
	e.preventDefault();
});

// 滚屏
$('.scroll_t').click(function () {
	$('html,body').animate({
		scrollTop: '0px'
	}, 800);
});
$('.scroll_c').click(function () {
	$('html,body').animate({
		scrollTop: $('.nav-single').offset().top
 	}, 800);
});
$('.scroll_b').click(function () {
	$('html,body').animate({
		scrollTop: $('.site-info').offset().top
	}, 800);
});

// 去边线
$(".message-widget li:last, .message-page li:last").css("border","none");

// 图片显隐
$('img').hover(function () {
	$(this).fadeTo('fast', 0.5);
}, function () {
	$(this).fadeTo('fast', 1);
});

// 图片延迟
$("img").lazyload({
	effect: "fadeIn",
	failurelimit: 40
});

// 表情
$('.smiley').click(function () {
	$('.smiley-box').animate({
		opacity: 'toggle',
		left: '50px'
	}, 1000).animate({
		left: '10px'
	}, 'fast');
	return false;
});

// 弹窗
$('#login-main').leanModal({
	top: 110,
	overlay: 0.6,
	closeButton: '.hidemodal'
});
$('#logint-main').leanModal({
	top: 110,
	overlay: 0.6,
	closeButton: '.hidemodal'
});
$('#share-main').leanModal({
	top: 110,
	overlay: 0.6,
	closeButton: '.hidemodal'
});
$('#share-main-s').leanModal({
	top: 110,
	overlay: 0.6,
	closeButton: '.hidemodal'
});

// 字号
$(".bigger, .smaller").click(function(){
	var thisEle = $(".content-main").css("font-size"); 
	var textFontSize = parseFloat(thisEle , 10);
	var unit = thisEle.slice(-2);
	var cName = $(this).attr("class");
	if(cName == "bigger"){
			textFontSize += 2;
	}else if(cName == "smaller"){
			textFontSize -= 2;
	}
	$(".content-main").css("font-size",  textFontSize + unit );
});

// 结束
});

// 弹窗
(function ($) {
	$.fn.extend({
		leanModal: function (options) {
			var defaults = {
				top: 100,
				overlay: 0.5,
				closeButton: null
			};
			var overlay = $('<div id=\'lean_overlay\'></div>');
			$('body').append(overlay);
			options = $.extend(defaults, options);
			return this.each(function () {
				var o = options;
				$(this).click(function (e) {
					var modal_id = $(this).attr('href');
					$('#lean_overlay').click(function () {
						close_modal(modal_id)
					});
					$(o.closeButton).click(function () {
						close_modal(modal_id)
					});
					var modal_height = $(modal_id).outerHeight();
					var modal_width = $(modal_id).outerWidth();
					$('#lean_overlay').css({
						'display': 'block',
						opacity: 0
					});
					$('#lean_overlay').fadeTo(200, o.overlay);
					$(modal_id).css({
						'display': 'block',
						'position': 'fixed',
						'opacity': 0,
						'z-index': 11000,
						'left': 50 + '%',
						'margin-left': - (modal_width / 2) + 'px',
						'top': o.top + 'px'
					});
					$(modal_id).fadeTo(200, 1);
					e.preventDefault()
				})
	      });
			function close_modal(modal_id) {
				$('#lean_overlay').fadeOut(200);
				$(modal_id).css({
					'display': 'none'
				})
			}
		}
	})
}) (jQuery);

// 链接复制
function copy_code(text) {
  if (window.clipboardData) {
    window.clipboardData.setData("Text", text)
	alert("已经成功将原文链接复制到剪贴板！");
  } else {
	var x=prompt('你的浏览器可能不能正常复制\n请您手动进行：',text);
  }
};

// 评论贴图
function embedImage() {
  var URL = prompt('请输入图片 URL 地址:', 'http://');
  if (URL) {
    document.getElementById('comment').value = document.getElementById('comment').value + '[img]' + URL + '[/img]';
  }
};

// 表情
function grin(tag) {
	var myField;
	tag = ' ' + tag + ' ';
    if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
		myField = document.getElementById('comment');
	} else {
		return false;
	}
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = tag;
		myField.focus();
	}
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var cursorPos = endPos;
		myField.value = myField.value.substring(0, startPos)
					  + tag
					  + myField.value.substring(endPos, myField.value.length);
		cursorPos += tag.length;
		myField.focus();
		myField.selectionStart = cursorPos;
		myField.selectionEnd = cursorPos;
	} else {
		myField.value += tag;
		myField.focus();
	}
};

// 跟随
$.fn.rollFloat = function() {
    var position = function(element) {
        var top = element.position().top;
        var pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 45
                    })
                } else {
                    element.css({ 
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos, 
                    top: top 
                })
            }
        });
    }; 
    return $(this).each(function() {
        position($(this));
    });
};
$(function(){
	$(".sidebar-roll").rollFloat();
});

// 顶部导航
$.fn.smartFloat = function() {
    var position = function(element) {
        var top = element.position().top;
        var pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    }).addClass("shadow");
                } else {
                    element.css({ 
                        top: scrolls
                    });
                }
            }else {
                element.css({
                    position: pos, 
                    top: top 
                }).removeClass("shadow");
            }
        });
    }; 
    return $(this).each(function() {
        position($(this));
    });
};
$(function(){
	$("#header-top").smartFloat();
});

// 文字滚动
function ScrollImgLeft() {
	var speed = 30
	var scroll_begin = document.getElementById('bulletin_begin');
	var scroll_end = document.getElementById('bulletin_end');
	var scroll_div = document.getElementById('bulletin_div');
	scroll_end.innerHTML = scroll_begin.innerHTML
	function Marquee() {
		if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
		scroll_div.scrollLeft -= scroll_begin.offsetWidth 
		else
		scroll_div.scrollLeft++
	}
	var MyMar = setInterval(Marquee, speed)
	scroll_div.onmouseover = function () {
		clearInterval(MyMar)
	}
	scroll_div.onmouseout = function () {
		MyMar = setInterval(Marquee, speed)
	}
}

// 喜欢
$.fn.postLike = function() {
	if (jQuery(this).hasClass('done')) {
		return false;
	} else {
		$(this).addClass('done');
		var id = $(this).data("id"),
		action = $(this).data('action'),
		rateHolder = jQuery(this).children('.count');
		var ajax_data = {
			action: "ality_ding",
			um_id: id,
			um_action: action
		};
		$.post(wpl_ajax_url, ajax_data,
		function(data) {
			jQuery(rateHolder).html(data);
		});
		return false;
	}
};
$(document).on("click", ".favorite",
function() {
	$(this).postLike();
});