<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <van-row>
        <van-col span="2">
          <i class="fa fa-user"></i>
        </van-col>
        <van-col span="22">
          <InputGroup placeholder="请输入账号" v-model="name"></InputGroup>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="2">
          <i class="fa fa-lock"></i>
        </van-col>
        <van-col span="22">
          <InputGroup placeholder="请输入密码" v-model="passWord" type="password"></InputGroup>
        </van-col>
      </van-row>

      <van-cell is-link @click="loginClick()">
        <YButton>登录</YButton>
      </van-cell>

      <!-- <van-popup v-model="xianshi">
        <div id="__Verification" style=" width:200px; height:134px;">
          <div id="__codediv"></div>
        </div>
      </van-popup>-->
    </div>
  </div>
</template>
<script>
let self;
import axios from "axios";
import InputGroup from "../../components/InputGroup";
import YButton from "../../components/YButton";

export default {
  name: "Login",
  components: {
    InputGroup,
    YButton,
  },
  data() {
    return {
      name: "",
      passWord: "",
      _imgx: 0, //图片宽度
      _imgy: 0, //图片高度
      spec: "", //图片尺寸,
      xianshi: false,
      __codeDIV: "",
    };
  },
  computed: {
    isDisabled() {
      if (self.name && self.passWord && self.code) return false;
      else return true;
    },
  },
  methods: {
    showPopup() {
      self.xianshi = true;
      var div = document.createElement("div");
      div.id = "__codediv";

      setTimeout(function () {
        self.getCode();
      }, 3000000000);
    },
    getCode() {
      self.$axios
        .get(self.url + "/api/VerifyCode/GetVerificationCode")
        .then((res) => {
          var yvalue = res.data.abscissa,
            small = res.data.small,
            array = res.data.unorderedArray,
            normal = res.data.normal;
          self.__imgx = res.data.imgWidth;
          self.__imgy = res.data.imgHeight;
          localStorage.setItem("imgx", res.data.imgWidth);
          localStorage.setItem("imgy", res.data.imgHeight);

          $(".cut_bg").css("background-image", "url(" + normal + ")");
          $("#xy_img").css("background-image", "url(" + small + ")");
          $("#xy_img").css("top", yvalue);
          $("#drag").css("width", self.__imgx);
          $("#drag .drag_text").css("width", self.__imgx);
          $(".cut_bg").css("width", self.__imgx / 10);
          $(".cut_bg").css("height", self.__imgy / 2);
          $(".refesh_bg").show();
          $(".refesh_bg").css("left", self.__imgx - 25);
          var bgarray = array;
          //还原图片
          var _cutX = self.__imgx / 10;
          var _cutY = self.__imgy / 2;
          for (var i = 0; i < bgarray.length; i++) {
            var num = bgarray.indexOf(i); //第i张图相对于混淆图片的位置为num
            var x = 0,
              y = 0;
            //还原前偏移
            y = i > 9 ? -_cutY : 0;
            x = i > 9 ? (i - 10) * -_cutX : i * -_cutX;
            //当前y轴偏移量
            if (num > 9 && i < 10) y = y - _cutY;
            if (i > 9 && num < 10) y = y + _cutY;
            //当前x轴偏移量
            x = x + (num - i) * -_cutX;
            //显示第i张图片
            $("#bb" + i).css("background-position", x + "px " + y + "px");
          }
          //完成,移除提示
          $(".vcode-hints").remove();
        });

      self.CreadeCodeDiv();
    },
    //绘制验证码结构
    CreadeCodeDiv() {
      self.__codeDIV = document.getElementById("__codediv");
      self.__imgx = localStorage.getItem("imgx");
      self.__imgy = localStorage.getItem("imgy");

      // self.__codeDIV.innerHTML = '';
      // var __codeHTML = "<div style='width:" +self.__imgx + "px;height:" + self.__imgy + "px;background-color:#e8e8e8;'>";
      var __codeHTML =
        "<div style='width:200px;height:100px;background-color:#e8e8e8;'>";
      //正在载入提示文字
      __codeHTML +=
        "<div class='vcode-hints'style='width:" +
        self.__imgx +
        "px;line-height:" +
        (self.__imgy / 100) * 7 +
        ";'>\u6b63\u5728\u8f7d\u5165...</div>";
      for (var i = 0; i < 20; i++) {
        //20张小图组成完整的验证码图片
        __codeHTML += "<div id='bb" + i + "'class='cut_bg'></div>";
      }
      __codeHTML +=
        "<div id='xy_img'class='xy_img_bord'></div></div><div id='drag'></div>";
      self.__codeDIV.innerHTML = __codeHTML;

      setTimeout(function () {
        self.test(self.__codeDIV);
      }, 2000);
    },

    test(__codediv) {
      var imgx = localStorage.getItem("imgx");
      var imgy = localStorage.getItem("imgy");
      console.log(imgx);
      console.log(imgy);
      var x,
        drag = this,
        isMove = false;
      //添加背景，文字，滑块
      var html =
        '<div class="drag_bg"></div><div class="drag_text" onselectstart="return false;"' +
        'unselectable="on">\u62d6\u52a8\u56fe\u7247\u9a8c\u8bc1</div>' +
        '<div class="handler handler_bg"></div><a href="javascript:;"' +
        ' title="\u70b9\u51fb\u5237\u65b0\u9a8c\u8bc1\u7801"' +
        'style="width:16px;height:16px;"><div class="refesh_bg"></div></a>';

      $("#drag").append(html);
      $("a").click(function () {
        self.getCode();
      });
      $("#drag .drag_text").css("width", imgx);
      $(".refesh_bg").css("left", imgx - 40);
      var handler = $("#drag").find(".handler"),
        drag_bg = $("#drag").find(".drag_bg"),
        text = $("#drag").find(".drag_text"),
        maxWidth = imgx - 40, // drag.width() - handler.width();  //能滑动的最大间距
        t1 = new Date(), //开始滑动时间
        t2 = new Date(); //结束滑动时间

      var $xy_img = $("#xy_img");
      var arrayDate = new Array(); //鼠标/手指移动轨迹
      var X, Y;
      // debugger
      handler.mousedown(function (e) {
        dragstart(e.pageX);
      }); //鼠标按下
      $(document).mousemove(function (e) {
        dragmoving(e.pageX);
      }); //移动鼠标
      $(document).mouseup(function (e) {
        dragmovend(e.pageX);
      }); //松开鼠标
      handler.mouseout(function (e) {}); //鼠标移出元素
      handler.on("touchstart", function (e) {
        dragstart(e.originalEvent.touches[0].pageX);
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove", defaultEvent, false);
      }); //手指按下
      $(document).on("touchmove", function (e) {
        dragmoving(e.originalEvent.touches[0].pageX);
      }); //手指移动
      $(document).on("touchend", function (e) {
        dragmovend(e.originalEvent.changedTouches[0].pageX);
        //阻止页面的滑动默认事件
        document.removeEventListener("touchmove", defaultEvent, false);
      }); //手指松开
      //鼠标/手指开始滑动
      function dragstart(thisx) {
        $("#xy_img").show();
        isMove = true;
        // 鼠标开始滑动时鼠标的起始x位置
        x = thisx - parseInt($(".handler").css("left"), 10);
        //    鼠标开始滑动时的时间
        t1 = new Date();
      }
      //鼠标/手指移动过程
      function dragmoving(thisx) {
        // 鼠标移动的x距离
        var _x = thisx - x;

        if (isMove) {
          if (_x > 0 && _x <= maxWidth) {
            $("#xy_img").css("left", _x);
            $(".refesh_bg").hide();
            $(".handler").css("left", _x);
            $(".drag_bg").css("width", _x);
            arrayDate.push({ x: parseInt(_x), time: new Date() });
          } else if (_x > maxWidth) {
            //鼠标指针移动距离达到最大时清空事件
            $("#xy_img").css({ left: 0 });
            $(".handler").css({ left: 0 });
            $(".drag_bg").css({ width: 0 });
          }
        }
      }
      //鼠标/手指移动结束
      function dragmovend(thisx) {
        // thisx鼠标移动的x
        var imgx = localStorage.getItem("imgx");
        if (!isMove) {
          //没有滑动过程 直接返回
          return;
        }
        isMove = false;
        if (isNaN(x) || x === undefined) {
          return;
        }
        var _x = Math.round(thisx - x); //取整
        if (_x < 10) {
          $(".refesh_bg").show();
          $("#xy_img").css({ left: 0 });
          $(".handler").css({ left: 0 });
          $(".drag_bg").css({ width: 0 });
          return;
        }
        t2 = new Date();
        axios.defaults.headers.post["Content-Type"] =
          "application/json-patch+json";
        self.$axios
          .post(self.url + "/api/VerifyCode/CheckCode", {
            point: _x,
            timespan: t2 - t1,
            slides: arrayDate,
          })
          .then((res) => {
            if (res.data.errorCode == 1) {
              $(function () {
                $("#drag").text(res.data.errorMsg);
                $("#drag").css("background-color", "#7ac23c");
              });

              self.loginClick();
            } else {
              $(".refesh_bg").show();
              $("#xy_img").css({ left: 0 });
              $(".handler").css({ left: 0 });
              $(".drag_bg").css({ width: 0 });
            }
          });
      }
      //取消事件的默认动作
      //防止一些Android浏览器页面跟随滑动的情况
      function defaultEvent(e) {
        // e.preventDefault();
      }
      //清空事件
      function dragOk() {
        handler.removeClass("handler_bg").addClass("handler_ok_bg");
        text.text("\u9a8c\u8bc1\u901a\u8fc7");
        drag.css({ color: "#fff" });
        handler.unbind("mousedown");
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
        $(".refesh_bg").hide();
      }
    },
    loginClick() {
      self.$axios
        .post(self.url + "/api/OAuth/GetJwt/api/token", {
          name: self.name,
          passWord: self.passWord,
        })
        .then((res) => {
          console.log(res);
          // if (res.data) {
          if (res.data.statusCode == 9) {
            alert(res.data.resultMsg);
            // self.xianshi = false;
          }
          if (res.data.statusCode == 0) {
            localStorage.setItem("token", res.data.data);
            self.$router.push({ path: "/home" });
          }
          // } else if (res.data == "") {
          //   alert("用户名或密码错误，请重新登录");
          //   // self.xianshi = false;
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    self = this;
  },
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 2.1vw;
  box-sizing: border-box;
  background-image: url(../../assets/images/denglu.jpg);
}

.title {
  margin-top: 20vw;
  font-size: 5.1vw;
  text-align: center;
  color: #ffffff;
}

.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 2.1vw;
  text-align: center;
  width: 100%;
  color: #888;
}

.footer_wrap .register {
  font-size: 2.1vw;
  outline: none;
  border: none;
  background-color: transparent;
  color: #7b8ca9;
}

.content,
.btn_wrap {
  margin-top: 6vw;
}

.fa {
  color: #ffffff;
  font-size: 6vw;
}

.van-col--2 {
  margin-top: 14%;
}

.van-col--22 {
  margin-top: 10%;
}

.van-row {
  width: 90%;
  padding-left: 5%;
}

input {
  background: none;
  border: none;
}

.bottom {
  color: #fff;
}

.bottom img {
  width: 6vw;
  height: 6vw;
}

.van-cell {
  background: none;
}

.van-cell__right-icon {
  display: none;
}
</style>

<style>
#drag {
  position: relative;
  background-color: #e8e8e8;
  height: 34px;
  line-height: 34px;
  text-align: center;
}

#drag .handler {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 36px;
  height: 34px;
  border: 1px solid #ccc;
  cursor: move;
}

