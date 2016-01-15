$("#register0").click(function() {
    location.href = '/register'
})

$(document).ready(function() {

    $("#login").validate({
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "请输入姓名"
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于6个字 符"
            }
        }/*,
        submitHandler: function() {
            alert($('#username').val())
            alert($('#password').val())
            $.post('/login', {
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                //回调函数
                function(theback) {
                    //输出结果
                    //alert(theback)
                    $('#erro').html(theback)
                },
                //返回类型
                "text"
            )
            return false
        }*/
    })
})
