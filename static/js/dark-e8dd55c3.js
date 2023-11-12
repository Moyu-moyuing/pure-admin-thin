import{ac as k,p as i,aK as Q,ab as J,l as K,V as v,W as b,m,J as U,s as q,n as L,R as X,u as Y,aL as Z,E as ee,aI as w,aM as te,a3 as ne,aN as ae,o as I,c as P,b as $}from"./index-ca7ab5f3.js";import{u as B}from"./hooks-faaf39b5.js";import{u as oe}from"./user-3be56ec8.js";function ue(){const{$storage:t,$config:e}=k(),a=()=>{Q().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=J),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},n=i(()=>t==null?void 0:t.layout.layout),o=i(()=>t.layout);return{layout:n,layoutTheme:o,initStorage:a}}const le=K({id:"pure-app",state:()=>{var t,e;return{sidebar:{opened:((t=v().getItem(`${b()}layout`))==null?void 0:t.sidebarStatus)??m().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:((e=v().getItem(`${b()}layout`))==null?void 0:e.layout)??m().Layout,device:U()?"mobile":"desktop"}},getters:{getSidebarStatus(t){return t.sidebar.opened},getDevice(t){return t.device}},actions:{TOGGLE_SIDEBAR(t,e){const a=v().getItem(`${b()}layout`);t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,a.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,a.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,a.sidebarStatus=this.sidebar.opened),v().setItem(`${b()}layout`,a)},async toggleSideBar(t,e){await this.TOGGLE_SIDEBAR(t,e)},toggleDevice(t){this.device=t},setLayout(t){this.layout=t}}});function se(){return le(q)}const S={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"E:/novel_GPT/pure-admin-thin/node_modules/.pnpm/@pureadmin+theme@3.1.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
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
      `}]},re="/pure-admin-thin/",ie="assets";function z(t){let e=t.replace("#","").match(/../g);for(let a=0;a<3;a++)e[a]=parseInt(e[a],16);return e}function D(t,e,a){let n=[t.toString(16),e.toString(16),a.toString(16)];for(let o=0;o<3;o++)n[o].length==1&&(n[o]=`0${n[o]}`);return`#${n.join("")}`}function fe(t,e){let a=z(t);for(let n=0;n<3;n++)a[n]=Math.floor(a[n]*(1-e));return D(a[0],a[1],a[2])}function de(t,e){let a=z(t);for(let n=0;n<3;n++)a[n]=Math.floor((255-a[n])*e+a[n]);return D(a[0],a[1],a[2])}function H(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function E({scopeName:t,multipleScopeVars:e}){const a=Array.isArray(e)&&e.length?e:S.multipleScopeVars;let n=document.documentElement.className;new RegExp(H(t)).test(n)||(a.forEach(o=>{n=n.replace(new RegExp(H(o.scopeName),"g"),` ${t} `)}),document.documentElement.className=n.replace(/(^\s+|\s+$)/g,""))}function _({id:t,href:e}){const a=document.createElement("link");return a.rel="stylesheet",a.href=e,a.id=t,a}function ce(t){const e={scopeName:"theme-default",customLinkHref:r=>r,...t},a=e.themeLinkTagId||S.themeLinkTagId;let n=document.getElementById(a);const o=e.customLinkHref(`${re.replace(/\/$/,"")}${`/${ie}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(n){n.id=`${a}_old`;const r=_({id:a,href:o});n.nextSibling?n.parentNode.insertBefore(r,n.nextSibling):n.parentNode.appendChild(r),r.onload=()=>{setTimeout(()=>{n.parentNode.removeChild(n),n=null},60),E(e)};return}n=_({id:a,href:o}),E(e),document[(e.themeLinkTagInjectTo||S.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(n)}function xe(){var f;const{layoutTheme:t,layout:e}=ue(),a=L([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:n}=k(),o=L((f=n==null?void 0:n.layout)==null?void 0:f.darkMode),r=document.documentElement;function c(s=m().Theme??"default"){var l,d;if(t.value.theme=s,ce({scopeName:`layout-theme-${s}`}),n.layout={layout:e.value,theme:s,darkMode:o.value,sidebarStatus:(l=n.layout)==null?void 0:l.sidebarStatus,epThemeColor:(d=n.layout)==null?void 0:d.epThemeColor},s==="default"||s==="light")h(m().EpThemeColor);else{const y=a.value.find(C=>C.themeColor===s);h(y.color)}}function g(s,l,d){document.documentElement.style.setProperty(`--el-color-primary-${s}-${l}`,o.value?fe(d,l/10):de(d,l/10))}const h=s=>{B().setEpThemeColor(s),document.documentElement.style.setProperty("--el-color-primary",s);for(let l=1;l<=2;l++)g("dark",l,s);for(let l=1;l<=9;l++)g("light",l,s)};function T(){B().epTheme==="light"&&o.value?c("default"):c(B().epTheme),o.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:r,dataTheme:o,layoutTheme:t,themeColors:a,dataThemeChange:T,setEpThemeColor:h,setLayoutThemeColor:c}}function me(t){return{all:t=t||new Map,on:function(e,a){var n=t.get(e);n?n.push(a):t.set(e,[a])},off:function(e,a){var n=t.get(e);n&&(a?n.splice(n.indexOf(a)>>>0,1):t.set(e,[]))},emit:function(e,a){var n=t.get(e);n&&n.slice().map(function(o){o(a)}),(n=t.get("*"))&&n.slice().map(function(o){o(e,a)})}}}const N=me(),he="当前路由配置不正确，请检查配置";function Le(){var A;const t=X(),e=se(),a=Y().options.routes,{wholeMenus:n}=Z(ee()),o=((A=m())==null?void 0:A.TooltipEffect)??"light",r=i(()=>({width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",overflow:"hidden"})),c=i(()=>{var u;return(u=w())==null?void 0:u.username}),g=i(()=>c.value?{marginRight:"10px"}:""),h=i(()=>!e.getSidebarStatus),T=i(()=>e.getDevice),{$storage:f,$config:s}=k(),l=i(()=>{var u;return(u=f==null?void 0:f.layout)==null?void 0:u.layout}),d=i(()=>s.Title);function y(u){const p=m().Title;p?document.title=`${u.title} | ${p}`:document.title=u.title}function C(){w().logOut()}function R(){var u;te.push((u=ne())==null?void 0:u.path)}function G(){N.emit("openPanel")}function j(){e.toggleSideBar()}function O(u){u==null||u.handleResize()}function V(u){var x;if(!u.children)return console.error(he);const p=/^http(s?):\/\//,M=(x=u.children[0])==null?void 0:x.path;return p.test(M)?u.path+"/"+M:M}function F(u){n.value.length===0||W(u)||N.emit("changLayoutRoute",u)}function W(u){return ae.includes(u)}return{route:t,title:d,device:T,layout:l,logout:C,routers:a,$storage:f,backTopMenu:R,onPanel:G,getDivStyle:r,changeTitle:y,toggleSideBar:j,menuSelect:F,handleResize:O,resolvePath:V,isCollapse:h,pureApp:e,username:c,userAvatar:oe,avatarsStyle:g,tooltipEffect:o}}const ge={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},pe=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),ve=$("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),be=[pe,ve];function $e(t,e){return I(),P("svg",ge,be)}const we={render:$e},Te={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},ye=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Ce=$("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),Me=[ye,Ce];function Be(t,e){return I(),P("svg",Te,Me)}const He={render:Be};export{xe as a,se as b,He as c,we as d,N as e,ue as f,ce as t,Le as u};
