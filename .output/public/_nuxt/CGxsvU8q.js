import{J as h,K as f,o as m,t,x as u,L as i,M as a,y as l,N as y,O as g,v as r,B as _}from"./ZgYYGXXI.js";const x=h("userStore",{state:()=>({users:[],loading:!1,error:null}),actions:{async fetchUsers(){var o;this.loading=!0;try{const e=await fetch("/api/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`{
              users {
                id
                name
                email
              }
            }`})});if(!e.ok)throw new Error(`HTTP Error ${e.status}`);const s=await e.json();if(!((o=s==null?void 0:s.data)!=null&&o.users))throw new Error("Invalid GraphQL response");this.users=s.data.users}catch(e){this.error=e==null?void 0:e.message}finally{this.loading=!1}}}}),k={key:0},w={key:1,class:"text-red-500"},S={key:2,class:"mt-4 space-y-2"},N={__name:"index",setup(o){const e=x(),{users:s,loading:p,error:d}=f(e);return m(async()=>{await e.fetchUsers()}),(T,c)=>(r(),t("div",null,[c[0]||(c[0]=u("h1",{class:"text-2xl font-bold"},"User List",-1)),a(p)?(r(),t("p",k,"Loading...")):i("",!0),a(d)?(r(),t("p",w,l(a(d)),1)):i("",!0),a(s).length?(r(),t("ul",S,[(r(!0),t(y,null,g(a(s),n=>(r(),t("li",{key:n.id,class:"p-2 border rounded-lg"},[u("strong",null,l(n.name),1),_(" - "+l(n.email),1)]))),128))])):i("",!0)]))}};export{N as default};
