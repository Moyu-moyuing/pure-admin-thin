import{d as r,p,n as d,o as c,c as m,b as n,z as s,O as u}from"./index-97d77e05.js";const y={class:"whitespace-normal"},v=["id"],x={class:"text-[var(--el-color-primary)] text-sm font-bold ml-2 uppercase align-middle"},f=r({name:"EntityLabel"}),g=r({...f,props:{entity:{}},setup(a){const t=a,i=p(()=>`entity-${t.entity.id}`),o=d(!1);return(_,e)=>(c(),m("span",y,[n("mark",{class:u(["cursor-pointer relative text-inherit my-0 mx-[0.15rem] inline px-1 py-[0.4rem] bg-[#ffe184] font-bold leading-none box-decoration-clone rounded-lg",o.value?"border-4 border-[var(--el-color-primary)]":"border-0"]),onMouseover:e[0]||(e[0]=l=>o.value=!0),onMouseout:e[1]||(e[1]=l=>o.value=!1)},[n("span",{class:"mr-[-1px] mx-[1px] my-0 inline-block relative",id:i.value},s(t.entity.text),9,v),n("span",x,s(t.entity.type),1)],34)]))}});export{g as _};