(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{12:function(e,t,n){"use strict";var r=n(7);t.a=new function e(){var t=this;Object(r.a)(this,e),this.isName=function(e){return RegExp(t.namePattern).test(e)},this.isSurname=function(e){return RegExp(t.surnamePattern).test(e)},this.isEmail=function(e){return RegExp(t.emailPattern).test(e)},this.isDate=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Date(parseInt(t)+1+"/"+n+"/"+e);return r.getFullYear()===parseInt(e)&&r.getMonth()===parseInt(t)&&r.getDate()===parseInt(n)},this.isOldEnough=function(e){return(new Date).getFullYear()-parseInt(e)>=5},this.isDigit=function(e){return/^\d{1}$/.test(e)},this.isDigits=function(e){return/^\d+$/.test(e)},this.checkPassword=function(e){var t=0,n=Object.freeze({0:"Worst",1:"Bad",2:"Weak",3:"Good",4:"Strong"});return e.length>=8&&t++,/[a-z]/gi.test(e)&&t++,/\d/g.test(e)&&t++,/[.@#$%^&*(),.?":{}|<>]/g.test(e)&&t++,{isStrong:4===t,level:t,strength:n[t]}},this.getCookie=function(e){var t=document.cookie.split("; ").map((function(e){return e.split("=")})).find((function(t){return t[0]===e}));return Array.isArray(t)&&t.length?t[1]:void 0},this.setCookie=function(e){return Object.entries(e).map((function(e){return document.cookie=e[0]+"="+e[1]}))},this.deleteCookie=function(e){return document.cookie=e+"= Max-Age=0"},this.clearCookies=function(){return document.cookie.split(" ").map((function(e){return e.split("=")})).forEach((function(e){return document.cookie=e[0]+"= Max-Age=0"}))},this.loggedIn=function(){return Boolean(t.getCookie("name"))},this.namePattern="^[A-Z]{1}[a-z]*$",this.surnamePattern="^[A-Z]{1}[a-z]*(?: [A-Z]{1}[a-z]*)*(?: [A-Z]{1}[a-z]*)?$",this.emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"}},16:function(e,t,n){"use strict";var r=n(29),o=n.n(r).a.create({withCredentials:!0,credentials:"include",mode:"cors",timeout:2e4,headers:{"Content-Type":"application/json",Accept:"application/json"}});o.interceptors.response.use((function(e){return e}),(function(e){var t;return e.response?alert(500===e.response.status?e.response.data.error:(null===(t=e.response.data)||void 0===t?void 0:t.trim())?e.response.data:e.response.statusText):console.error(e),Promise.reject(e)})),t.a=o},20:function(e,t,n){"use strict";var r=n(7),o=n(16),a="".concat("https://xis16.herokuapp.com/","auth/");t.a=new function e(){Object(r.a)(this,e),this.login=function(e){return o.a.post(a,e)},this.available=function(e){return o.a.get("".concat(a,"?email=").concat(e))},this.logout=function(){return o.a.delete(a)}}},39:function(e,t,n){},40:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(8),i=n.n(a),s=(n(39),n(7)),c=n(11),l=n(10),u=(n(40),n(32)),d=n(4),h=n(9),p=n(12),j=n(20),g=n(3),f=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).render=function(){return Object(g.jsx)("div",{className:"avatar",style:{color:"#"+"0".repeat(6-(parseInt("ffffff",16)-parseInt(e.props.avatar.slice(1),16)).toString(16).length)+(parseInt("ffffff",16)-parseInt(e.props.avatar.slice(1),16)).toString(16),background:e.props.avatar,width:e.props.width,height:e.props.height,fontSize:e.props.fontSize},children:Object(g.jsx)("strong",{children:e.props.name[0]})})},e}return n}(r.Component),m=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).toggle=function(){return r.setState({isHover:!r.state.isHover})},r.toggleDropdown=function(){return r.setState({dropdownOpened:!r.state.dropdownOpened})},r.componentDidMount=function(){return p.a.loggedIn()},r.componentDidUpdate=function(){return window.onresize=function(){r.setState({width:window.innerWidth}),r.state.opened&&r.open()}},r.logout=function(){return j.a.logout().then((function(){return window.location.href="/"}))},r.render=function(){return Object(g.jsxs)("header",{children:[Object(g.jsxs)("a",{className:"logo",href:"/",onMouseEnter:r.toggle,onMouseLeave:r.toggle,children:[Object(g.jsx)("img",{className:"logo-img ".concat(r.state.width>560&&"mr-1"),src:"logo.svg",alt:"Logo",hidden:r.state.isHover}),Object(g.jsx)("img",{className:"logo-img ".concat(r.state.width>560&&"mr-1"),src:"logo.hover.svg",alt:"Hover logo",hidden:!r.state.isHover})]}),Object(g.jsxs)(h.a,{className:"dropdown-avatar",isOpen:r.state.dropdownOpened,toggle:r.toggleDropdown,children:[p.a.loggedIn()?Object(g.jsx)(h.d,{className:"dropdown-toggle-avatar",title:p.a.getCookie("name")+" "+p.a.getCookie("surname"),children:Object(g.jsx)(f,{avatar:decodeURIComponent(p.a.getCookie("avatar")),name:p.a.getCookie("name"),width:"44px",height:"44px",fontSize:"33px"})}):Object(g.jsx)("a",{className:"link-help",href:"/help",target:"_blank",children:Object(g.jsx)("i",{className:"material-icons",children:"help_outline"})}),Object(g.jsxs)(h.c,{className:"dropdown-menu-avatar",children:[Object(g.jsxs)(h.b,{className:"dropdown-item-normal",tag:"a",href:"/profile",children:[Object(g.jsx)("p",{className:"text-profile",children:"My profile"}),Object(g.jsx)("i",{className:"material-icons",children:"info"})]}),Object(g.jsx)(h.b,{divider:!0}),Object(g.jsxs)(h.b,{className:"dropdown-item-normal",tag:"a",href:"/help",children:[Object(g.jsx)("p",{className:"text-help",children:"Help"}),Object(g.jsx)("i",{className:"material-icons",children:"help_outline"})]}),Object(g.jsx)(h.b,{divider:!0}),Object(g.jsxs)(h.b,{className:"dropdown-item-danger",onClick:r.logout,children:[Object(g.jsx)("p",{className:"text-logout",children:"Sign out"}),Object(g.jsx)("i",{className:"material-icons",children:"logout"})]})]})]})]})},r.state={avatar:"",role:"",selected:!1,opened:!1,keyword:"",width:window.innerWidth,dropdownOpened:!1,isHover:!1},r}return n}(r.Component),b=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).render=function(){return Object(g.jsx)("main",{children:Object(g.jsx)("section",{className:"section-only section-loader",children:Object(g.jsx)("div",{className:"spinner-border text-primary",role:"status",children:Object(g.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})})},e}return n}(r.Component),O=Object(r.lazy)((function(){return n.e(3).then(n.bind(null,72))})),v=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(s.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).render=function(){return Object(g.jsxs)(u.a,{children:[Object(g.jsx)(m,{}),Object(g.jsx)(r.Suspense,{fallback:Object(g.jsx)(b,{}),children:Object(g.jsx)(d.c,{children:Object(g.jsx)(d.a,{exact:!0,path:"/",element:Object(g.jsx)(O,{})})})})]})},e}return n}(r.Component),x=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,71)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),o(e),a(e),i(e)}))};i.a.render(Object(g.jsx)(o.a.StrictMode,{children:Object(g.jsx)(v,{})}),document.getElementById("root")),x()}},[[62,1,2]]]);
//# sourceMappingURL=main.d9d0674f.chunk.js.map