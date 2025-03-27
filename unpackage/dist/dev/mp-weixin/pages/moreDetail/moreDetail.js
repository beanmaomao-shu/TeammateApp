"use strict";const e=require("../../common/vendor.js"),n=require("../../common/assets.js"),y=require("../../api/contest.js");if(!Array){const u=e.resolveComponent("dash"),r=e.resolveComponent("wei-dropdown-menu");(u+r)()}const w=()=>"../../components/dash/dash.js",b=()=>"../../uni_modules/wei-dropdown-menu/components/wei-dropdown-menu/wei-dropdown-menu.js";Math||(w+b)();const C={__name:"moreDetail",setup(u){const r=e.ref({}),i=e.ref({});e.ref({});const l=e.ref(),c=e.ref([]),s=e.ref();e.ref(!1);const p=()=>{l.value="",s.value="",i.value={},teamRegionValue.value={}},m=async()=>{try{const a=await y.getContest();c.value=a.data,console.log(c.value)}catch(a){console.log("111",a)}},v=a=>{console.log("选择的类型：",a);const o={0:"IT",1:"理科",2:"文学",3:"外语"};l.value=o[a.value.matchCategory],console.log("筛选类型：",l.value)},_=a=>{console.log("选择的地区：",a);const o={0:"广东",1:"上海",2:"湖南"};s.value=o[a.value.teamRegion],console.log("筛选地区：",s.value)},d=e.ref([{name:"recentMatch",title:"近期比赛",options:[{label:"全部比赛",value:"all",tip:"显示全部比赛"}]}]),g=e.ref([{name:"matchCategory",title:"比赛类别",options:[{label:"IT",value:"0",tip:"IT类比赛"},{label:"理科",value:"1",tip:"理科类比赛"},{label:"文学",value:"2",tip:"文学类比赛"},{label:"外语",value:"3",tip:"外语类比赛"}]}]),f=e.ref([{name:"teamRegion",title:"组队赛区",options:[{label:"广东",value:"0",tip:"广东赛区"},{label:"上海",value:"1",tip:"上海赛区"},{label:"湖南",value:"2",tip:"湖南赛区"}]}]);e.ref("");const h=e.computed(()=>{if(!l.value&&!s.value)return c.value;let a=c.value;return l.value&&(a=a.filter(o=>o.type===l.value)),s.value&&(a=a.filter(o=>o.location===s.value)),a});return e.onMounted(()=>{m()}),(a,o)=>({a:e.p({Color:"#E5E5E5",Width:"780rpx",Height:"10rpx"}),b:e.o(p),c:e.p({data:d.value,value:r.value}),d:e.o(v),e:e.p({data:g.value,value:i.value}),f:e.o(_),g:e.p({data:f.value,value:a.teamRegionValue}),h:e.f(h.value,(t,M,L)=>e.e({a:t.poster,b:e.t(t.name),c:t.teamList&&t.teamList.length},t.teamList&&t.teamList.length?{d:n._imports_0,e:e.t(t.teamList[0].name)}:{},{f:`/pages/teamDetail/teamDetail?id=${t.id}`,g:t.id})),i:n._imports_1$1,j:n._imports_2$1,k:n._imports_0$1,l:n._imports_0$1,m:n._imports_4,n:n._imports_5})}},D=e._export_sfc(C,[["__scopeId","data-v-c2e090e7"]]);wx.createPage(D);
