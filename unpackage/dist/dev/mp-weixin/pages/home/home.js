"use strict";const o=require("../../common/vendor.js"),t=require("../../common/assets.js"),n=require("../../api/contest.js"),c={__name:"home",setup(m){const e=o.ref(!0),r=o.ref([]),_=async()=>{try{const s=await n.getContest();r.value=s.data,console.log("成功")}catch(s){console.log("111222",s)}};console.log("111",r.value),o.onMounted(()=>{_()});const i=()=>{o.index.navigateTo({url:"/pages/editProfile/editProfile"})};return(s,p)=>o.e({a:t._imports_0$1,b:e.value},e.value?{c:t._imports_0$4}:{},{d:!e.value},e.value?{}:{e:t._imports_1$4},{f:t._imports_3$2,g:o.o(i),h:t._imports_4$1,i:t._imports_5$1,j:t._imports_6,k:t._imports_7$1,l:t._imports_8,m:t._imports_9,n:t._imports_10,o:t._imports_8})}},a=o._export_sfc(c,[["__scopeId","data-v-07e72d3c"]]);wx.createPage(a);
