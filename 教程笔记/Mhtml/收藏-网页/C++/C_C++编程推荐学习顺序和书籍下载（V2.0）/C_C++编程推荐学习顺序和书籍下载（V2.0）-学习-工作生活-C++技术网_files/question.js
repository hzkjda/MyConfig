// 初始化编辑器
var editor;
$.getScript("/source/kindeditor.js", function(data){
  initEditer();
});
function initEditer(){
  KindEditor.options.filterMode = false;
  KindEditor.ready(function (K) {
      editor = K.create('#editor_id', {
          cssPath: '/source/plugins/code/prettify.css',
          uploadJson: "/source/editor/upload_json.ashx",
          allowFileManager: false,
          allowImageUpload: true,
          afterCreate: function () {
              var self = this;
          }
      });
  });
}


// 数据处理
$(function () {
    H_login = {};
    H_login.openwindow = function () {
        $('#question-button').click(function () {

            var uid = GetCookie("user_id");
            //var uid = $.cookie("user_id");
            if (uid == null) {
                alert("请登录之后再提问哦~");
            } else {
                $('.question').fadeIn(300);
              //初始化编辑器
            }
        });
    };
    H_login.closewindow = function () {
        $('.submit-button #close').click(function () {
            $('.question').fadeOut(400);
        });
    };
    H_login.submit_question = function () {
        $("#qtitle").click(function () {
            var title = $("#qtitle").val();
            if (title == "请输入您问题的标题，明确的标题将优先回答") {
                $("#qtitle").attr("value", '');
            }
        });
        $("#qtitle").blur(function () {
            var title = $("#qtitle").val();
            if (title == "") {
                $("#qtitle").attr("value", '请输入您问题的标题，明确的标题将优先回答');
            }
        });

        $(".submit-button #ok").click(function () {
            editor.sync();
            var textValue = editor.html();
            var text = $("#qtitle").val();
            if ($.trim(textValue) == "" || text == "" || text == "请输入您问题的标题，明确的标题将优先回答") {
                alert("不能提交空内容或空标题");
                return false;
            }
            else if (text.length < 10) {
                alert("超过10个字的准确的标题，可以更快速的得到解答哦~");
                return false;
            }
            else if (editor.text().length < 20) {
                alert("超过20字或更多的问题描述，或者图文并茂，能有助于我们快速看懂你的问题，更快得到更好的解答哦~");
                return false;
            }
            else {
                $.ajax({
                    type: "post",  //提交方式
                    url: "/service/ask.ashx", //路径
                    dataType: "json",
                    data: {
                        title: text,
                        question: textValue
                    },
                    success: function (data) {//返回数据根据结果进行相应的处理
                        if (data != null) {
                            var jsonobj = $.parseJSON(data);
                            if (jsonobj.ret == "0") {
                                alert("恭喜，问题已经提交成功！\n为了方便解答是进一步询问问题的描述，请在【用户中心】填写联系QQ。\n为了第一时间得知问题被解答，请在【用户中心】填写联系邮件。\n也可以自行在【用户中心】的【提问列表】中可以查看问题解答情况。");
                                $('.question').fadeOut(400);
                                editor.html('');
                                $("#qtitle").val("请输入您问题的标题，明确的标题将优先回答");
                            }
                            else {
                                alert(jsonobj.msg);
                            }
                        }
                    }
                });

            }
        });
    };
    H_login.run = function () {
        this.closewindow();
        this.openwindow();
        this.submit_question();
    };
    H_login.run();
});
