"use strict";const e=require("../../common/vendor.js"),i=require("../../common/assets.js"),_=require("../../api/team.js"),I=require("../../api/chat.js");if(!Array){const l=e.resolveComponent("uni-segmented-control"),a=e.resolveComponent("infoCard"),d=e.resolveComponent("uni-section");(l+a+d)()}const R=()=>"../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js",y=()=>"../../components/infoCard/infoCard.js";Math||(R+y)();const b={__name:"seminarRoom",setup(l){const a=e.ref(0),d=e.ref(["我创建的团队","我加入的团队"]),g=e.ref("button"),h=e.ref("#AC33C1"),r=e.ref([]),c=e.ref([]),p=n=>{a.value!==n.currentIndex&&(a.value=n.currentIndex)};e.ref(!0),e.ref(!0);const C=async()=>{try{const n=await _.getCreateTeamAPI();console.log("获取创建的团队：",n),n.code===200&&n.data&&(r.value=n.data.map(t=>({id:t.id,name:t.name,icon:t.icon,chatRoomId:t.chatRoomId,isLeader:!0,unreadCount:0})),await m())}catch(n){console.error("获取创建的团队失败：",n),e.index.showToast({title:"获取团队信息失败",icon:"none"})}},f=async()=>{try{const n=await _.getJoinTeamAPI();console.log("获取加入的团队：",n),n.code===200&&n.data&&(c.value=n.data.map(t=>({...t,unreadCount:0})),await m())}catch(n){console.error("获取加入的团队失败：",n),e.index.showToast({title:"获取加入的团队失败",icon:"none"})}},m=async()=>{try{const n=[...r.value.map(o=>o.chatRoomId),...c.value.map(o=>o.chatRoomId)].filter(o=>o);if(n.length===0)return;console.log("所有聊天室ID：",n);const t=await I.getUnreadCount(n);console.log("获取未读消息数量：",t),t.code===200&&t.data&&(r.value=r.value.map(o=>{const u=t.data.find(s=>s.chatRoomId===o.chatRoomId);return{...o,unreadCount:u?u.count:0}}),c.value=c.value.map(o=>{const u=t.data.find(s=>s.chatRoomId===o.chatRoomId);return{...o,unreadCount:u?u.count:0}}))}catch(n){console.error("获取未读消息数量失败：",n)}},v=n=>{console.log("从 infoCard 获取到的 ID：",n)};return e.onShow(()=>{C(),f()}),(n,t)=>e.e({a:e.o(p),b:e.p({current:a.value,values:d.value,"style-type":g.value,"active-color":h.value}),c:a.value===0},a.value===0?e.e({d:r.value.length===0},r.value.length===0?{e:i._imports_0$2,f:i._imports_1$4}:{g:e.f(r.value,(o,u,s)=>e.e({a:e.t(o.name),b:o.icon||"../../static/images/队伍图标1.jpg",c:o.unreadCount&&o.unreadCount>0},o.unreadCount&&o.unreadCount>0?{d:e.t(o.unreadCount>99?"99+":o.unreadCount)}:{},{e:o.id,f:e.o(v,o.id),g:"779b4231-2-"+s+",779b4231-0",h:e.p({id:o.id,contentValue:"c"}),i:`/pages/chatRoom/chatRoom?chatRoomId=${o.chatRoomId}`,j:o.id}))}):{},{h:a.value===1},a.value===1?e.e({i:c.value.length===0},c.value.length===0?{j:i._imports_0$2,k:i._imports_1$4}:{l:e.f(c.value,(o,u,s)=>e.e({a:e.t(o.name),b:o.icon||"../../static/images/队伍图标2.jpg",c:o.unreadCount&&o.unreadCount>0},o.unreadCount&&o.unreadCount>0?{d:e.t(o.unreadCount>99?"99+":o.unreadCount)}:{},{e:o.id,f:"779b4231-3-"+s+",779b4231-0",g:e.p({id:o.id,contentValue:"b"}),h:`/pages/chatRoom/chatRoom?chatRoomId=${o.chatRoomId}`,i:o.id}))}):{},{m:e.p({title:"实心标签",type:"line"})})}},w=e._export_sfc(b,[["__scopeId","data-v-779b4231"]]);wx.createPage(w);
