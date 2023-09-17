import{ac as x,p as i,aF as X,ab as Y,l as z,V as f,W as d,m as c,J as Z,s as D,n as w,d as B,ae as S,aG as ee,aH as H,aI as te,R as ne,u as oe,aJ as ae,E as ue,aC as E,aK as le,a3 as se,aL as re,o as O,c as G,b}from"./index-97d77e05.js";import{u as ie}from"./user-3be56ec8.js";function fe(){const{$storage:t,$config:e}=x(),o=()=>{X().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=Y),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},n=i(()=>t==null?void 0:t.layout.layout),a=i(()=>t.layout);return{layout:n,layoutTheme:a,initStorage:o}}const de=z({id:"pure-app",state:()=>{var t,e;return{sidebar:{opened:((t=f().getItem(`${d()}layout`))==null?void 0:t.sidebarStatus)??c().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:((e=f().getItem(`${d()}layout`))==null?void 0:e.layout)??c().Layout,device:Z()?"mobile":"desktop"}},getters:{getSidebarStatus(t){return t.sidebar.opened},getDevice(t){return t.device}},actions:{TOGGLE_SIDEBAR(t,e){const o=f().getItem(`${d()}layout`);t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,o.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,o.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,o.sidebarStatus=this.sidebar.opened),f().setItem(`${d()}layout`,o)},async toggleSideBar(t,e){await this.TOGGLE_SIDEBAR(t,e)},toggleDevice(t){this.device=t},setLayout(t){this.layout=t}}});function ce(){return de(D)}const me=z({id:"pure-epTheme",state:()=>{var t,e;return{epThemeColor:((t=f().getItem(`${d()}layout`))==null?void 0:t.epThemeColor)??c().EpThemeColor,epTheme:((e=f().getItem(`${d()}layout`))==null?void 0:e.theme)??c().Theme}},getters:{getEpThemeColor(t){return t.epThemeColor},fill(t){return t.epTheme==="light"?"#409eff":t.epTheme==="yellow"?"#d25f00":"#fff"}},actions:{setEpThemeColor(t){const e=f().getItem(`${d()}layout`);this.epTheme=e==null?void 0:e.theme,this.epThemeColor=t,e&&(e.epThemeColor=t,f().setItem(`${d()}layout`,e))}}});function k(){return me(D)}const A={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"E:/novel_GPT/pure-admin-thin/node_modules/.pnpm/@pureadmin+theme@3.1.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: #4091f7 !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #409eff !default;
        $menuBg: #fff !default;
        $menuHover: #e0ebf6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: #e13c39 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: #e85f33 !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-yellow",varsContent:`
        $subMenuActiveText: #d25f00 !default;
        $menuBg: #2b2503 !default;
        $menuHover: #f6da4d !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #f6da4d !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #443b05 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #f6da4d !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: #59bfc1 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: #60ac80 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: #d84493 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: #693ac9 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `}]},he="/pure-admin-thin/",pe="assets";function j(t){let e=t.replace("#","").match(/../g);for(let o=0;o<3;o++)e[o]=parseInt(e[o],16);return e}function F(t,e,o){let n=[t.toString(16),e.toString(16),o.toString(16)];for(let a=0;a<3;a++)n[a].length==1&&(n[a]=`0${n[a]}`);return`#${n.join("")}`}function ge(t,e){let o=j(t);for(let n=0;n<3;n++)o[n]=Math.floor(o[n]*(1-e));return F(o[0],o[1],o[2])}function ve(t,e){let o=j(t);for(let n=0;n<3;n++)o[n]=Math.floor((255-o[n])*e+o[n]);return F(o[0],o[1],o[2])}function _(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function N({scopeName:t,multipleScopeVars:e}){const o=Array.isArray(e)&&e.length?e:A.multipleScopeVars;let n=document.documentElement.className;new RegExp(_(t)).test(n)||(o.forEach(a=>{n=n.replace(new RegExp(_(a.scopeName),"g"),` ${t} `)}),document.documentElement.className=n.replace(/(^\s+|\s+$)/g,""))}function P({id:t,href:e}){const o=document.createElement("link");return o.rel="stylesheet",o.href=e,o.id=t,o}function Te(t){const e={scopeName:"theme-default",customLinkHref:r=>r,...t},o=e.themeLinkTagId||A.themeLinkTagId;let n=document.getElementById(o);const a=e.customLinkHref(`${he.replace(/\/$/,"")}${`/${pe}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(n){n.id=`${o}_old`;const r=P({id:o,href:a});n.nextSibling?n.parentNode.insertBefore(r,n.nextSibling):n.parentNode.appendChild(r),r.onload=()=>{setTimeout(()=>{n.parentNode.removeChild(n),n=null},60),N(e)};return}n=P({id:o,href:a}),N(e),document[(e.themeLinkTagInjectTo||A.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(n)}function Ee(){var m;const{layoutTheme:t,layout:e}=fe(),o=w([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:n}=x(),a=w((m=n==null?void 0:n.layout)==null?void 0:m.darkMode),r=document.documentElement;function p(s=c().Theme??"default"){var l,h;if(t.value.theme=s,Te({scopeName:`layout-theme-${s}`}),n.layout={layout:e.value,theme:s,darkMode:a.value,sidebarStatus:(l=n.layout)==null?void 0:l.sidebarStatus,epThemeColor:(h=n.layout)==null?void 0:h.epThemeColor},s==="default"||s==="light")g(c().EpThemeColor);else{const y=o.value.find(C=>C.themeColor===s);g(y.color)}}function v(s,l,h){document.documentElement.style.setProperty(`--el-color-primary-${s}-${l}`,a.value?ge(h,l/10):ve(h,l/10))}const g=s=>{k().setEpThemeColor(s),document.documentElement.style.setProperty("--el-color-primary",s);for(let l=1;l<=2;l++)v("dark",l,s);for(let l=1;l<=9;l++)v("light",l,s)};function $(){k().epTheme==="light"&&a.value?p("default"):p(k().epTheme),a.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:r,dataTheme:a,layoutTheme:t,themeColors:o,dataThemeChange:$,setEpThemeColor:g,setLayoutThemeColor:p}}function _e(t,e){const o=/^IF-/;if(o.test(t)){const n=t.split(o)[1],a=n.slice(0,n.indexOf(" ")==-1?n.length:n.indexOf(" ")),r=n.slice(n.indexOf(" ")+1,n.length);return B({name:"FontIcon",render(){return S(ee,{icon:a,iconType:r,...e})}})}else return typeof t=="function"||typeof(t==null?void 0:t.render)=="function"?t:typeof t=="object"?B({name:"OfflineIcon",render(){return S(H,{icon:t,...e})}}):B({name:"Icon",render(){const n=t&&t.includes(":")?te:H;return S(n,{icon:t,...e})}})}function be(t){return{all:t=t||new Map,on:function(e,o){var n=t.get(e);n?n.push(o):t.set(e,[o])},off:function(e,o){var n=t.get(e);n&&(o?n.splice(n.indexOf(o)>>>0,1):t.set(e,[]))},emit:function(e,o){var n=t.get(e);n&&n.slice().map(function(a){a(o)}),(n=t.get("*"))&&n.slice().map(function(a){a(e,o)})}}}const R=be(),$e="当前路由配置不正确，请检查配置";function Ne(){var I;const t=ne(),e=ce(),o=oe().options.routes,{wholeMenus:n}=ae(ue()),a=((I=c())==null?void 0:I.TooltipEffect)??"light",r=i(()=>({width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",overflow:"hidden"})),p=i(()=>{var u;return(u=E())==null?void 0:u.username}),v=i(()=>p.value?{marginRight:"10px"}:""),g=i(()=>!e.getSidebarStatus),$=i(()=>e.getDevice),{$storage:m,$config:s}=x(),l=i(()=>{var u;return(u=m==null?void 0:m.layout)==null?void 0:u.layout}),h=i(()=>s.Title);function y(u){const T=c().Title;T?document.title=`${u.title} | ${T}`:document.title=u.title}function C(){E().logOut()}function V(){var u;le.push((u=se())==null?void 0:u.path)}function W(){R.emit("openPanel")}function J(){e.toggleSideBar()}function Q(u){u==null||u.handleResize()}function K(u){var L;if(!u.children)return console.error($e);const T=/^http(s?):\/\//,M=(L=u.children[0])==null?void 0:L.path;return T.test(M)?u.path+"/"+M:M}function U(u){n.value.length===0||q(u)||R.emit("changLayoutRoute",u)}function q(u){return re.includes(u)}return{route:t,title:h,device:$,layout:l,logout:C,routers:o,$storage:m,backTopMenu:V,onPanel:W,getDivStyle:r,changeTitle:y,toggleSideBar:J,menuSelect:U,handleResize:Q,resolvePath:K,isCollapse:g,pureApp:e,username:p,userAvatar:ie,avatarsStyle:v,tooltipEffect:a}}const ye={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},Ce=b("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Me=b("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),Be=[Ce,Me];function Se(t,e){return O(),G("svg",ye,Be)}const Pe={render:Se},ke={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},Ae=b("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),xe=b("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),Ie=[Ae,xe];function Le(t,e){return O(),G("svg",ke,Ie)}const Re={render:Le};export{_e as a,Ne as b,Ee as c,ce as d,R as e,Pe as f,Re as g,fe as h,Te as t,k as u};
