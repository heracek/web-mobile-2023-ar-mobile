import{d,i as _,a as p,u as h,b as u,c as m,e as f,f as n,g as t,t as s,h as a,F as g,r as v,n as b,j as x,o as r,k as y,l as k,m as N,p as w,q as P,_ as S}from"./index-078c8733.js";import{N as V}from"./NoteDisplay-c21e08be.js";const j={class:"m-4"},D={class:"mb-10"},L={class:"text-4xl font-bold mt-2"},T={class:"opacity-50"},B={class:"text-lg"},C={class:"font-bold flex gap-2"},H={class:"opacity-50"},z=t("div",{class:"flex-auto"},null,-1),F={key:0,class:"border-gray-400/50 mb-8"},M=d({__name:"PresenterPrint",setup(q){_(p),h(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),u({title:`Notes - ${m.title}`});const i=f(()=>x.map(o=>{var l;return(l=o.meta)==null?void 0:l.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,l)=>(r(),n("div",{id:"page-root",style:b(a(P))},[t("div",j,[t("div",D,[t("h1",L,s(a(m).title),1),t("div",T,s(new Date().toLocaleString()),1)]),(r(!0),n(g,null,v(a(i),(e,c)=>(r(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",B,[t("div",C,[t("div",H,s(e==null?void 0:e.no)+"/"+s(a(y)),1),k(" "+s(e==null?void 0:e.title)+" ",1),z])]),N(V,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<a(i).length-1?(r(),n("hr",F)):w("v-if",!0)]))),128))])],4))}}),R=S(M,[["__file","/Users/horacek/Documents/work/code/cngroup.dk/web-and-mobile/ar-mobile-2023/presentation/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{R as default};
