$(function() {
    $.get("http://ipinfo.io", function(response) {
        $('input[name="ip"]').val(response.ip)
        $('input[name="city"]').val(response.city)
        $('input[name="region"]').val(response.region)
        $('input[name="country"]').val(response.country)
        $('input[name="loc"]').val(response.loc)
        $('input[name="org"]').val(response.org)
    }, "jsonp")
})


$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
})


//initialize file upload button
$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
    var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;
    console.log(log);
    if (input.length) {
        input.val(log);
    } else {
        if (log) alert(log);
    }
});

$(document).ready(function() {
    // 联系电话(手机/电话皆可)验证   
    jQuery.validator.addMethod("isTel", function(value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
    }, "请正确填写您的联系方式");

    $("#register").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            phone: {
                isTel: true,
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入姓名"
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于6个字 符"
            },
            confirm_password: {
                required: "请输入确认密码",
                minlength: "确认密码不能小于6个字符",
                equalTo: "两次输入密码不一致不一致"
            },
            phone: {
                required: "请输入手机号码,这将是你取回密码的重要凭证"
            }
        }
    })
})
