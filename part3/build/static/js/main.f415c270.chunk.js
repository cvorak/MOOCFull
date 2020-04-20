(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},19:function(e,n,t){},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=(t(19),t(2)),l=(t(20),function(e){var n=e.newName,t=e.newNumber,a=e.handleInputNameChange,u=e.handleInputNumberChange,c=e.handleClick;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:c},"add")))}),i=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"))},f=function(e){var n=e.persons,t=e.filterText,a=e.handleDeleteOf;return r.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){return r.a.createElement(i,{key:e.id,person:e,handleDelete:function(){return a(e.id)}})})))},m=function(e){var n=e.text,t=e.handleChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},d=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"===n.type?"notification error":"notification"},n.text)},s=t(3),h=t.n(s),p="/api/persons",b=function(){return h.a.get(p).then((function(e){return e.data}))},E=function(e){return h.a.post(p,e).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(p,"/").concat(e))},g=function(e,n){return h.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(o.a)(c,2),s=i[0],h=i[1],p=Object(a.useState)(""),w=Object(o.a)(p,2),C=w[0],O=w[1],j=Object(a.useState)(""),k=Object(o.a)(j,2),x=k[0],N=k[1],y=Object(a.useState)(null),D=Object(o.a)(y,2),T=D[0],I=D[1];Object(a.useEffect)((function(){b().then((function(e){return u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{message:T}),r.a.createElement(m,{text:x,handleChange:function(e){N(e.target.value)}}),r.a.createElement(l,{newName:s,newNumber:C,handleInputNameChange:function(e){h(e.target.value)},handleInputNumberChange:function(e){O(e.target.value)},handleClick:function(e){e.preventDefault();var n={name:s,number:C};if(t.map((function(e){return e.name})).includes(s)){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with new one?"))){var a=t.find((function(e){return e.name===s})).id;g(a,n).then((function(e){u(t.map((function(n){return n.id===a?e:n}))),h(""),O("")})).catch((function(e){I({text:"The person ".concat(n.name," does not exist on the server"),type:"error"}),setTimeout((function(){return I(null)}),5e3),u(t.filter((function(e){return e.id!==a})))}))}}else E(n).then((function(e){e&&(u(t.concat(e)),h(""),O(""),I({text:"Added ".concat(e.name),type:"success"}),setTimeout((function(){return I(null)}),3e3))})).catch((function(e){I({text:e.response.data.error,type:"error"}),setTimeout((function(){return I(null)}),3e3)}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{filterText:x,persons:t,handleDeleteOf:function(e){window.confirm("Delete ".concat(t.find((function(n){return n.id===e})).name))&&v(e).then(u(t.filter((function(n){return n.id!==e}))))}}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f415c270.chunk.js.map