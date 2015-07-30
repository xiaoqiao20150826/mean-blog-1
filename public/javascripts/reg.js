define(["jquery"], function($) {
    //控制导航栏选中的按钮
    var navbar = $("#navbar");

    navbar.children().each(function() {
        $(this).removeClass("active");
    });

    $("#nav-reg").addClass("active");

    //检测前端输入的数据是否正确
    var username = $("input[name='name']"),
        password = $("input[name='password']"),
        passwordRepeat = $("input[name='password-repeat']"),
        email = $("input[name='email']"),
        table = $("#helloTbody"),
        isValid; //各项信息是否都正确

    var validate = function() {
        isValid = true;
        if (username.val() === "") {
            $("#error-username").html("用户名不能为空").parent().show();
            isValid = false;
        }
        if (password.val() === "") {
            $("#error-password").html("密码不能为空").parent().show();
            isValid = false;
        }
        if (passwordRepeat.val() === "") {
            $("#error-password-repeat").html("密码不能为空").parent().show();
            isValid = false;
        } else {
            if (password.val() != passwordRepeat.val()) {
                $("#error-password-repeat").html("两次输入的密码不一致").parent().show();
                isValid = false;
            }
        }
        if (email.val() === "") {
            $("#error-email").html("邮箱不能为空").parent().show();
            isValid = false;
        } else {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if (!reg.test(email.val())) {
                $("#error-email").html("邮箱格式不正确").parent().show();
                isValid = false;
            }
        }
    };

    username.focus(function() {
        /* Act on the event */
        $("#error-username").parent().hide();
    });

    password.focus(function() {
        /* Act on the event */
        $("#error-password").parent().hide();
    });

    passwordRepeat.focus(function() {
        /* Act on the event */
        $("#error-password-repeat").parent().hide();
    });

    email.focus(function() {
        /* Act on the event */
        $("#error-email").parent().hide();
    });

    $("#reg-btn").click(function() {
        validate();
        if (isValid === true) {
            $.ajax({
                    url: 'reg',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: username.val(),
                        password: password.val(),
                        email: email.val()
                    },
                    error: function(error) {
                        console.log(error);
                    },
                    success: function(data) {
                        console.log(data);
                    }
                });
        }
    });
});