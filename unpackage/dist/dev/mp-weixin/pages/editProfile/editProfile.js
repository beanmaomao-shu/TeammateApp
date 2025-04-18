"use strict";
const a = require("../../common/vendor.js"),
  w = require("../../common/assets.js"),
  l = require("../../api/userInfo.js");
Array || a.resolveComponent("uni-icons")();
const g = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
Math || g();
const f = {
    __name: "editProfile",
    setup(c) {
      const r = ["请选择性别", "男", "女"],
        e = a.ref({
          username: "",
          sex: "",
          school: "",
          phone: "",
          wechatId: "",
          email: "",
          introduction: "",
          location: "",
          awards: [],
        }),
        u = async () => {
          try {
            const o = await l.getUserInfoAPI();
            if (o.data) {
              let t = [];
              try {
                t = o.data.awards ? JSON.parse(o.data.awards) : [];
              } catch (n) {
                console.error("解析 awards 失败：", n), (t = []);
              }
              o.data.username &&
                (a.index.setStorageSync("username", o.data.username),
                console.log("用户名已保存到本地存储:", o.data.username)),
                (e.value = {
                  username: o.data.username || "",
                  sex: o.data.sex === "男" ? 1 : o.data.sex === "女" ? 2 : 0,
                  school: o.data.school || "",
                  phone: o.data.phone || "",
                  wechatId: o.data.wechatId || "",
                  email: o.data.email || "",
                  introduction: o.data.introduction || "",
                  location: o.data.location || "",
                  awards: t.map((n) => ({ name: n })),
                });
            }
            console.log("获取到的用户信息：", e.value);
          } catch (o) {
            console.error("获取用户信息失败：", o);
          }
        },
        d = async () => {
          try {
            if (!e.value.username.trim()) {
              a.index.showToast({ title: "请输入昵称", icon: "none" });
              return;
            }
            const o = e.value.awards.map((s) => s.name).filter((s) => s.trim()),
              t = {
                username: String(e.value.username || ""),
                sex: String(r[e.value.sex] || ""),
                school: String(e.value.school || ""),
                phone: String(e.value.phone || ""),
                wechatId: String(e.value.wechatId || ""),
                email: String(e.value.email || ""),
                awards: JSON.stringify(o),
                location: String(e.value.location || ""),
                introduction: String(e.value.introduction || ""),
              };
            console.log("准备提交的数据：", t);
            const n = await l.editUserInfoAPI(t);
            if ((console.log(n), n.code === 200))
              a.index.setStorageSync("username", t.username),
                console.log("用户名已更新到本地存储:", t.username),
                a.index.showToast({ title: "保存成功", icon: "success" }),
                setTimeout(() => {
                  a.index.navigateBack();
                }, 1500);
            else throw new Error(n.message || "保存失败");
          } catch (o) {
            console.error("保存失败：", o),
              a.index.showToast({
                title: o.message || "保存失败，请重试",
                icon: "none",
              });
          }
        },
        m = (o) => {
          e.value.sex = parseInt(o.detail.value);
        },
        v = () => {
          e.value.awards.push({ name: "" });
        },
        h = (o) => {
          e.value.awards.splice(o, 1);
        };
      return (
        a.onMounted(() => {
          u();
        }),
        (o, t) => ({
          a: w._imports_0$1,
          b: a.p({ type: "camera-filled", size: "20", color: "#fff" }),
          c: e.value.username,
          d: a.o((n) => (e.value.username = n.detail.value)),
          e: a.t(r[e.value.sex]),
          f: a.o(m),
          g: e.value.sex,
          h: r,
          i: e.value.school,
          j: a.o((n) => (e.value.school = n.detail.value)),
          k: e.value.location,
          l: a.o((n) => (e.value.location = n.detail.value)),
          m: e.value.phone,
          n: a.o((n) => (e.value.phone = n.detail.value)),
          o: e.value.wechatId,
          p: a.o((n) => (e.value.wechatId = n.detail.value)),
          q: e.value.email,
          r: a.o((n) => (e.value.email = n.detail.value)),
          s: a.f(e.value.awards, (n, s, p) => ({
            a: n.name,
            b: a.o((i) => (n.name = i.detail.value), s),
            c: a.o((i) => h(s), s),
            d: "8a448ed0-1-" + p,
            e: s,
          })),
          t: a.p({ type: "trash", size: "20", color: "#999" }),
          v: a.p({ type: "plus", size: "20", color: "#7700ff" }),
          w: a.o(v),
          x: e.value.introduction,
          y: a.o((n) => (e.value.introduction = n.detail.value)),
          z: a.t(e.value.introduction.length),
          A: a.o(d),
        })
      );
    },
  },
  _ = a._export_sfc(f, [["__scopeId", "data-v-8a448ed0"]]);
wx.createPage(_);
