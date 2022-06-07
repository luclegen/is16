(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{75:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},76:function(e,t,a){"use strict";var n=a(7),c=a(14),s="".concat(window.location.origin+"/api","/users/");t.a=new function e(){Object(n.a)(this,e),this.create=function(e){return c.a.post(s,e)},this.read=function(e){return c.a.get("".concat(s).concat(e))},this.update=function(e){return c.a.put("".concat(s).concat(e.id),e)},this.list=function(e){return c.a.get("".concat(s,"?name=").concat(e))}}},77:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return b}));var n=a(75),c=a(7),s=a(24),i=a(12),l=a(11),r=a(1),o=a(23),d=a(76),j=a(8),u=a(3),b=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).componentDidMount=function(){return i.setProfile()},i.setProfile=function(){var e,t;return d.a.read(null===(e=window.location.pathname)||void 0===e||null===(t=e.split("/"))||void 0===t?void 0:t[1]).then((function(e){return i.setState({name:j.a.getCookie("name"),surname:j.a.getCookie("surname")})||i.setState(e.data)}))},i.setValue=function(e){return i.setState(Object(n.a)({},e.target.name,e.target.value))},i.cancel=function(){return i.setProfile()&&i.setState({edit:!1})},i.submit=function(e){return e.preventDefault()||(i.state.edit?d.a.update(i.state).then((function(e){return i.setProfile()&&j.a.setCookie(e.data)&&window.location.reload()&&i.setState({edit:!1})})):i.setState({edit:!0}))},i.render=function(){var e,t;return Object(u.jsx)("main",{children:Object(u.jsx)("section",{className:"section-only",children:Object(u.jsx)("form",{className:"form-only",onSubmit:i.submit,children:Object(u.jsxs)("table",{className:"table table-bordered",children:[Object(u.jsxs)("thead",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("th",{className:"text-center",scope:"col",colSpan:2,children:"PROFILE"})}),Object(u.jsx)("tr",{children:Object(u.jsx)("th",{scope:"col",colSpan:2,children:Object(u.jsx)("div",{className:"container-only",children:Object(u.jsx)(o.a,{avatar:i.state.avatar,name:i.state.fullName,width:"200px",height:"200px",fontSize:"150px"})})})})]}),Object(u.jsxs)("tbody",{children:[i.state.edit&&Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Avatar"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{type:"color",className:"form-control",name:"avatar",value:i.state.avatar,onChange:i.setValue})})]}),!i.state.edit&&Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Full name"}),Object(u.jsx)("td",{children:i.state.fullName})]}),i.state.edit&&Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Name"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{className:"form-control",type:"text",name:"name",value:i.state.name,onChange:i.setValue})})]}),i.state.edit&&Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Surname"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{className:"form-control",type:"text",name:"surname",value:i.state.surname,onChange:i.setValue})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Email"}),Object(u.jsx)("td",{children:i.state.edit?Object(u.jsx)("input",{className:"form-control",type:"text",name:"email",value:i.state.email,onChange:i.setValue}):i.state.email})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Date of birth"}),Object(u.jsx)("td",{children:i.state.edit?Object(u.jsx)("input",{className:"form-control",type:"date",name:"dob",value:i.state.dob,onChange:i.setValue}):new Date(i.state.dob).getMonth()+1+"/"+new Date(i.state.dob).getDate()+"/"+new Date(i.state.dob).getFullYear()})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{className:"align-middle",scope:"row",children:"Sex"}),Object(u.jsx)("td",{children:i.state.edit?Object(u.jsxs)("select",{className:"form-select",name:"sex",value:i.state.sex,onChange:i.setValue,children:[Object(u.jsx)("option",{value:"Male",children:"Male"}),Object(u.jsx)("option",{value:"Female",children:"Female"}),Object(u.jsx)("option",{value:"Other",children:"Other"})]}):i.state.sex})]}),(null===(e=window.location.pathname)||void 0===e||null===(t=e.split("/"))||void 0===t?void 0:t[1])===j.a.getId()&&Object(u.jsx)("tr",{children:Object(u.jsx)("td",{colSpan:2,children:Object(u.jsxs)("div",{className:"container-only",children:[Object(u.jsx)("button",{className:"btn-profile text-".concat(i.state.edit?"warning":"info"),title:i.state.edit?"Save":"Edit",type:"submit",children:Object(u.jsx)("i",{className:"material-icons",children:i.state.edit?"save":"edit"})}),i.state.edit&&Object(u.jsx)("button",{className:"btn-profile text-danger",title:"Cancel",type:"button",onClick:i.cancel,children:Object(u.jsx)("i",{className:"material-icons",children:"cancel"})})]})})})]})]})})})})},i.setValue=i.setValue.bind(Object(s.a)(i)),i.state={id:"",avatar:"",fullName:"",email:"",sex:"",name:"",surname:"",edit:!1},i}return a}(r.Component)}}]);
//# sourceMappingURL=4.b2e6ec6c.chunk.js.map