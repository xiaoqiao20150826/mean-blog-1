define(["jquery"], function($) {
    var navbar = $("#navbar");

    navbar.children().each(function() {
        $(this).removeClass("active");
    });

    $("#nav-login").addClass("active");

     //检测前端输入的数据是否正确
    var username = $("input[name='name']"),
        password = $("input[name='password']"),
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
    };

    username.focus(function() {
        /* Act on the event */
        $("#error-username").parent().hide();
    });

    password.focus(function() {
        /* Act on the event */
        $("#error-password").parent().hide();
    });

    $("#login-btn").click(function() {
        validate();
        if (isValid === true) {
            $.ajax({
                    url: 'login',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: username.val(),
                        password: password.val(),
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