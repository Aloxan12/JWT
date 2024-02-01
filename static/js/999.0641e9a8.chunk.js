"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[999],{3023:function(t,e,n){n.r(e),n.d(e,{default:function(){return H}});var s=n(9439),i=n(2791),r="Posts_postBlock__TuvF-",a="Posts_postsItems__6kXGQ",o=n(1088),l=n(4782),u=n(3433),c=n(9744),d=n(361),p=n(4687),f=n(429),h=n(8649).iJ.injectEndpoints({endpoints:function(t){return{getAllPosts:t.query({query:function(t){return{url:"/posts",params:t||{}}},providesTags:["Posts","Users"]}),createPosts:t.mutation({query:function(t){return{url:"/posts",method:"POST",body:t}}}),likePost:t.mutation({query:function(t){var e=t.id;return{url:"/posts/".concat(e,"/like"),method:"PATCH"}},invalidatesTags:function(t,e,n){return[{type:"Posts",id:n.id}]}}),deletePost:t.mutation({query:function(t){var e=t.id;return{url:"/posts/".concat(e),method:"DELETE"}},invalidatesTags:function(t,e,n){return[{type:"Posts",id:n.id}]}})}}}),m=h.useGetAllPostsQuery,g=h.useCreatePostsMutation,x=h.useLikePostMutation,k=h.useDeletePostMutation,v=n(2426),j=n.n(v),_=n(2597),b=n(3329),C=function(t){var e=t.setCurrentData,n=(0,_.v9)((function(t){return t.auth.user})),r=(0,i.useState)(""),a=(0,s.Z)(r,2),o=a[0],l=a[1],h=g(),m=(0,s.Z)(h,2),x=m[0],k=m[1].isLoading;return(0,b.jsxs)(p.k,{direction:"column",align:"start",max:!0,gap:"16",children:[(0,b.jsx)(c.W,{value:o,onChange:l,fullWidth:!0,rows:"3"}),(0,b.jsx)(d.J,{title:"\u041e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u0442\u044c",onClick:function(){n&&""!==o&&x({author:n.id,postText:o,publicDate:j()(new Date).toISOString()}).then((function(t){var n=t.data.post;l(""),e((function(t){return[n].concat((0,u.Z)(t))})),(0,f.y)({msg:"\u041f\u043e\u0441\u0442 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d".replace(/"/g,""),type:f.p.success})}))},theme:"full-bg",disabled:!o,isLoading:k})]})},P=n(1413),L=n(4942),Z={postsItem:"Post_postsItem__WtXR8",postDateBlock:"Post_postDateBlock__dkPvd",email:"Post_email__RlJ5t",postLikeBlock:"Post_postLikeBlock__pPpJ5",likeActive:"Post_likeActive__D9EwX",likeLoading:"Post_likeLoading__uCHUm",postsItemContent:"Post_postsItemContent__pyt4f"},D=n(7460),y=n.p+"static/media/trash.ff6de8f4b8e11b0d507d.png",T={trash:"AppTrash_trash__kZGY9",small:"AppTrash_small__abggq",medium:"AppTrash_medium__Wbl99",big:"AppTrash_big__1D8jV",trashModelContent:"AppTrash_trashModelContent__dpjKk"},w=n(3678),A=n(4813),S=n(3546),I=function(t){var e=t.size,n=void 0===e?"big":e,r=t.deleteHandler,a=t.text,o=(0,i.useState)(!1),l=(0,s.Z)(o,2),u=l[0],c=l[1],f=function(){return c(!1)};return(0,b.jsxs)(i.Fragment,{children:[(0,b.jsx)(w.e,{src:y,alt:"\u043a\u043e\u0440\u0437\u0438\u043d\u0430",className:(0,S.A)(T.trash,{},[T[n]]),onClick:function(){return c(!0)}}),(0,b.jsx)(A.l,{isOpen:u,onClose:f,title:"\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435",lazy:!0,children:(0,b.jsxs)(p.k,{direction:"column",gap:"16",align:"start",children:[(0,b.jsx)("div",{children:a||"\u0423\u0434\u0430\u043b\u0438\u0442\u044c?"}),(0,b.jsxs)(p.k,{justify:"between",max:!0,children:[(0,b.jsx)(d.J,{onClick:f,title:"\u043d\u0435\u0442",theme:"full-bg"}),(0,b.jsx)(d.J,{onClick:function(){r(f)},theme:"full-bg",title:"\u0434\u0430"})]})]})})]})},R=n.p+"static/media/like.5f22da937dbad35f573f.png",B=n(6070),M=n(4634),N=(0,i.memo)((function(t){var e,n=t.post,r=t.isAdmin,a=t.measureRef,o=t.likePost,l=t.deletePost,u=t.likeLoading,c=(0,i.useState)(null),d=(0,s.Z)(c,2),f=d[0],h=d[1],m=(0,L.Z)({},Z.likeActive,n.isLike);return(0,b.jsxs)("li",{className:Z.postsItem,ref:a,children:[(0,b.jsxs)(p.k,{max:!0,justify:"between",children:[(0,b.jsxs)(p.k,{gap:"8",children:[(0,b.jsx)(B.J,{src:(null===(e=n.author)||void 0===e?void 0:e.avatar)||""}),(0,b.jsx)(M.K,{text:n.author.email,color:"violet",bold:"600",isEllipsis:!0,className:Z.email})]}),(0,b.jsxs)(p.k,{gap:"8",onClick:function(){h(n.id)},children:[(0,b.jsxs)("div",{className:(0,S.A)(Z.postLikeBlock,(0,P.Z)((0,P.Z)({},m),{},(0,L.Z)({},Z.likeLoading,u&&f===n.id)),[]),onClick:o(n.id),children:[(0,b.jsx)(w.e,{src:R,alt:"like",width:20,height:20}),n.likeCount]}),r&&(0,b.jsx)("div",{className:Z.postTrashBlock,children:(0,b.jsx)(I,{deleteHandler:l(n.id),size:"medium",text:"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0439 \u043f\u043e\u0441\u0442?"})})]})]}),(0,b.jsx)("div",{className:Z.postDateBlock,children:(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{children:"\u041e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043e:"})," ",j()(n.publicDate).format("DD-MM-YYYY")||"\u0414\u0430\u0442\u0430 \u043d\u0435 \u0437\u0430\u0444\u0438\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u0430"]})}),(0,b.jsx)("div",{className:Z.postsItemContent,children:(0,D.RV)(n.postText)})]})})),E=n(8071),J=n(2035),q=n(5637),Y=function(){return(0,b.jsxs)(p.k,{align:"start",direction:"column",gap:"32",max:!0,children:[(0,b.jsx)(q.D,{width:"100%",height:"130px",border:"12px"}),(0,b.jsx)(q.D,{width:"100%",height:"130px",border:"12px"}),(0,b.jsx)(q.D,{width:"100%",height:"130px",border:"12px"}),(0,b.jsx)(q.D,{width:"100%",height:"130px",border:"12px"})]})},F=function(t){var e=t.dataList,n=t.measureRef,r=t.isLoading,o=t.setCurrentData,l=(0,E.CG)(J.s),u=function(t){var e=x(),n=(0,s.Z)(e,1)[0],r=(0,i.useState)(null),a=(0,s.Z)(r,2),o=a[0],l=a[1];return[(0,i.useCallback)((function(e){return function(){l(e),n({id:e}).then((function(e){var n,s=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.post;s&&t((function(t){return t.map((function(t){return s.id===t.id?s:t}))}))})).finally((function(){return l(null)}))}}),[]),o]}(o),c=(0,s.Z)(u,2),d=c[0],p=c[1],h=function(t){var e=k(),n=(0,s.Z)(e,1)[0],r=(0,i.useState)(null),a=(0,s.Z)(r,2),o=a[0],l=a[1];return[(0,i.useCallback)((function(e){return function(s){l(o),n({id:e}).then((function(){(0,f.y)({msg:"\u041f\u043e\u0441\u0442 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d",type:f.p.info}),t((function(t){return t.filter((function(t){return t.id!==e}))})),null===s||void 0===s||s()})).finally((function(){return l(null)}))}}),[]),o]}(o),m=(0,s.Z)(h,2),g=m[0],v=m[1];return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("ul",{className:a,children:e.map((function(t,e,s){var i=e===s.length-1;return(0,b.jsx)(N,{isAdmin:l,post:t,measureRef:i?n:void 0,likeLoading:t.id===p,likePost:d,deleteLoading:t.id===v,deletePost:g},t.id)}))}),r&&(0,b.jsx)(Y,{})]})},G=function(t){var e=t.getter,n=t.page,r=t.setPage,a=(0,i.useState)([]),o=(0,s.Z)(a,2),l=o[0],c=o[1],d=e({page:n,limit:10}),p=d.data,f=d.isLoading,h=d.isFetching,m=p||{},g=m.prevPage,x=m.nextPage,k=m.results,v=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.root,n=void 0===e?null:e,r=t.rootMargin,a=void 0===r?"0px":r,o=t.threshold,l=void 0===o?0:o,u=(0,i.useState)(),c=(0,s.Z)(u,2),d=c[0],p=c[1],f=(0,i.useState)(!1),h=(0,s.Z)(f,2),m=h[0],g=h[1],x=(0,i.useCallback)((function(t){if(t){var e=new IntersectionObserver((function(t){var e=(0,s.Z)(t,1)[0];g(e.isIntersecting)}),{root:n,rootMargin:a,threshold:l});e.observe(t),p(e)}}),[n,a,l]);return{measureRef:x,isIntersecting:m,observer:d}}(),j=v.measureRef,_=v.isIntersecting,b=v.observer,C=(0,i.useCallback)((function(){r((function(t){return t+1}))}),[]);return(0,i.useEffect)((function(){_&&x&&(C(),null===b||void 0===b||b.disconnect())}),[_,x,C]),(0,i.useEffect)((function(){k&&!g&&c(k),k&&g&&c((function(t){return[].concat((0,u.Z)(t),(0,u.Z)(k))}))}),[k,g]),{dataList:l,measureRef:j,isLoading:f||h,setCurrentData:c}},H=function(){var t=(0,i.useState)(1),e=(0,s.Z)(t,2),n=e[0],a=e[1],u=G({getter:m,page:n,setPage:a}),c=u.dataList,d=u.measureRef,p=u.isLoading,f=u.setCurrentData;return(0,b.jsxs)(l.C,{classNameContent:r,max:!0,boxShadow:!0,withoutBorder:!0,children:[(0,b.jsx)(o.d,{title:"\u041f\u043e\u0441\u0442\u044b",titleTag:"h1",align:"center"}),(0,b.jsx)(C,{setCurrentData:f}),(0,b.jsx)(F,{dataList:c,setCurrentData:f,measureRef:d,isLoading:p})]})}}}]);
//# sourceMappingURL=999.0641e9a8.chunk.js.map