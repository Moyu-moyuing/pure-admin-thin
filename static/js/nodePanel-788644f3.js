import{d as D,r as c,f as L,w as v,o as s,i as k,j as i,a as _,h as f,b as e,g as a,B as n,c as t,z as d,x as P,v as g,F as x,ah as F,ai as j,a6 as E,_ as H}from"./index-97d77e05.js";import{u as o}from"./controlD3-95e699f4.js";const p=h=>(F("data-v-481ca983"),h=h(),j(),h),T={class:"h-48"},$={key:1,class:"flex items-center mb-5"},q=p(()=>e("span",{class:"inline-block w-24"},"名称：",-1)),A={class:"inline-block w-24"},G={key:2,class:"flex items-center mb-5"},J=p(()=>e("span",{class:"inline-block w-24"},"类型：",-1)),K={class:"inline-block w-24"},M={key:3,class:"flex items-center mb-5"},O=p(()=>e("span",{class:"inline-block w-24"},"颜色：",-1)),Q={class:"inline-block w-24"},R={class:"relationships"},U={key:0,class:"flex items-center mb-5"},W=p(()=>e("span",{class:"inline-block w-24"},"关系：",-1)),X={class:"inline-block w-24"},Y={key:1,class:"flex items-center mb-5"},Z=p(()=>e("span",{class:"inline-block w-24"},"源节点：",-1)),ee={class:"inline-block w-24"},se={key:2,class:"flex items-center mb-5"},te=p(()=>e("span",{class:"inline-block w-24"},"目标节点：",-1)),ae={class:"inline-block w-24"},ne=D({name:"NodePanel"}),oe=D({...ne,props:{node:{},links:{},color:{},allLinks:{},loading:{}},emits:["tagSelect"],setup(h,{emit:S}){const l=h,C=m=>{S("tagSelect",m)};return(m,le)=>{const b=c("el-divider"),w=c("el-empty"),N=c("el-icon"),B=c("el-button"),z=c("el-space"),y=c("el-tab-pane"),I=c("el-tabs"),V=L("loading");return v((s(),k(I,{stretch:!0,class:"shadow-[0_4px_6px_-1px_rgb(128,128,128)] overflow-auto text-black dark:text-white bg-white dark:bg-black"},{default:i(()=>[_(y,{label:"基本数据信息"},{default:i(()=>[_(b,null,{default:i(()=>[f("节点信息")]),_:1}),e("div",T,[a(o)().hasData?n("",!0):(s(),k(w,{key:0,description:"暂无数据",class:"h-5/6"})),a(o)().hasData?(s(),t("div",$,[q,e("span",A,d(l.node.name),1)])):n("",!0),a(o)().hasData?(s(),t("div",G,[J,e("span",K,d(l.node.type),1)])):n("",!0),a(o)().hasData?(s(),t("div",M,[O,e("span",Q,[_(N,{style:P([{margin:"0.1em 0.1em 0 0","border-radius":"2px"},{background:l.color}]),size:20},null,8,["style"])])])):n("",!0)]),_(b,null,{default:i(()=>[f("关系标签")]),_:1}),_(z,{wrap:"",class:"ml-3"},{default:i(()=>[(s(!0),t(x,null,g(l.allLinks,(r,u)=>(s(),k(B,{key:u,type:"primary",plain:"",size:"small",onClick:ce=>C(r)},{default:i(()=>[f(d(r),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1}),_(y,{label:"关系信息"},{default:i(()=>[!a(o)().hasData||l.links.length===0?(s(),k(w,{key:0,description:"暂无数据"})):n("",!0),(s(!0),t(x,null,g(l.links,(r,u)=>(s(),t("div",{key:u},[e("ul",R,[a(o)().hasData?(s(),t("li",U,[W,e("span",X,d(r.relationship),1)])):n("",!0),a(o)().hasData?(s(),t("li",Y,[Z,e("span",ee,d(r.source),1)])):n("",!0),a(o)().hasData?(s(),t("li",se,[te,e("span",ae,d(r.target),1)])):n("",!0)]),v(_(b,null,null,512),[[E,u!==l.links.length-1]])]))),128))]),_:1})]),_:1})),[[V,m.loading]])}}});const re=H(oe,[["__scopeId","data-v-481ca983"]]);export{re as default};