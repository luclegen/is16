(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3],{69:function(e,t,a){e.exports=a(70)},70:function(e,t,a){var r=function(e){"use strict";var t,a=Object.prototype,r=a.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},s=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",o=n.toStringTag||"@@toStringTag";function c(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(I){c=function(e,t,a){return e[t]=a}}function l(e,t,a,r){var n=t&&t.prototype instanceof g?t:g,s=Object.create(n.prototype),i=new _(r||[]);return s._invoke=function(e,t,a){var r=d;return function(n,s){if(r===h)throw new Error("Generator is already running");if(r===p){if("throw"===n)throw s;return P()}for(a.method=n,a.arg=s;;){var i=a.delegate;if(i){var o=S(i,a);if(o){if(o===f)continue;return o}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(r===d)throw r=p,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);r=h;var c=u(e,t,a);if("normal"===c.type){if(r=a.done?p:m,c.arg===f)continue;return{value:c.arg,done:a.done}}"throw"===c.type&&(r=p,a.method="throw",a.arg=c.arg)}}}(e,a,i),s}function u(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(I){return{type:"throw",arg:I}}}e.wrap=l;var d="suspendedStart",m="suspendedYield",h="executing",p="completed",f={};function g(){}function b(){}function j(){}var v={};c(v,s,(function(){return this}));var x=Object.getPrototypeOf,y=x&&x(x(R([])));y&&y!==a&&r.call(y,s)&&(v=y);var O=j.prototype=g.prototype=Object.create(v);function w(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function N(e,t){function a(n,s,i,o){var c=u(e[n],e,s);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"===typeof d&&r.call(d,"__await")?t.resolve(d.__await).then((function(e){a("next",e,i,o)}),(function(e){a("throw",e,i,o)})):t.resolve(d).then((function(e){l.value=e,i(l)}),(function(e){return a("throw",e,i,o)}))}o(c.arg)}var n;this._invoke=function(e,r){function s(){return new t((function(t,n){a(e,r,t,n)}))}return n=n?n.then(s,s):s()}}function S(e,a){var r=e.iterator[a.method];if(r===t){if(a.delegate=null,"throw"===a.method){if(e.iterator.return&&(a.method="return",a.arg=t,S(e,a),"throw"===a.method))return f;a.method="throw",a.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=u(r,e.iterator,a.arg);if("throw"===n.type)return a.method="throw",a.arg=n.arg,a.delegate=null,f;var s=n.arg;return s?s.done?(a[e.resultName]=s.value,a.next=e.nextLoc,"return"!==a.method&&(a.method="next",a.arg=t),a.delegate=null,f):s:(a.method="throw",a.arg=new TypeError("iterator result is not an object"),a.delegate=null,f)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function R(e){if(e){var a=e[s];if(a)return a.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function a(){for(;++n<e.length;)if(r.call(e,n))return a.value=e[n],a.done=!1,a;return a.value=t,a.done=!0,a};return i.next=i}}return{next:P}}function P(){return{value:t,done:!0}}return b.prototype=j,c(O,"constructor",j),c(j,"constructor",b),b.displayName=c(j,o,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,j):(e.__proto__=j,c(e,o,"GeneratorFunction")),e.prototype=Object.create(O),e},e.awrap=function(e){return{__await:e}},w(N.prototype),c(N.prototype,i,(function(){return this})),e.AsyncIterator=N,e.async=function(t,a,r,n,s){void 0===s&&(s=Promise);var i=new N(l(t,a,r,n),s);return e.isGeneratorFunction(a)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},w(O),c(O,o,"Generator"),c(O,s,(function(){return this})),c(O,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var a in e)t.push(a);return t.reverse(),function a(){for(;t.length;){var r=t.pop();if(r in e)return a.value=r,a.done=!1,a}return a.done=!0,a}},e.values=R,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(E),!e)for(var a in this)"t"===a.charAt(0)&&r.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var a=this;function n(r,n){return o.type="throw",o.arg=e,a.next=r,n&&(a.method="next",a.arg=t),!!n}for(var s=this.tryEntries.length-1;s>=0;--s){var i=this.tryEntries[s],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),l=r.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var s=n;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var i=s?s.completion:{};return i.type=e,i.arg=t,s?(this.method="next",this.next=s.finallyLoc,f):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),E(a),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var r=a.completion;if("throw"===r.type){var n=r.arg;E(a)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,a,r){return this.delegate={iterator:R(e),resultName:a,nextLoc:r},"next"===this.method&&(this.arg=t),f}},e}(e.exports);try{regeneratorRuntime=r}catch(n){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},72:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var r=a(7),n=a(11),s=a(10),i=a(1),o=a(69),c=a.n(o);function l(e,t,a,r,n,s,i){try{var o=e[s](i),c=o.value}catch(l){return void a(l)}o.done?t(c):Promise.resolve(c).then(r,n)}function u(e){return function(){var t=this,a=arguments;return new Promise((function(r,n){var s=e.apply(t,a);function i(e){l(s,r,n,i,o,"next",e)}function o(e){l(s,r,n,i,o,"throw",e)}i(void 0)}))}}var d=a(19),m=a(12),h=a(20),p=a(16),f="".concat("https://xis16.herokuapp.com/","codes/"),g=new function e(){Object(r.a)(this,e),this.create=function(e){return p.a.post(f,e)}},b="".concat("https://xis16.herokuapp.com/","users/"),j=new function e(){Object(r.a)(this,e),this.create=function(e){return p.a.post(b,e)}},v=a(3),x=Object.freeze({FEMALE:"Female",MALE:"Male",OTHER:"Other"}),y={name:"",surname:"",email:"",password:"",confirm:"",day:(new Date).getDate(),month:(new Date).getMonth()+1,year:(new Date).getFullYear(),sex:"",code:"",available:!0,sent:!1,submitted:!1},O=function(e){Object(n.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).setName=function(e){return n.setState({name:e.target.value})},n.setSurname=function(e){return n.setState({surname:e.target.value})},n.setEmail=function(e){return n.setState({email:e.target.value})},n.setPassword=function(e){return n.setState({password:e.target.value})},n.setConfirm=function(e){return n.setState({confirm:e.target.value})},n.setDay=function(e){return n.setState({day:parseInt(e.target.value)})},n.setMonth=function(e){return n.setState({month:parseInt(e.target.value)})},n.setYear=function(e){return n.setState({year:parseInt(e.target.value)})},n.setSex=function(e){return n.setState({sex:e.target.value})},n.isCode=function(){return 6==="0".repeat(6).split("").map((function(e,t){return document.querySelectorAll(".input-digit")[t].value})).filter((function(e){return m.a.isDigit(e)})).length},n.setCode=function(){return n.setState({code:n.isCode()?Array.from(document.querySelectorAll(".input-digit")).map((function(e){return e.value})).join(""):""})},n.getInput=function(){return document.querySelectorAll(".input-digit")},n.getIndex=function(e){return Array.from(document.querySelector(".row-code").children).findIndex((function(t){return t===e}))},n.checkSex=function(e){var t=e.target.className.split(" ")[0];if("form-check-female"===t||"form-check-male"===t||"form-check-other"===t){var a=Array.from(e.target.children)[1];a.checked=!0,n.setState({sex:a.value})}},n.enterName=function(e){return e.target.setCustomValidity(e.target.value?m.a.isName(e.target.value)?"":"Invalid first name.":"This field is required.")},n.enterSurname=function(e){return e.target.setCustomValidity(e.target.value?m.a.isSurname(e.target.value)?"":"Invalid last name.":"This field is required.")},n.enterEmail=function(){var e=u(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.available(t.target.value);case 2:e.t0=e.sent.status,a=200===e.t0,n.setState({available:a}),t.target.setCustomValidity(t.target.value?m.a.isEmail(t.target.value)?a?"":"Email is duplicate.":"Invalid email.":"This field is required.");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.enterPassword=function(e){var t=m.a.checkPassword(e.target.value);e.target.setCustomValidity(e.target.value?t.isStrong?"":"Please choose a stronger password. Try a mix of letters, numbers, and symbols (minimum is 8 characters)!":"This field is required."),document.querySelector("meter").value=t.level,n.setState({strength:t.strength})},n.enterConfirm=function(e){return e.target.setCustomValidity(e.target.value?e.target.value===n.state.password?"":"The passwords do not match.":"This field is required.")},n.enterDigit=function(e){var t=[n.getIndex(e.target.closest(".col-md")),n.getInput()],a=t[0],r=t[1];if(e.target.value.length>1)return r[a].value=e.target.value[0];a<5&&m.a.isDigit(r[a].value)&&1===r[a].value.length&&r[a+1].focus(),n.setCode()},n.clearDigit=function(e){var t=[n.getIndex(e.target.closest(".col-md")),n.getInput()],a=t[0],r=t[1];8===e.keyCode&&a>0&&""===e.target.value&&r[a-1].select(),n.isCode()||n.setState({code:Array.from(document.querySelectorAll(".input-digit")).map((function(e){return e.value})).join("")}),n.setCode()},n.pasteDigit=function(e){var t=[n.getIndex(e.target.closest(".col-md")),n.getInput()],a=t[0],r=t[1],s=(e.clipboardData||window.clipboardData).getData("text"),i=s.length>6-a?6-a:s.length,o=i+a>5?5:i+a;setTimeout((function(){r[a].value=m.a.isDigit(s[0])?s[0]:null,m.a.isDigits(s)&&r[o].focus()}));for(var c=a,l=0;l<i;c++,l++)r[c].value=m.a.isDigit(s[l])?s[l]:null;n.setCode()},n.chooseDob=function(e){document.querySelector("#dayRegister").setCustomValidity(m.a.isDate("yearRegister"===e.target.id?e.target.value:n.state.year,"monthRegister"===e.target.id?e.target.value:n.state.month,"dayRegister"===e.target.id?e.target.value:n.state.day)?"":"Invalid date of birth."),document.querySelector("#yearRegister").setCustomValidity((new Date).getFullYear()-parseInt("yearRegister"===e.target.id?e.target.value:n.state.year)>=5?"":"You must be 5 years or older")},n.chooseSex=function(){return document.querySelector("#femaleRegister").setCustomValidity(n.state.sex?"":"Please select one of these options")},n.getIsValidDob=function(){return(n.state.submitted||n.state.day!==(new Date).getDate()||n.state.month!==(new Date).getMonth()+1||n.state.year!==(new Date).getFullYear())&&(m.a.isDate(n.state.year,n.state.month,n.state.day)&&m.a.isOldEnough(n.state.year)?"is-valid":"is-invalid")},n.send=function(){return m.a.isEmail(n.state.email)&&g.create({email:n.state.email}).then((function(e){return window.open(e.data)&&n.setState({sent:!0})}))},n.submit=function(e){e.preventDefault(),n.setState({submitted:!0}),n.state.password===n.state.confirm&&n.state.name&&n.state.surname&&n.state.email&&n.state.password&&n.state.confirm&&n.state.day&&n.state.month&&n.state.year&&n.state.code&&(document.querySelector("#femaleRegister").setCustomValidity(n.state.sex?"":"Please select one of these options"),document.querySelector("#yearRegister").setCustomValidity(m.a.isOldEnough(n.state.year)?"":"You must be 5 years or older"),j.create(n.state).then((function(e){alert(e.data),document.querySelector(".form-register").reset(),document.querySelector("meter").value=0,n.setState(y)})).catch((function(e){var t;return 410===(null===(t=e.response)||void 0===t?void 0:t.status)&&Array.from(document.querySelectorAll(".input-digit")).map((function(e){return e.value=""}))})))},n.componentDidUpdate=function(){return window.onbeforeunload=function(){return!!(n.state.name||n.state.surname||n.state.email||n.state.password||n.state.day||n.state.month||n.state.year||n.state.sex||n.state.code)||void 0}},n.render=function(){return Object(v.jsx)("section",{className:"section-register",children:Object(v.jsxs)("form",{className:"form-register",onSubmit:n.submit,children:[Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("div",{className:"col-dm d-flex justify-content-end",children:Object(v.jsx)("button",{className:"btn-close",type:"reset",onClick:n.props.close})})}),Object(v.jsx)("h1",{className:"h1-register",children:"Sign Up"}),Object(v.jsxs)("div",{className:"row-name",children:[Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-name",children:[Object(v.jsx)("input",{className:"form-control ".concat(n.state.name&&(m.a.isName(n.state.name)?"is-valid":"is-invalid")),id:"nameRegister",type:"text",placeholder:"Name",value:n.state.name,pattern:m.a.namePattern,onInput:n.enterName,onInvalid:n.enterName,onChange:n.setName,required:!0}),Object(v.jsx)("label",{htmlFor:"nameRegister",children:"Name"})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-surname",children:[Object(v.jsx)("input",{className:"form-control ".concat(n.state.surname&&(m.a.isSurname(n.state.surname)?"is-valid":"is-invalid")),id:"surnameRegister",type:"text",placeholder:"Surname",pattern:m.a.surnamePattern,onInput:n.enterSurname,onInvalid:n.enterSurname,onChange:n.setSurname,required:!0}),Object(v.jsx)("label",{htmlFor:"surnameRegister",children:"Surname"})]})})]}),Object(v.jsxs)("div",{className:"form-floating-email",children:[Object(v.jsx)("input",{className:"form-control ".concat(n.state.email&&(m.a.isEmail(n.state.email)&&n.state.available?"is-valid":"is-invalid")),id:"addressRegister",type:"email",placeholder:"Email",pattern:m.a.emailPattern,onInput:n.enterEmail,onInvalid:n.enterEmail,onChange:n.setEmail,required:!0}),Object(v.jsx)("label",{htmlFor:"addressRegister",children:"Email"})]}),Object(v.jsxs)("div",{className:"row-password",children:[Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-password",children:[Object(v.jsx)("input",{className:"form-control ".concat(n.state.password&&(m.a.checkPassword(n.state.password).isStrong?"is-valid":"is-invalid")),id:"passwordRegister",type:"password",placeholder:"Password",minLength:"8",onInput:n.enterPassword,onChange:n.setPassword,required:!0}),Object(v.jsx)("label",{htmlFor:"passwordRegister",children:"Password"})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-confirm",children:[Object(v.jsx)("input",{className:"form-control ".concat(n.state.confirm&&(n.state.confirm===n.state.password?"is-valid":"is-invalid")),id:"confirmRegister",type:"password",placeholder:"Confirm",onInput:n.enterConfirm,onInvalid:n.enterConfirm,onChange:n.setConfirm,required:!0}),Object(v.jsx)("label",{htmlFor:"confirmRegister",children:"Confirm"})]})})]}),Object(v.jsx)("meter",{id:"passwordStrengthRegister",title:"Use 8 or more characters with a mix of letters, numbers, and symbols",max:"4",value:"0"}),Object(v.jsx)("div",{className:"input-group-password-strength",children:n.state.strength&&Object(v.jsx)("label",{className:"password-strength",htmlFor:"passwordStrengthRegister",children:m.a.checkPassword(n.state.password).strength})}),Object(v.jsx)("label",{className:"label-group ".concat(n.getIsValidDob()),htmlFor:"dobRegister",children:"Date of birth"}),Object(v.jsxs)("div",{className:"row-dob",id:"dobRegister",children:[Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-day",children:[Object(v.jsx)("select",{className:"form-select-day ".concat(n.getIsValidDob()),id:"dayRegister",placeholder:"Day",value:n.state.day,onInput:n.chooseDob,onChange:n.setDay,required:!0,children:"0".repeat(31).split("").map((function(e,t){return Object(v.jsx)("option",{value:t+1,children:t+1},t)}))}),Object(v.jsx)("label",{htmlFor:"dayRegister",children:"Day"})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-month",children:[Object(v.jsx)("select",{className:"form-select-month ".concat(n.getIsValidDob()),id:"monthRegister",placeholder:"Month",value:n.state.month,onInput:n.chooseDob,onChange:n.setMonth,required:!0,children:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((function(e,t){return Object(v.jsx)("option",{value:t+1,children:e},t)}))}),Object(v.jsx)("label",{htmlFor:"monthRegister",children:"Month"})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-floating-year",children:[Object(v.jsx)("select",{className:"form-select-year ".concat(n.getIsValidDob()),id:"yearRegister",placeholder:"Year",value:n.state.year,"aria-describedby":"validationDob",onInput:n.chooseDob,onChange:n.setYear,required:!0,children:"0".repeat(200).split("").map((function(e,t){return Object(v.jsx)("option",{value:(new Date).getFullYear()-t,children:(new Date).getFullYear()-t},t)}))}),Object(v.jsx)("label",{htmlFor:"yearRegister",children:"Year"})]})})]}),Object(v.jsx)("label",{className:"label-group ".concat(n.state.sex?"is-valid":n.state.submitted&&!n.state.sex&&"is-invalid"),htmlFor:"genderRegister",children:"Gender"}),Object(v.jsxs)("div",{className:"row-gender",id:"genderRegister",children:[Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-check-female ".concat(n.state.sex?"is-valid":n.state.submitted&&!n.state.sex&&"is-invalid"),onClick:n.checkSex,children:[Object(v.jsx)("label",{className:"label-female",htmlFor:"femaleRegister",children:"Female"}),Object(v.jsx)("input",{className:"input-female",id:"femaleRegister",type:"radio",name:"sex",value:x.FEMALE,checked:n.state.sex===x.FEMALE,onInput:n.chooseSex,onChange:n.setSex})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-check-male ".concat(n.state.sex?"is-valid":n.state.submitted&&!n.state.sex&&"is-invalid"),onClick:n.checkSex,children:[Object(v.jsx)("label",{className:"label-male",htmlFor:"maleRegister",children:"Male"}),Object(v.jsx)("input",{className:"input-male",id:"maleRegister",type:"radio",name:"sex",value:x.MALE,checked:n.state.sex===x.MALE,onInput:n.chooseSex,onChange:n.setSex})]})}),Object(v.jsx)("div",{className:"col-md",children:Object(v.jsxs)("div",{className:"form-check-other ".concat(n.state.sex?"is-valid":n.state.submitted&&!n.state.sex&&"is-invalid"),onClick:n.checkSex,children:[Object(v.jsx)("label",{className:"label-other",htmlFor:"otherRegister",children:"Other"}),Object(v.jsx)("input",{className:"input-other",id:"otherRegister",type:"radio",name:"sex",value:x.OTHER,checked:n.state.sex===x.OTHER,onInput:n.chooseSex,onChange:n.setSex})]})})]}),Object(v.jsx)("label",{className:"label-group",htmlFor:"genderRegister",children:"Code"}),Object(v.jsx)("div",{className:"row-code",id:"codeRegister",children:"0".repeat(6).split("").map((function(e,t){return Object(v.jsx)("div",{className:"col-md",children:Object(v.jsx)("input",{className:"input-digit",type:"number",maxLength:"1",onClick:function(e){return e.target.select()},onInput:n.enterDigit,onDrop:n.enterDigit,onKeyUp:n.clearDigit,onKeyDown:n.clearDigit,onPaste:n.pasteDigit,required:!0})},t)}))}),Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("div",{className:"col-dm d-flex justify-content-center",children:n.state.code?Object(v.jsx)("button",{className:"btn-sign-up",type:"submit",children:"Sign Up"}):Object(v.jsxs)("button",{className:"btn-get-code",type:"button",onClick:n.send,children:[n.state.sent?"Resend":"Send"," Code"]})})})]})})},n.setName=n.setName.bind(Object(d.a)(n)),n.setSurname=n.setSurname.bind(Object(d.a)(n)),n.setEmail=n.setEmail.bind(Object(d.a)(n)),n.setPassword=n.setPassword.bind(Object(d.a)(n)),n.setConfirm=n.setConfirm.bind(Object(d.a)(n)),n.setDay=n.setDay.bind(Object(d.a)(n)),n.setMonth=n.setMonth.bind(Object(d.a)(n)),n.setYear=n.setYear.bind(Object(d.a)(n)),n.setSex=n.setSex.bind(Object(d.a)(n)),n.state=y,n}return a}(i.Component),w={email:"",password:"",remembered:!1,available:!1,visible:!1,opened:!1},N=function(e){Object(n.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).setEmail=function(e){return n.setState({email:e.target.value})},n.setPassword=function(e){return n.setState({password:e.target.value})},n.setRemembered=function(e){return n.setState({remembered:e.target.checked})},n.enterEmail=function(){var e=u(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.target.value){e.next=8;break}return e.next=3,h.a.available(t.target.value);case 3:e.t0=e.sent.status,a=200===e.t0,t.target.setCustomValidity(m.a.isEmail(t.target.value)?a?"Email not registered":"":"Invalid email!"),n.setState({available:a,visible:!1,password:""}),setTimeout((function(){document.querySelector(".input-group-password")&&(document.querySelector(".input-group-password").style.height=0),document.querySelector(".input-email").style.width="260px"}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.open=function(){return n.setState({opened:!0})},n.close=function(){return n.setState({opened:!1})},n.onSubmit=function(e){e.preventDefault(),n.state.email&&(n.setState({visible:!0}),setTimeout(u(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelector(".input-group-password").style.height="39px",document.querySelector(".input-email").style.width="315px",document.querySelector(".input-password").focus(),n.state.password&&h.a.login(n.state).then((function(){return n.state=w&&setTimeout((function(){return window.location.reload()}))}));case 4:case"end":return e.stop()}}),e)})))))},n.componentDidUpdate=function(){return window.onbeforeunload=function(){return!(!n.state.email&&!n.password)||void 0}},n.render=function(){return Object(v.jsxs)("section",{className:"section-only",children:[Object(v.jsxs)("form",{className:"form-only",onSubmit:n.onSubmit,children:[Object(v.jsx)("img",{className:"logo-img",src:"/logo.svg",alt:"IS16 logo"}),Object(v.jsxs)("h1",{className:"h1-only",children:["Sign in to ","IS16"]}),Object(v.jsxs)("div",{className:"input-group-email ".concat(n.state.visible?"rounded-top":"rounded"),children:[Object(v.jsx)("input",{className:"input-email",type:"email",name:"email",placeholder:"Email",value:n.state.email,pattern:m.a.emailPattern,onInput:n.enterEmail,onInvalid:n.enterEmail,onChange:n.setEmail,title:"Please fill out this field.",required:!0}),!n.state.visible&&Object(v.jsx)("button",{className:"btn-input",type:"submit",disabled:!n.state.email,hidden:!0,children:Object(v.jsx)("i",{className:"material-icons",children:"input"})})]}),Object(v.jsx)("div",{className:"input-group-container",children:n.state.visible&&n.state.email&&Object(v.jsxs)("div",{className:"input-group-password",children:[Object(v.jsx)("input",{className:"input-password",type:"password",name:"password",placeholder:"Password",value:n.state.password,onChange:n.setPassword,required:!0}),Object(v.jsx)("button",{className:"btn-input",type:"submit",disabled:!n.state.password,children:Object(v.jsx)("i",{className:"material-icons",children:"input"})})]})}),Object(v.jsxs)("a",{className:"link-find-account",href:"/find-account",target:"_blank",rel:"noopener noreferrer",children:["Forgotten password? ",Object(v.jsx)("i",{className:"material-icons",children:"launch"})]}),Object(v.jsx)("button",{className:"btn-create-account",type:"button",onClick:n.open,children:"Create New Account"})]}),n.state.opened&&Object(v.jsx)(O,{close:n.close})]})},n.setEmail=n.setEmail.bind(Object(d.a)(n)),n.setPassword=n.setPassword.bind(Object(d.a)(n)),n.setRemembered=n.setRemembered.bind(Object(d.a)(n)),n.state=w,n}return a}(i.Component),S=function(e){Object(n.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).return=function(){m.a.deleteQuery("location"),n.setState({location:""})},n.setTrash=function(){m.a.setQuery("location","trash"),n.setState({location:"trash"})},n.save=function(e){var t=new FormData,a=[];t.append("path",n.state.path),Array.from(e.target.Chats).forEach((function(e){return a.push(e.name)&&t.append("Chats",e,e.name)})),t.append("names",JSON.stringify(a))},n.upload=function(){return document.getElementById("Chats").click()},n.download=function(){return window.location.href=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NAME:"IS16",REACT_APP_WEB_URL:"https://is16.herokuapp.com/",REACT_APP_API_URL:"https://xis16.herokuapp.com/"}).REACT_APP_FILE_URI+n.state.id},n.open=function(e){var t=n.state.folders.find((function(t){return t._id===e.target.closest(".li-folder").id}));n.setState({path:("/"===n.state.path?n.state.path:n.state.path+"/")+t.name}),m.a.setQuery("id",t._id)},n.choose=function(e){e.preventDefault();var t=/file|img/g.test(e.target.className)?"file":/folder/g.test(e.target.className)?"folder":null;n.getMenuFolder().style.display="block",n.getMenuFolder().style.top="".concat(e.clientY,"px"),n.getMenuFolder().style.left="".concat(e.clientX,"px"),n.setState({id:e.target.closest(".li-"+t).id,type:t,name:e.target.closest(".li-"+t).getAttribute("name")}),document.querySelector(".dropdown-item-download").style.setProperty("display",/folder/g.test(e.target.className)?"none":"flex","important")},n.clickOut=function(e){return n.getMenuFolder().style.display="none"},n.getMenuFolder=function(){return document.querySelector(".dropdown-menu-folder")},n.access=function(e){var t=Number.parseInt(e.target.id),a=1===t?"/":n.state.path.split("/").slice(0,t).join("/"),r=n.state.folders.find((function(e){return e.path===a}));n.setState({path:a||"/"}),m.a.setQuery("id",0===Number.parseInt(e.target.id)?"root":r._id)},n.render=function(){return Object(v.jsxs)("section",{className:"section-Chats",onClick:n.clickOut,children:[Object(v.jsxs)("ul",{className:"dropdown-menu-folder",children:[Object(v.jsxs)("li",{className:"dropdown-item-download",onClick:n.download,children:[Object(v.jsx)("i",{className:"material-icons",children:"file_download"}),"Download"]}),Object(v.jsxs)("li",{className:"dropdown-item-rename",onClick:n.rename,children:[Object(v.jsx)("i",{className:"material-icons",children:"drive_file_rename_outline"}),"Rename"]})]}),Object(v.jsxs)("nav",{className:"left-nav col-2",id:"leftNav",children:[Object(v.jsx)("div",{className:"top-left-nav",children:Object(v.jsx)("label",{htmlFor:"leftNav",children:Object(v.jsx)("strong",{children:n.state.fullName})})}),Object(v.jsxs)("ul",{className:"list-group",children:[Object(v.jsxs)("li",{className:"list-group-item-Chats ".concat(!n.state.location&&"active"),onClick:n.return,children:[Object(v.jsx)("i",{className:"material-icons",children:"folder"})," My Chats"]}),Object(v.jsxs)("li",{className:"list-group-item-trash ".concat("trash"===n.state.location&&"active"),onClick:n.setTrash,children:[Object(v.jsx)("i",{className:"material-icons",children:"delete"})," Trash"]})]})]}),Object(v.jsxs)("div",{className:"right-content col-10",children:[Object(v.jsxs)("div",{className:"command-bar shadow-sm",children:[Object(v.jsxs)("button",{className:"btn-new-folder",onClick:n.create,children:[Object(v.jsx)("i",{className:"material-icons",children:"create_new_folder"})," New"]}),Object(v.jsx)("input",{type:"file",id:"Chats",hidden:!0,onChange:n.save}),Object(v.jsxs)("button",{className:"btn-new-folder",onClick:n.upload,children:[Object(v.jsx)("i",{className:"material-icons",children:"publish"})," Upload"]})]}),Object(v.jsx)("div",{className:"path-bar",children:"/"===n.state.path?Object(v.jsx)("strong",{children:"My Chats"}):n.state.path.split("/").map((function(e,t,a){return Object(v.jsx)("div",{children:0===t?Object(v.jsxs)("div",{className:"dir",children:[Object(v.jsx)("p",{className:"dir-parent",id:t,onClick:n.access,children:"My Chats"}),Object(v.jsx)("p",{children:"\xa0>\xa0"})]}):t===a.length-1?Object(v.jsx)("p",{children:Object(v.jsx)("strong",{children:e})}):Object(v.jsxs)("div",{className:"dir",children:[Object(v.jsx)("p",{className:"dir-parent",id:t,onClick:n.access,children:e}),Object(v.jsx)("p",{children:"\xa0>\xa0"})]})},t)}))}),Object(v.jsxs)("ul",{className:"ls-folder",children:[n.state.items.map((function(e,t,a){return a.length?Object(v.jsxs)("li",{className:"li-folder",id:e._id,name:e.name,onClick:n.open,onContextMenu:n.choose,children:[Object(v.jsx)("img",{className:"bg-folder",src:"svg/lg-bg.svg",alt:"background folder"}),m.a.isImages(n.state.Chats,e)?Object(v.jsx)("img",{className:"img",src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NAME:"IS16",REACT_APP_WEB_URL:"https://is16.herokuapp.com/",REACT_APP_API_URL:"https://xis16.herokuapp.com/"}).REACT_APP_IMAGES_URI).concat(m.a.getPayload()._id,"/Chats/").concat(m.a.getImage(n.state.Chats,e).path,"/").concat(m.a.getImage(n.state.Chats,e).name),alt:"foreground folder"}):Object(v.jsx)("div",{className:"file"}),m.a.isImages(n.state.Chats,e)?Object(v.jsx)("img",{className:"fg-folder",src:"svg/lg-fg-media.svg",alt:"foreground folder",onContextMenu:n.choose}):Object(v.jsx)("img",{className:"fg-folder",src:"svg/lg-fg.svg",alt:"foreground folder"}),Object(v.jsx)("label",{className:"label-folder",htmlFor:"folder".concat(t),children:e.name})]},t):Object(v.jsx)("li",{children:"This folder is empty"})})),n.state.itemChats.map((function(e,t,a){return Object(v.jsxs)("li",{className:"li-file",id:e._id,name:e.name,onContextMenu:n.choose,children:[m.a.isImage(e.name)?Object(v.jsx)("img",{className:"bg-img",src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NAME:"IS16",REACT_APP_WEB_URL:"https://is16.herokuapp.com/",REACT_APP_API_URL:"https://xis16.herokuapp.com/"}).REACT_APP_IMAGES_URI).concat(m.a.getPayload()._id,"/Chats/").concat(e.path,"/").concat(e.name),alt:"Img ".concat(t)}):Object(v.jsx)("i",{className:"material-icons bg-file",children:"description"}),Object(v.jsx)("label",{className:"label-file",htmlFor:"folder".concat(t),children:e.name})]},t)}))]})]})]})},n.state={id:"",type:"",fullName:"",location:"",opened:!1,path:"/",name:"",folder:{_id:"root",path:"/",name:"root"},folders:[],items:[],file:null,ready:!1,Chats:[],itemChats:[]},n}return a}(i.Component),C=function(e){Object(n.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).render=function(){return Object(v.jsx)("main",{children:m.a.loggedIn()?Object(v.jsx)(S,{}):Object(v.jsx)(N,{login:e.login})})},e}return a}(i.Component)}}]);
//# sourceMappingURL=3.f753603d.chunk.js.map