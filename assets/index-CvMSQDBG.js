import{r as u,w as C,a as k,o as V,c as y,b as l,d as a,e as m,f as I,F as T,g as P,h as o,t as f,i as w,p as A,j as B}from"./index-DIdX2It0.js";import{_ as N,V as U,a as q,b as J,c as L,d as x,e as $,f as z,g as D,h as M}from"./VTextField-C1ZbzAe2.js";const _=v=>(A("data-v-9cbf2968"),v=v(),B(),v),O=_(()=>o("h1",null,"Resultado / Results",-1)),j=_(()=>o("strong",null,"Principal:",-1)),E=_(()=>o("strong",null,"Soma dos aportes /Sum of Recurring:",-1)),X=_(()=>o("strong",null,"Juros / Interest:",-1)),Y=_(()=>o("strong",null,"Total de Juros / Total Interest:",-1)),G=_(()=>o("strong",null,"Total:",-1)),H={__name:"Calc",setup(v){const g=u(1e3),F=u(100),h=u(10),b=u(10),R=u([]),i=u({chart:{type:"bar",height:350,stacked:!0,background:"#ffffff"},plotOptions:{bar:{horizontal:!1,dataLabels:{position:"top"}}},dataLabels:{enabled:!1},xaxis:{categories:[]},yaxis:{title:{text:"R$ (Value)"}},fill:{opacity:1},tooltip:{y:{formatter:(d,{dataPointIndex:t})=>{const c=parseFloat(s.value[0].data[t]).toFixed(2),e=parseFloat(s.value[1].data[t]).toFixed(2),r=parseFloat(s.value[2].data[t]).toFixed(2),n=(parseFloat(c)+parseFloat(e)+parseFloat(r)).toFixed(2);return`
          Total for Period ${t+1}: R$ ${n}<br>
          Principal: R$ ${c}<br>
          Sum of Recurring: R$ ${e}<br>
          Sum of Interest: R$ ${r}
        `}},theme:"dark",style:{background:"#333",color:"#fff",fontSize:"12px"}}}),s=u([{name:"Principal",data:[]},{name:"Recurring",data:[]},{name:"Interest",data:[]}]);return C([g,F,h,b],()=>{const d=parseFloat(g.value)||0,t=parseFloat(F.value)||0,c=parseFloat(h.value)/100||0;let e=d,r=0,n=0;R.value=[],i.value.xaxis.categories=[],s.value[0].data=[],s.value[1].data=[],s.value[2].data=[];for(let p=1;p<=b.value;p++){let S=e*c;r+=S,p>1&&(n+=t,e+=t),e+=S,R.value.push({principal:d.toFixed(2),recurring:n.toFixed(2),recurringSum:n.toFixed(2),interest:S.toFixed(2),totalInterest:r.toFixed(2),total:e.toFixed(2)}),console.log(p),i.value.xaxis.categories.push(p.toString()),s.value[0].data.push(parseFloat(d).toFixed(2)),s.value[1].data.push(parseFloat(n).toFixed(2)),s.value[2].data.push(parseFloat(r).toFixed(2)),console.log(`Period ${p}: Principal=${d}, RecurringSum=${n}, TotalInterest=${r}`)}console.log("X-axis categories:",i.value.xaxis.categories),i.value={...i.value}},{immediate:!0}),(d,t)=>{const c=k("apexchart");return V(),y(M,null,{default:l(()=>[a(U,{class:"mx-auto my-8 pa-4","max-width":"700"},{default:l(()=>[a(q,{class:"text-h4 text-center font-weight-bold"},{default:l(()=>[m(" Compound Interest Calculator ")]),_:1}),a(J,null,{default:l(()=>[a(L,null,{default:l(()=>[a(x,{cols:"12"},{default:l(()=>[a($,{label:"Valor inicial / Initial Amount",modelValue:g.value,"onUpdate:modelValue":t[0]||(t[0]=e=>g.value=e),type:"number",prefix:"R$",outlined:"",dense:"",required:"",class:"input-field"},null,8,["modelValue"])]),_:1}),a(x,{cols:"12"},{default:l(()=>[a($,{label:"Aporte recorrente / Recurring Amount",modelValue:F.value,"onUpdate:modelValue":t[1]||(t[1]=e=>F.value=e),type:"number",prefix:"R$",outlined:"",dense:"",class:"input-field"},null,8,["modelValue"])]),_:1}),a(x,{cols:"12"},{default:l(()=>[a($,{label:"Taxa de Juros / Interest Rate (%)",modelValue:h.value,"onUpdate:modelValue":t[2]||(t[2]=e=>h.value=e),type:"number",suffix:"%",outlined:"",dense:"",required:"",class:"input-field"},null,8,["modelValue"])]),_:1}),a(x,{cols:"12"},{default:l(()=>[a($,{label:"Periodo / Period (Meses ou Anos / Months or Years)",modelValue:b.value,"onUpdate:modelValue":t[3]||(t[3]=e=>b.value=e),type:"number",outlined:"",dense:"",required:"",class:"input-field"},null,8,["modelValue"])]),_:1}),a(x,{cols:"12",class:"mt-4"},{default:l(()=>[a(c,{type:"bar",options:i.value,series:s.value},null,8,["options","series"])]),_:1}),R.value.length>0?(V(),y(x,{key:0,cols:"12",class:"text-center mt-4"},{default:l(()=>[a(z,{type:"success",class:"result-alert"},{default:l(()=>[O,a(D,{class:"my-4"}),(V(!0),I(T,null,P(R.value,(e,r)=>(V(),I("div",{key:r,class:"period-result"},[o("h2",null,"Period "+f(r+1),1),o("p",null,[j,m(" R$ "+f(e.principal),1)]),o("p",null,[E,m(" R$ "+f(e.recurringSum),1)]),o("p",null,[X,m(" R$ "+f(e.interest),1)]),o("p",null,[Y,m(" R$ "+f(e.totalInterest),1)]),o("p",null,[G,m(" R$ "+f(e.total),1)])]))),128))]),_:1})]),_:1})):w("",!0)]),_:1})]),_:1})]),_:1})]),_:1})}}},K=N(H,[["__scopeId","data-v-9cbf2968"]]),ee={__name:"index",setup(v){return(g,F)=>(V(),y(K))}};export{ee as default};
