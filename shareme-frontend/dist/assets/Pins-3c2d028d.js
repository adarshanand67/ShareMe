import{r,_ as n,j as i,a as e,d as _,e as a}from"./index-f979596c.js";import{N as c,h as p}from"./Home-2935b54b.js";const l=r.lazy(()=>n(()=>import("./index-e15b8346.js"),["assets/index-e15b8346.js","assets/index-f979596c.js","assets/index-7713ac56.css","assets/Home-2935b54b.js","assets/Contact-ecd3643f.js"]).then(t=>({default:t.Feed}))),d=r.lazy(()=>n(()=>import("./Contact-ecd3643f.js"),["assets/Contact-ecd3643f.js","assets/index-f979596c.js","assets/index-7713ac56.css"])),h=r.lazy(()=>n(()=>import("./index-e15b8346.js"),["assets/index-e15b8346.js","assets/index-f979596c.js","assets/index-7713ac56.css","assets/Home-2935b54b.js","assets/Contact-ecd3643f.js"]).then(t=>({default:t.CreatePin}))),m=r.lazy(()=>n(()=>import("./index-e15b8346.js"),["assets/index-e15b8346.js","assets/index-f979596c.js","assets/index-7713ac56.css","assets/Home-2935b54b.js","assets/Contact-ecd3643f.js"]).then(t=>({default:t.PinDetails}))),u=r.lazy(()=>n(()=>import("./index-e15b8346.js"),["assets/index-e15b8346.js","assets/index-f979596c.js","assets/index-7713ac56.css","assets/Home-2935b54b.js","assets/Contact-ecd3643f.js"]).then(t=>({default:t.Search}))),E=({user:t})=>{const[s,o]=r.useState("");return i("div",{className:"px-2 md:px-5",children:[e("div",{className:"bg-gray-50",children:e(c,{searchTerm:s,setSearchTerm:o,user:t&&t})}),e("div",{className:"h-full",children:i(_,{children:[e(a,{path:"/",element:e(l,{})})," ",e(a,{path:"/category/:categoryId",element:e(l,{})}),e(a,{path:"/contact",element:e(d,{})}),e(a,{path:"/pin-detail/:pinId",element:e(m,{user:t&&t})}),e(a,{path:"/create-pin",element:e(h,{user:t&&t})}),e(a,{path:"/search",element:e(u,{searchTerm:s,setSearchTerm:o})})]})})]})};E.propTypes={user:p.object};export{E as default};
