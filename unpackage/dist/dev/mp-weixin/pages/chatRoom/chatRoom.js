"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js");if(!Array){const c=e.resolveComponent("infoCard"),p=e.resolveComponent("uni-icons"),n=e.resolveComponent("transition"),t=e.resolveComponent("uni-popup-dialog"),u=e.resolveComponent("uni-popup");(c+p+n+t+u)()}const f=()=>"../../components/infoCard/infoCard.js",h=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",x=()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js",C=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||(f+h+x+C)();const z={__name:"chatRoom",setup(c){const p=e.ref([{type:1,text:"Hello!",time:"9:32"},{type:2,text:"Hi!",time:"9:33"}]),n=e.ref(""),t=e.ref(!1),u=e.ref(null),r=()=>{if(n.value.trim()){const s=new Date().toLocaleTimeString("zh-CN",{hour12:!1}).slice(0,5);p.value.push({type:2,text:n.value,time:s}),n.value=""}},m=()=>{t.value=!t.value},_=()=>{},g=()=>{console.log("111"),u.value.open(),msg.value="您确定要交换联系方式吗？"},y=()=>{const s="我的微信是: yangbaba",i=new Date().toLocaleTimeString("zh-CN",{hour12:!1}).slice(0,5);p.value.push({type:2,text:s,time:i})},v=s=>{e.index.previewImage({urls:[s],current:s})},d=()=>{e.index.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:s=>{const i=s.tempFilePaths[0],o=new Date().toLocaleTimeString("zh-CN",{hour12:!1}).slice(0,5);p.value.push({type:2,text:i,time:o,isImage:!0}),t.value=!1}})};return(s,i)=>({a:a._imports_0$6,b:e.f(p.value,(o,l,T)=>e.e({a:o.type==1},o.type==1?{b:a._imports_1$1,c:e.t(o.text),d:e.t(o.time)}:{},{e:o.type==2},o.type==2?e.e({f:!o.isImage},o.isImage?{i:o.text,j:e.o(b=>v(o.text),l),k:e.t(o.time)}:{g:e.t(o.text),h:e.t(o.time)},{l:a._imports_0$1}):{},{m:l})),c:e.o([o=>n.value=o.detail.value,_]),d:n.value,e:e.o(m),f:!n.value,g:e.p({type:"plus",size:"40"}),h:n.value,i:e.o(r),j:e.p({type:"image",size:"40"}),k:e.o(d),l:e.p({type:"camera",size:"40"}),m:e.p({type:"email",size:"40"}),n:e.p({type:"phone",size:"40"}),o:e.p({type:"location",size:"40"}),p:e.p({type:"weixin",size:"40"}),q:e.o(g),r:t.value,s:e.p({name:"slide-up"}),t:t.value?1:"",v:e.o(y),w:e.p({type:"success",cancelText:"取消",confirmText:"确定",content:"您确定要交换联系方式吗?"}),x:e.sr(u,"9b186cfb-9",{k:"isOpen"}),y:e.p({type:"dialog"})})}},w=e._export_sfc(z,[["__scopeId","data-v-9b186cfb"]]);wx.createPage(w);
