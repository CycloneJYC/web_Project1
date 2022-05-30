//获取用户信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",

    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg(res.message);
      renderUserInfo(res.data);
    },
     
  });
}

//渲染用户信息
const renderUserInfo = (userInfo) => {
  // console.log(userInfo);
  let username = userInfo.nickname || userInfo.username;
  //渲染欢迎语句
  $("#welcome").html(`欢迎 ${username}`);

  //渲染头像
  if (userInfo.user_pic !== null) {
    $(".layui-nav-img").attr("src", userInfo.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".text-avatar").html(username[0].toUpperCase());
  }
};

//退出键
$("#logoutbtn").on("click", function () {
  layui.layer.confirm("确定退出登录？", { icon: 3, title: "" }, function () {
    //清空本地储存的token
    localStorage.removeItem("token");
    //跳转至登录页面
    location.href = "/login.html";
  });
});
getUserInfo();
