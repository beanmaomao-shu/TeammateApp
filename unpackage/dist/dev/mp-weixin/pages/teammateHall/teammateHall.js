"use strict";
const e = require("../../common/vendor.js"),
  a = require("../../common/assets.js"),
  $ = require("../../api/contest.js"),
  k = require("../../api/search.js"),
  U = require("../../api/login.js");
if (!Array) {
  const m = e.resolveComponent("van-notice-bar"),
    i = e.resolveComponent("dash");
  (m + i)();
}
const S = () => "../../components/dash/dash.js";
Math || S();
const N = {
    __name: "teammateHall",
    props: { toValue: { type: String } },
    setup(m) {
      e.useRouter();
      const i = e.ref(!1),
        s = e.ref(""),
        r = e.ref(!1),
        c = e.ref([]);
      e.ref([]);
      const u = e.ref([]);
      let g = null;
      const d = e.ref(!1),
        f = () => {
          setInterval(() => {
            i.value = !0;
          }, 1e3);
        },
        p = async () => {
          try {
            e.index.getStorageSync("token") || (await h());
            const n = await $.getContest();
            (u.value = n.data), console.log(n.data);
          } catch (t) {
            console.error("获取比赛列表失败：", t),
              e.index.showToast({ title: "获取比赛信息失败", icon: "none" });
          }
        },
        w = async () => {
          if ((clearTimeout(g), !s.value)) {
            (c.value = []), (r.value = !1);
            return;
          }
          g = setTimeout(async () => {
            try {
              const t = await k.searchContest(s.value);
              t.data &&
                ((c.value = t.data), console.log(t.data), (r.value = !0));
            } catch (t) {
              console.error("搜索失败：", t),
                e.index.showToast({ title: "搜索失败", icon: "none" });
            }
          }, 300);
        },
        x = (t) => {
          (s.value = t.name), (r.value = !1), _();
        },
        y = () => {
          setTimeout(() => {
            r.value = !1;
          }, 200);
        },
        _ = () => {
          if (!s.value) {
            e.index.showToast({ title: "请输入搜索内容", icon: "none" });
            return;
          }
          e.index.navigateTo({
            url: `/pages/searchDetail/searchDetail?value=${encodeURIComponent(
              s.value
            )}`,
          });
        };
      e.ref([
        {
          id: 1,
          matchName: "2024年第十四届APMCM亚太地区大学生数学建模竞赛",
          name: "听党的就队",
          imgUrl: "../../static/images/match6.png",
        },
        {
          id: 2,
          matchName: "2024年全国大学生英语翻译大赛（NETCCS）",
          name: "六级能不能过队",
          imgUrl: "../../static/images/match3.png",
        },
        {
          id: 3,
          matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛',
          name: "超级翻译官队",
          imgUrl: "../../static/images/match4.png",
        },
        {
          id: 4,
          matchName: "2024创想中国全国大学生创新创业大赛",
          name: "小呆呆创新队",
          imgUrl: "../../static/images/match15.png",
        },
        {
          id: 5,
          matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',
          name: "翻译的都队",
          imgUrl: "../../static/images/match8.png",
        },
        {
          id: 6,
          matchName: '第二届"数学周报"全国大学生数学能力大赛',
          name: "基本不懂式队",
          imgUrl: "../../static/images/match13.png",
        },
        {
          id: 7,
          matchName: "2024第二届全国大学生数学竞赛暨创新思维挑战赛",
          name: "哎我队",
          imgUrl: "../../static/images/match11.png",
        },
        {
          id: 8,
          matchName: "CCF2024年中国计算机应用技术大赛-全国算法精英大赛",
          name: "AC队",
          imgUrl: "../../static/images/match7.png",
        },
        {
          id: 9,
          matchName: "浙大研究院《智能无人机》研学实践项目",
          name: "让你飞起来队",
          imgUrl: "../../static/images/match14.png",
        },
      ]);
      const h = async () => {
          try {
            const t = await e.index.login();
            if (t.code) {
              console.log("获取code成功：", t.code);
              const n = await U.login(t.code);
              if ((console.log("登录响应：", n), n.data && n.data.token))
                return (
                  (d.value = !0),
                  e.index.setStorageSync("token", n.data.token),
                  console.log(n.data.token),
                  n.data.openid &&
                    e.index.setStorageSync("openid", n.data.openid),
                  e.index.showToast({ title: "登录成功", icon: "success" }),
                  n.data.token
                );
              throw new Error("登录失败：未获取到token");
            }
          } catch (t) {
            throw (
              (console.error("登录失败：", t),
              e.index.showToast({ title: "登录失败，请重试", icon: "none" }),
              t)
            );
          }
        },
        C = e.ref(""),
        T = m;
      return (
        p(),
        e.onLoad(() => {
          C.value = T.toValue;
        }),
        e.onMounted(async () => {
          try {
            await h(), await p();
          } catch (t) {
            console.error("初始化失败：", t);
          }
        }),
        (t, n) =>
          e.e(
            {
              a: e.o([(o) => (s.value = o.detail.value), w]),
              b: e.o((o) => (r.value = !0)),
              c: e.o(y),
              d: s.value,
              e: a._imports_0$2,
              f: e.o(_),
              g: r.value && c.value.length,
            },
            r.value && c.value.length
              ? {
                  h: e.f(c.value, (o, l, v) => ({
                    a: e.t(o.name),
                    b: l,
                    c: e.o((D) => x(o), l),
                  })),
                }
              : {},
            {
              i: e.p({
                scrollable: !0,
                color: "#AC33C1",
                background: "#F1E6FF",
              }),
              j: e.f(u.value, (o, l, v) => ({ a: o.poster, b: l })),
              k: e.p({ Color: "#E5E5E5", Width: "780rpx", Height: "10rpx" }),
              l: a._imports_1$2,
              m: a._imports_2$2,
              n: e.p({ Color: "#F1E6FF", Width: "700rpx", Height: "8rpx" }),
              o: i.value,
            },
            i.value
              ? {
                  p: a._imports_3$1,
                  q: a._imports_0,
                  r: a._imports_0$1,
                  s: a._imports_5,
                  t: "/pages/teamDetail/teamDetail?tocPageValue=c",
                }
              : {},
            {
              v: a._imports_7,
              w: a._imports_0,
              x: a._imports_1,
              y: a._imports_2,
              z: a._imports_3,
              A: a._imports_5,
              B: e.f(u.value, (o, l, v) => ({
                a: o.poster,
                b: e.t(o.name),
                c: `/pages/teamDetail/teamDetail?id=${o.id}&toaPageValue=a`,
                d: o.id,
              })),
              C: a._imports_0,
              D: a._imports_1$1,
              E: a._imports_2$1,
              F: a._imports_0$1,
              G: a._imports_0$1,
              H: a._imports_4,
              I: a._imports_5,
              J: !d.value,
            },
            d.value
              ? {}
              : {
                  K: e.o(
                    (...o) => t.handleGetUserInfo && t.handleGetUserInfo(...o)
                  ),
                },
            { L: e.o(f) }
          )
      );
    },
  },
  b = e._export_sfc(N, [["__scopeId", "data-v-305e4dd3"]]);
wx.createPage(b);
