import{S as q,i as E,s as L,k as d,a as y,q as C,l as h,c as v,m as I,r as N,h as p,n as c,b as f,P as b,C as S,L as P,u as B,D as U,Q as D}from"../chunks/index.50850451.js";import{a as F,b as O,g as Q,c as j}from"../chunks/firebase.b9d28424.js";function z(i){let s,n,t,r,u,m,_,o,a,w,k;return{c(){s=d("input"),n=y(),t=d("input"),r=y(),u=d("button"),m=C("log in"),_=y(),o=d("p"),a=C(i[2]),this.h()},l(e){s=h(e,"INPUT",{type:!0,placeholder:!0}),n=v(e),t=h(e,"INPUT",{type:!0,placeholder:!0}),r=v(e),u=h(e,"BUTTON",{});var l=I(u);m=N(l,"log in"),l.forEach(p),_=v(e),o=h(e,"P",{class:!0});var T=I(o);a=N(T,i[2]),T.forEach(p),this.h()},h(){c(s,"type","text"),c(s,"placeholder","email"),c(t,"type","password"),c(t,"placeholder","password"),c(o,"class","error svelte-35ndk0")},m(e,l){f(e,s,l),b(s,i[0]),f(e,n,l),f(e,t,l),b(t,i[1]),f(e,r,l),f(e,u,l),S(u,m),f(e,_,l),f(e,o,l),S(o,a),w||(k=[P(s,"input",i[3]),P(t,"input",i[4]),P(u,"click",i[5])],w=!0)},p(e,[l]){l&1&&s.value!==e[0]&&b(s,e[0]),l&2&&t.value!==e[1]&&b(t,e[1]),l&4&&B(a,e[2])},i:U,o:U,d(e){e&&p(s),e&&p(n),e&&p(t),e&&p(r),e&&p(u),e&&p(_),e&&p(o),w=!1,D(k)}}}function A(i,s,n){let{email:t=""}=s,{password:r=""}=s,u="";F.subscribe(a=>{a.isLoggedIn&&O&&a.firebaseControlled&&Q("./")});function m(){t=this.value,n(0,t)}function _(){r=this.value,n(1,r)}const o=async()=>{n(2,u=(await j(t,r)).split("Firebase: ")[1])};return i.$$set=a=>{"email"in a&&n(0,t=a.email),"password"in a&&n(1,r=a.password)},[t,r,u,m,_,o]}class J extends q{constructor(s){super(),E(this,s,A,z,L,{email:0,password:1})}}export{J as default};
