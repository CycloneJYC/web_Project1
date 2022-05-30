$(function () {
    //登录/注册切换
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 从 LayUI 中获取 form 对象
    const form = layui.form;
    const layer = layui.layer;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password").val();
            if (pwd !== val) return "两次密码不一致";
        },
    });

    //设置baseURL
    const baseURL = 'http://www.liulongbin.top:3007';
    
    //注册功能
    $('#form_reg').on('submit', (e) =>{
        //阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data: {
                username:$(".reg-box [name=username").val(),
                password:$(".reg-box [name=password").val(),
            },
            success: (res) =>{
                // console.log(res);
                const {status, message} = res;
                if (status !== 0) return layer.msg(message);
                layer.msg(message);
                $("#link_login").click()
            }
        })
    });

    //登录
    $('#form_login').on('submit',(e) =>{
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/api/login',
            data: $('#form_login').serialize(),
            success: (res) =>{
                // console.log(res);
                const {status, message, token} = res;
                if(status !== 0) return layer.msg(message);
                layer.msg(message);
                //登录成功后讲token储存到本地
                localStorage.setItem('token',token);
                //跳转至主页
                location.href = '/index.html';                
            }
        })
    });
});