.handler_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
}

.handler_ok_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
    no-repeat center;
}

#drag .drag_bg {
  background-color: #7ac23c;
  height: 40px;
  width: 0px;
}

#drag .drag_text {
  font-size: 13px;
  color: #4a4a4a;
  position: absolute;
  top: 0px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}

.cut_bg {
  float: left;
  margin: 0 !important;
  border: 0px;
  padding: 0 !important;
}

.xy_img_bord {
  -webkit-box-shadow: 0 0 15px #0cc;
  -moz-box-shadow: 0 0 15px #0cc;
  box-shadow: 0 0 15px #0cc;
  top: 32px;
  left: 0px;
  display: none;
}

#xy_img {
  z-index: 999;
  width: 40px;
  height: 40px;
  position: relative;
}

.refesh_bg {
  height: 16px;
  width: 16px;
  /* 刷新符号 */
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABOElEQVR42kzOv0vUcRzH8cfn02dyyB9XB10p+A94FkFDhNBwQ1iJjkXiIvQPaFN7/8FXaClaGuoGKYIoIcGtEsKlpUXO4zrRQR0O+n4d/Hbea3ryer95vV4hA6Kb7qmroOO7j37JXTYZMhi26KFh59rX9NlTUyHjomcayO3awxXXRLmuql4SPdFAyyubDjHitiU1VRRR3QO0PPdOR09Pxzft/13RfWN4Y7vfP2TVjZIvJF0bDnwZGBi1fS25G7KIQmFQQSgpT3KxNM7fzigIQrKiokDU8tJRP6Vi2aidZF4qrQ35QM1dC9iN/pXGthdO+ue6x2j7lPpW1YxNhwoj7lh0VeG930nAXxU1qx5pKdSMi1j3luTYljUNc0ZNmCjzDjS9dkzIbvmjI5o267pL2PfDBz/PJp8OAJINWJLgnbPsAAAAAElFTkSuQmCC");
  position: absolute;
  top: 12px;
  display: none;
}

.van-cell:not(:last-child)::after {
  border: none;
}
</style>