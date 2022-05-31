// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

//模拟点击文件选择框
$("#btnChooseImage").on("click", function () {
  $("#file").click();
});

//当触发文件上传事件时
$("#file").change((e) => {
  //通过 `e.target.files` 获取用户选择文件列表
  // console.log(e.target.files)
  //判断伪数组长度
  //   console.log(e);
  const filelength = e.target.files.length;
  //如果长度等于0，说明没有上传文件
  if (filelength == 0) return;

  //得到用户上传的文件
  const userfile = e.target.files[0];

  //吧图片转化为路径
  const imgurl = URL.createObjectURL(userfile);

  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgurl) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

//上传头像
$("#btnUpload").click(() => {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL("image/png");
  // 2、发送 ajax 请求，发送到服务器
  $.ajax({
    method: "POST",
    url: "/my/update/avatar",
    data: {
      avatar: dataURL,
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("更换头像失败！");
      }
      layer.msg("更换头像成功！");
      window.parent.getUserInfo();
    },
  });
});
