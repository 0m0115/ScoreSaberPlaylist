import{r as u,o as h,c as B,a as H,d as z,w as n,b as t,e as b,t as w,f as Q,u as i,G as ne,g as K,p as L,h as Y,i as N,l as oe,j as le,v as se,S as re,_ as ce,k as U,m as W,n as T,C as ie,q as de,D as q,s as J,x as ue,F as X,y as pe,z as $,A as Ae,U as ge,B as fe,E as _e,H as me,I as ye}from"./vendor.251e63fa.js";const ve=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const y of c.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&s(y)}).observe(document,{childList:!0,subtree:!0});function o(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerpolicy&&(c.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?c.credentials="include":l.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=o(l);fetch(l.href,c)}};ve();var P=(e,a)=>{const o=e.__vccOpts||e;for(const[s,l]of a)o[s]=l;return o};const be={};function he(e,a){const o=u("router-view");return h(),B(o)}var Ee=P(be,[["render",he]]),O={getScoreSaberData:e=>H.post("https://api2.bmob.cn/1/functions/getScoreSaberData",{url:e},{headers:{"X-Bmob-Application-Id":"17697370eb0242bd5e3b0ce8d28aa5a6","X-Bmob-REST-API-Key":"77f26b42233d5fe773d94fc806fee061","Content-Type":"application/json"}}).then(a=>{var o;return JSON.parse((o=a==null?void 0:a.data)==null?void 0:o.result)})};function ke(e){return H.get(e).then(a=>a.data)}var M={getPlayerInfo(e){return O.getScoreSaberData(`https://scoresaber.com/api/player/${e}/full`)},getScores(e,a,o=100,s="top"){return O.getScoreSaberData(`https://scoresaber.com/api/player/${e}/scores?page=${a}&sort=${s}&limit=${o}&withMetadata=false`).then(l=>l.playerScores)},getLeaderBoardInfo(e){return O.getScoreSaberData(`https://scoresaber.com/api/leaderboard/by-id/${e}/info`)},getSongInfo(e){return ke(`https://beatsaver.com/api/maps/hash/${e}`)},downloadFile(e,a){return H.get(e,{responseType:"blob"}).then(o=>{const s=new Blob([o.data]),l=document.createElement("a");l.href=URL.createObjectURL(s),l.download=a,l.click(),URL.revokeObjectURL(l.href)}).catch(console.error)}};function Se(e,a){const{type:o,order:s}=a;e.sort((l,c)=>l[o]>c[o]?-1:1),s==="ASC"&&e.reverse()}async function Qe(e){var y,g,A;if(e.acc!==void 0&&e.acc!==-1/0)return e.acc;if(!e.baseScore)return 0;if(e.ranked)return e.baseScore/e.maxScore*100;let a=null;try{a=await M.getLeaderBoardInfo(e.id)}catch{return-1/0}const o=a.difficulties.findIndex(m=>m.leaderboardId===e.id);if(o===-1)return-1/0;let s=null;try{s=await M.getSongInfo(e.songHash)}catch{return-1/0}const l=(g=(y=s==null?void 0:s.versions)==null?void 0:y[0])==null?void 0:g.diffs[o];if(e.key=s==null?void 0:s.id,e.mapperId=(A=s==null?void 0:s.uploader)==null?void 0:A.id,!l)return-1/0;const c=l.notes;if(c>13)e.maxScore=c*920-7245;else if(c>5)e.maxScore=c*460-1265;else if(c>1)e.maxScore=c*230-115;else if(c===1)e.maxScore=115;else return-1/0;return e.baseScore/e.maxScore*100}async function Ce(e,a){const o=[];for(const c of e){const y={songName:c.songName,hash:c.songHash,difficulties:[{characteristic:"Standard",name:c.difficultyRaw.split("_")[1]}]};o.push(y)}const s={playlistTitle:a,playlistAuthor:"ScoreSaberPlaylist",songs:o,image:"data:image/png;base64,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"},l=`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(s))}`;M.downloadFile(l,`${a}.bplist`)}var j={sort:Se,getAcc:Qe,downloadPlaylist:Ce};function Ie(e,a){return a.rankedType==="All"||(e.ranked?a.rankedType==="Ranked":a.rankedType==="UnRanked")}function we(e,a){return a.fullComboType==="All"||(e.fullCombo?a.fullComboType==="FullCombo":a.fullComboType==="UnFullCombo")}function Be(e,a){var l,c;if(!a.date.enable||((c=(l=a.date)==null?void 0:l.value)==null?void 0:c.length)<2)return!0;const o=z(a.date.value[0]).startOf("day"),s=z(a.date.value[1]).endOf("day");return e.timeSet>=o&&e.timeSet<=s}async function xe(e,a){var l,c;if(e.acc=await j.getAcc(e),!a.acc.enable||((c=(l=a.acc)==null?void 0:l.value)==null?void 0:c.length)<2)return!0;const o=a.acc.value[0],s=a.acc.value[1];return e.acc>=o&&e.acc<=s}function Ne(e,a){var l,c;if(!a.rank.enable||((c=(l=a.rank)==null?void 0:l.value)==null?void 0:c.length)<2)return!0;const o=a.rank.value[0],s=a.rank.value[1];return e.rank>=o&&(e.rank<=s||s===300)}function Ue(e,a){var l,c;if(a.rankedType==="UnRanked"||!a.pp.enable||((c=(l=a.pp)==null?void 0:l.value)==null?void 0:c.length)<2)return!0;const o=a.pp.value[0],s=a.pp.value[1];return e.pp>=o&&(e.pp<=s||s===600)}function Re(e,a){var l,c;if(a.rankedType==="UnRanked"||!a.stars.enable||((c=(l=a.stars)==null?void 0:l.value)==null?void 0:c.length)<2)return!0;const o=a.stars.value[0],s=a.stars.value[1];return e.stars>=o&&e.stars<=s}var Je={async dataFilter(e,a){return Ie(e,a)&&we(e,a)&&Be(e,a)&&Ne(e,a)&&Ue(e,a)&&Re(e,a)&&await xe(e,a)}};const Z=e=>(L("data-v-73d984ba"),e=e(),Y(),e),Me={class:"player-info"},Pe=Z(()=>Q("span",null,"Global Ranking",-1)),Fe=Z(()=>Q("span",null,"Performance Points",-1)),De=Z(()=>Q("span",null,"Average Ranked Accuracy",-1)),Ke={props:{playerInfo:Object},setup(e){const a=e;function o(){window.open(`https://scoresaber.com/u/${a.playerInfo.id}`,"_blank")}function s(){const l=Math.ceil(a.playerInfo.rank/50);window.open(`https://scoresaber.com/rankings?page=${l}`,"_blank")}return(l,c)=>{const y=u("a-avatar"),g=u("a-button"),A=u("a-tooltip"),m=u("a-card-meta"),p=u("a-card");return h(),B(p,null,{default:n(()=>[t(m,null,{avatar:n(()=>[t(y,{size:64,src:e.playerInfo.avatar},null,8,["src"])]),title:n(()=>[t(g,{type:"primary",size:"large",shape:"round",block:"",ghost:"",class:"player-info-text",onClick:o},{default:n(()=>[b(w(e.playerInfo.name),1)]),_:1})]),description:n(()=>{var f;return[Q("div",Me,[t(A,{placement:"bottom"},{title:n(()=>[Pe]),default:n(()=>[t(g,{type:"link",class:"player-info-text",onClick:s},{default:n(()=>[t(i(ne)),b(" #"+w(e.playerInfo.rank),1)]),_:1})]),_:1}),t(A,{placement:"bottom"},{title:n(()=>[Fe]),default:n(()=>[t(g,{type:"text",class:"player-info-text"},{default:n(()=>[b(w(e.playerInfo.pp)+"pp",1)]),_:1})]),_:1}),(f=e.playerInfo.scoreStats)!=null&&f.averageRankedAccuracy?(h(),B(A,{key:0,placement:"bottom"},{title:n(()=>[De]),default:n(()=>[t(g,{type:"text",class:"player-info-text"},{default:n(()=>[b(w(e.playerInfo.scoreStats.averageRankedAccuracy.toFixed(2))+"%",1)]),_:1})]),_:1})):K("",!0)])]}),_:1})]),_:1})}}};var ze=P(Ke,[["__scopeId","data-v-73d984ba"]]);const Te=b("\u5168\u90E8"),je=b("\u6392\u4F4D\u66F2"),Oe=b("\u975E\u6392\u4F4D\u66F2"),He=b("\u5168\u90E8"),Le=b("\u5DF2\u5168\u8FDE"),Ye=b("\u672A\u5168\u8FDE"),Ze=b(" \u67E5\u8BE2 "),Ge={props:{loading:Boolean},emits:["submit"],setup(e,{emit:a}){const o=N({fullComboType:"All",rankedType:"Ranked",date:{enable:!1,value:[]},acc:{enable:!1,value:[0,100]},rank:{enable:!1,greater:!1,value:[0,300]},pp:{enable:!1,value:[0,600]},stars:{enable:!1,value:[0,14]},sort:{type:"PP",order:"DESC"}});function s(){a("submit",o)}const l=N({65:"A-",80:"S",90:"SS"}),c=N({10:"10",50:"50",100:"100",200:"200",300:"300+"}),y=N({100:"100",200:"200",300:"300",400:"400",500:"500",600:"600+"}),g={"font-weight":"bolder","min-height":"30px"};function A(m){return m&&m>z().endOf("day")}return(m,p)=>{const f=u("a-radio-button"),I=u("a-radio-group"),x=u("a-space"),E=u("a-card"),C=u("a-switch"),k=u("a-range-picker"),_=u("a-slider"),v=u("a-button"),d=u("a-spin");return h(),B(d,{spinning:e.loading,size:"large"},{default:n(()=>[t(E,{bodyStyle:{padding:"2px 24px"}},{default:n(()=>[t(E,{hoverable:"",class:"form-card-item"},{default:n(()=>[t(x,null,{default:n(()=>[t(I,{value:i(o).rankedType,"onUpdate:value":p[0]||(p[0]=r=>i(o).rankedType=r),"button-style":"solid",size:"small"},{default:n(()=>[t(f,{value:"All"},{default:n(()=>[Te]),_:1}),t(f,{value:"Ranked"},{default:n(()=>[je]),_:1}),t(f,{value:"UnRanked"},{default:n(()=>[Oe]),_:1})]),_:1},8,["value"]),t(I,{value:i(o).fullComboType,"onUpdate:value":p[1]||(p[1]=r=>i(o).fullComboType=r),"button-style":"solid",size:"small"},{default:n(()=>[t(f,{value:"All"},{default:n(()=>[He]),_:1}),t(f,{value:"FullCombo"},{default:n(()=>[Le]),_:1}),t(f,{value:"UnFullCombo"},{default:n(()=>[Ye]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),t(E,{title:"\u65E5\u671F",hoverable:"",headStyle:g,class:"form-card-item"},{extra:n(()=>[t(C,{checked:i(o).date.enable,"onUpdate:checked":p[2]||(p[2]=r=>i(o).date.enable=r)},null,8,["checked"])]),default:n(()=>[t(k,{value:i(o).date.value,"onUpdate:value":p[3]||(p[3]=r=>i(o).date.value=r),"disabled-date":A,disabled:!i(o).date.enable,locale:i(oe)},null,8,["value","disabled","locale"])]),_:1}),t(E,{title:"ACC",hoverable:"",headStyle:g,class:"form-card-item"},{extra:n(()=>[t(C,{checked:i(o).acc.enable,"onUpdate:checked":p[4]||(p[4]=r=>i(o).acc.enable=r)},null,8,["checked"])]),default:n(()=>[t(_,{value:i(o).acc.value,"onUpdate:value":p[5]||(p[5]=r=>i(o).acc.value=r),range:"",min:65,disabled:!i(o).acc.enable,"tip-formatter":r=>`${r}%`,marks:i(l)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),t(E,{title:"\u6392\u540D",hoverable:"",headStyle:g,class:"form-card-item"},{extra:n(()=>[t(C,{checked:i(o).rank.enable,"onUpdate:checked":p[6]||(p[6]=r=>i(o).rank.enable=r)},null,8,["checked"])]),default:n(()=>[t(_,{value:i(o).rank.value,"onUpdate:value":p[7]||(p[7]=r=>i(o).rank.value=r),range:"",min:0,max:300,step:10,disabled:!i(o).rank.enable,"tip-formatter":r=>r===300?"300+":r,marks:i(c)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),le(Q("div",null,[t(E,{title:"PP",hoverable:"",headStyle:g,class:"form-card-item"},{extra:n(()=>[t(C,{checked:i(o).pp.enable,"onUpdate:checked":p[8]||(p[8]=r=>i(o).pp.enable=r)},null,8,["checked"])]),default:n(()=>[t(_,{value:i(o).pp.value,"onUpdate:value":p[9]||(p[9]=r=>i(o).pp.value=r),range:"",min:0,max:600,step:10,disabled:!i(o).pp.enable,"tip-formatter":r=>r===600?"600+":r,marks:i(y)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),t(E,{title:"\u661F\u7EA7",hoverable:"",headStyle:g,class:"form-card-item"},{extra:n(()=>[t(C,{checked:i(o).stars.enable,"onUpdate:checked":p[10]||(p[10]=r=>i(o).stars.enable=r)},null,8,["checked"])]),default:n(()=>[t(_,{value:i(o).stars.value,"onUpdate:value":p[11]||(p[11]=r=>i(o).stars.value=r),range:"",min:0,max:14,disabled:!i(o).stars.enable},null,8,["value","disabled"])]),_:1})],512),[[se,i(o).rankedType!="UnRanked"]]),t(v,{type:"primary",shape:"round",size:"large",onClick:s,loading:e.loading},{icon:n(()=>[t(i(re))]),default:n(()=>[Ze]),_:1},8,["loading"])]),_:1})]),_:1},8,["spinning"])}}};var Ve=P(Ge,[["__scopeId","data-v-1dfdee68"]]);const G=e=>(L("data-v-0def174d"),e=e(),Y(),e),We={class:"data-list-item"},qe={class:"info-text text-bolder"},Xe={class:"text-bolder"},$e={class:"text-bolder"},ea=G(()=>Q("span",null,"Copy BSR",-1)),aa=G(()=>Q("span",null,"One-Click",-1)),ta=G(()=>Q("span",null,"Download zip",-1)),na={props:{item:Object},setup(e){var C,k;const a=e,{toClipboard:o}=ce(),s=U((C=a.item)==null?void 0:C.key),l=U((k=a.item)==null?void 0:k.mapperId),c=new Map([["_Easy_SoloStandard","E"],["_Normal_SoloStandard","N"],["_Hard_SoloStandard","H"],["_Expert_SoloStandard","Ex"],["_ExpertPlus_SoloStandard","Ex+"]]),y=new Map([["_Easy_SoloStandard","green"],["_Normal_SoloStandard","cyan"],["_Hard_SoloStandard","orange"],["_Expert_SoloStandard","red"],["_ExpertPlus_SoloStandard","purple"]]),g=W(()=>{var _;return a.item.ranked?`${a.item.stars}\u2605`:(_=c.get(a.item.difficultyRaw))!=null?_:"O"}),A=W(()=>{var _;return(_=y.get(a.item.difficultyRaw))!=null?_:"yellow"});async function m(){if(!(s.value&&l.value))return M.getSongInfo(a.item.songHash).then(_=>{var v;s.value=_==null?void 0:_.id,l.value=(v=_==null?void 0:_.uploader)==null?void 0:v.id}).catch(_=>{J.error("BeatSaver\u8C31\u9762\u4FE1\u606F\u83B7\u53D6\u5931\u8D25")})}async function p(){await m(),s.value&&window.open(`https://beatsaver.com/maps/${s.value}`,"_blank")}async function f(){await m(),l.value&&window.open(`https://beatsaver.com/profile/${l.value}`,"_blank")}async function I(){if(await m(),s.value){const _=`!bsr ${s.value}`;try{await o(_),J.success("\u590D\u5236\u6210\u529F: "+_)}catch{J.error("\u590D\u5236\u5931\u8D25")}}}async function x(){await m(),s.value&&window.open(`beatsaver://${s.value}`,"_blank")}function E(){window.open(`https://na.cdn.beatsaver.com/${a.item.songHash.toLowerCase()}.zip`,"_blank")}return(_,v)=>{const d=u("a-image"),r=u("a-col"),S=u("a-button"),R=u("a-row"),F=u("a-tooltip"),ee=u("a-space"),ae=u("a-card"),te=u("a-badge-ribbon");return h(),T("div",We,[t(te,{text:i(g),color:i(A),placement:"start"},{default:n(()=>[t(ae,{bodyStyle:{padding:"10px"}},{default:n(()=>[t(R,{justify:"space-between",align:"middle",wrap:""},{default:n(()=>[t(r,{span:16},{default:n(()=>[t(R,{justify:"start",wrap:""},{default:n(()=>[t(r,null,{default:n(()=>[t(d,{width:64,src:e.item.coverImage,placeholder:"",fallback:"data:image/png;base64,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"},null,8,["src"])]),_:1}),t(r,null,{default:n(()=>[t(R,{justify:"start"},{default:n(()=>[t(S,{type:"link",onClick:p},{default:n(()=>[Q("span",qe,w(e.item.songName)+" "+w(e.item.songSubName)+" - "+w(e.item.songAuthorName),1)]),_:1})]),_:1}),t(R,{justify:"start"},{default:n(()=>[t(S,{class:"info-text",type:"text",onClick:f},{default:n(()=>[b(w(e.item.levelAuthorName),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(r,{span:8},{default:n(()=>[t(R,{justify:"end"},{default:n(()=>[t(ee,null,{default:n(()=>[Q("span",Xe,w(e.item.timeSet.format("YYYY.MM.DD")),1),e.item.acc!=-1/0?(h(),B(S,{key:0,type:"primary",ghost:"",shape:"round"},{default:n(()=>[Q("span",$e,w(e.item.acc.toFixed(2))+"%",1)]),_:1})):K("",!0),e.item.ranked?(h(),B(S,{key:1,type:"primary",ghost:"",shape:"round",class:"text-bolder"},{default:n(()=>[b(w(e.item.pp.toFixed(2))+"pp / "+w(e.item.ppWeighted.toFixed(2))+"pp",1)]),_:1})):K("",!0),t(F,{placement:"bottom"},{title:n(()=>[ea]),default:n(()=>[t(S,{type:"primary",shape:"circle",onClick:I},{icon:n(()=>[t(i(ie))]),_:1})]),_:1}),t(F,{placement:"bottom"},{title:n(()=>[aa]),default:n(()=>[t(S,{type:"primary",shape:"circle",onClick:x},{icon:n(()=>[t(i(de))]),_:1})]),_:1}),t(F,{placement:"bottom"},{title:n(()=>[ta]),default:n(()=>[t(S,{type:"primary",shape:"circle",onClick:E},{icon:n(()=>[t(i(q))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["text","color"])])}}};var oa=P(na,[["__scopeId","data-v-0def174d"]]);const la=b(" \u6309 "),sa=b("\u6392\u5E8F "),ra={props:{loading:Boolean},emits:["change"],setup(e,{emit:a}){const o=e,s=N({type:"pp",order:"DESC"});ue(()=>o.loading,(g,A)=>{g&&(s.type="pp",s.order="DESC")});const l=N([{value:"pp",label:"PP"},{value:"timeSet",label:"\u65E5\u671F"},{value:"stars",label:"\u661F\u7EA7"},{value:"acc",label:"ACC"}]),c=N([{value:"DESC",label:"\u4ECE\u5927\u5230\u5C0F"},{value:"ASC",label:"\u4ECE\u5C0F\u5230\u5927"}]);function y(){a("change",s)}return(g,A)=>{const m=u("a-select"),p=u("a-space");return h(),B(p,null,{default:n(()=>[la,t(m,{ref:"select",size:"small",value:i(s).type,"onUpdate:value":A[0]||(A[0]=f=>i(s).type=f),style:{width:"120px"},options:i(l),onChange:y},null,8,["value","options"]),t(m,{ref:"select",size:"small",value:i(s).order,"onUpdate:value":A[1]||(A[1]=f=>i(s).order=f),style:{width:"120px"},options:i(c),onChange:y},null,8,["value","options"]),sa]),_:1})}}};const ca=b(" \u4E0B\u8F7D\u6B4C\u5355 "),ia=b("\u53D6\u6D88"),da=b("\u786E\u5B9A"),ua={props:{data:Object,loading:Boolean},emits:["download"],setup(e,{emit:a}){const o=e,s=U(!1),l=U("ScoreSaberPlaylist"),c={pageSize:8,showTotal:(p,f)=>`\u5171 ${p} \u6761\u6570\u636E [ ${f[0]} - ${f[1]} ]`,showQuickJumper:!0};function y(){a("download",l.value),A()}function g(){s.value=!0}function A(){s.value=!1}function m(p){j.sort(o.data,p)}return(p,f)=>{const I=u("a-button"),x=u("a-space"),E=u("a-card"),C=u("a-spin"),k=u("a-list"),_=u("a-input"),v=u("a-modal");return h(),T(X,null,[t(k,{"data-source":e.data,pagination:c,class:"data-list"},{header:n(()=>[t(C,{spinning:e.loading,size:"large"},{default:n(()=>{var d;return[e.loading||((d=e.data)==null?void 0:d.length)?(h(),B(E,{key:0,hoverable:""},{default:n(()=>[t(x,{size:"large"},{default:n(()=>[t(ra,{loading:e.loading,onChange:m},null,8,["loading"]),t(I,{type:"primary",shape:"round",size:"large",loading:e.loading,onClick:g},{icon:n(()=>[t(i(q))]),default:n(()=>[ca]),_:1},8,["loading"])]),_:1})]),_:1})):K("",!0)]}),_:1},8,["spinning"])]),renderItem:n(({item:d})=>[(h(),B(oa,{item:d,key:d.id},null,8,["item"]))]),_:1},8,["data-source"]),t(v,{visible:s.value,"onUpdate:visible":f[1]||(f[1]=d=>s.value=d),title:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},{footer:n(()=>[t(I,{key:"back",onClick:A},{default:n(()=>[ia]),_:1}),t(I,{key:"submit",type:"primary",loading:e.loading,onClick:y},{default:n(()=>[da]),_:1},8,["loading"])]),default:n(()=>[t(_,{value:l.value,"onUpdate:value":f[0]||(f[0]=d=>l.value=d),placeholder:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},null,8,["value"])]),_:1},8,["visible"])],64)}}};var pa=P(ua,[["__scopeId","data-v-49a69700"]]);const Aa={players:"players"};function ga(e){const a=localStorage.getItem(e);return new Map(JSON.parse(a))}function fa(e,a){const o=JSON.stringify(Array.from(a));localStorage.setItem(e,o)}var D={keys:Aa,getMap:ga,setMap:fa};const _a={setup(e){const o=pe(7),s=[],l=N({}),c=N([]),y=U(0),g=U(!1),A=$(),m=A.currentRoute.value.params.id;m&&p(m);function p(v){M.getPlayerInfo(v).then(d=>{l.id=d.id,l.name=d.name,l.avatar=d.profilePicture,l.pp=d.pp,l.rank=d.rank,y.value=Math.ceil(d.scoreStats.totalPlayCount/100);const r=D.getMap(D.keys.players);r.set(d.id,{id:d.id,name:d.name,avatar:d.profilePicture}),D.setMap(D.keys.players,r)}).catch(d=>{console.error(d),J.error("\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),A.push("/")})}async function f(v){if(g.value)return;if(!(l!=null&&l.id)){J.error("\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),A.push("/");return}g.value=!0,c.length=0,console.time("\u603B\u8017\u65F6"),console.time("\u67E5\u8BE2\u6570\u636E\u8017\u65F6"),await I(),console.timeEnd("\u67E5\u8BE2\u6570\u636E\u8017\u65F6"),console.time("\u5904\u7406\u6570\u636E\u8017\u65F6"),await C(v),console.timeEnd("\u5904\u7406\u6570\u636E\u8017\u65F6"),console.timeEnd("\u603B\u8017\u65F6");const d={type:"pp",order:"DESC"};j.sort(c,d),g.value=!1}async function I(v){if(s!=null&&s.length)return;const d=[];for(let r=1;r<=y.value;r++){const S=x(r);d.push(S)}await Promise.all(d)}async function x(v){try{const d=await M.getScores(l==null?void 0:l.id,v,100);for(const r of d)E(r)}catch(d){console.error(d),J.error("ScoreSaber\u8BB0\u5F55\u67E5\u8BE2\u5F02\u5E38")}}function E(v){const d=v.score,r=v.leaderboard,S={id:r.id,rank:d.rank,baseScore:d.baseScore,maxScore:r.maxScore,pp:d.pp,ppWeighted:d.pp*d.weight,fullCombo:d.fullCombo,timeSet:z(d.timeSet),songHash:r.songHash,songName:r.songName,songSubName:r.songSubName,songAuthorName:r.songAuthorName,levelAuthorName:r.levelAuthorName,difficultyRaw:r.difficulty.difficultyRaw,ranked:r.ranked,stars:r.stars,coverImage:r.coverImage};s.push(S)}async function C(v){const d=[];for(const r of s){const S=o(()=>k(r,v));d.push(S)}await Promise.all(d)}async function k(v,d){await Je.dataFilter(v,d)&&c.push(v)}async function _(v){await j.downloadPlaylist(c,v)}return(v,d)=>{var F;const r=u("a-col"),S=u("a-row"),R=u("a-spin");return h(),B(R,{spinning:((F=i(l))==null?void 0:F.id)===void 0,size:"large"},{default:n(()=>[t(S,{justify:"space-between",align:"top",class:"main-layout"},{default:n(()=>[t(r,{span:7,class:"main-layout-sider"},{default:n(()=>[t(ze,{"player-info":i(l)},null,8,["player-info"]),t(Ve,{onSubmit:f,loading:g.value},null,8,["loading"])]),_:1}),t(r,{span:17},{default:n(()=>[t(pa,{data:i(c),loading:g.value,onDownload:_},null,8,["data","loading"])]),_:1})]),_:1})]),_:1},8,["spinning"])}}};var ma=P(_a,[["__scopeId","data-v-db55a8a2"]]);const ya=e=>(L("data-v-5b9116c6"),e=e(),Y(),e),va={class:"login-layout"},ba={class:"login-content"},ha=ya(()=>Q("div",null,[Q("h1",null,"Score Saber Playlist"),Q("h3",null,"Version 1.2.0")],-1)),Ea={setup(e){const a=U(""),o=U(!1),s=$(),l=D.getMap(D.keys.players);function c(){o.value=!0;const A=/scoresaber.com\/u\/(\S+)/.exec(a.value);A&&A[1]&&(a.value=A[1]),M.getPlayerInfo(a.value).then(m=>{o.value=!1,y(a.value)}).catch(m=>{console.error(m),o.value=!1,J.error("\u67E5\u8BE2\u7528\u6237\u4FE1\u606F\u5931\u8D25")})}function y(A){s.push(`/u/${A}`)}const g={"font-weight":"bolder","font-size":"22px","background-color":"#b9d7ea"};return(A,m)=>{const p=u("a-image"),f=u("a-avatar"),I=u("a-tooltip"),x=u("a-avatar-group"),E=u("a-input-search"),C=u("a-card");return h(),T("div",va,[t(C,null,{default:n(()=>[Q("div",ba,[t(p,{width:128,preview:!1,src:"https://scoresaber.com/images/logo.svg"}),ha,i(l).size>0?(h(),B(x,{key:0,size:64,maxCount:5,"max-style":g},{default:n(()=>[(h(!0),T(X,null,Ae(i(l).values(),k=>(h(),B(I,{key:k.id,placement:"top",title:k.name},{default:n(()=>[t(f,{src:k.avatar,onClick:_=>y(k.id),class:"cursor-pointer"},null,8,["src","onClick"])]),_:2},1032,["title"]))),128))]),_:1})):K("",!0),t(E,{value:a.value,"onUpdate:value":m[0]||(m[0]=k=>a.value=k),placeholder:"\u8BF7\u8F93\u5165Score Saber\u8D26\u53F7\u6216Score Saber\u4E3B\u9875\u7F51\u5740","enter-button":"\u786E\u5B9A",size:"large","allow-clear":"",loading:o.value,onSearch:c},{prefix:n(()=>[t(i(ge))]),_:1},8,["value","loading"])])]),_:1})])}}};var ka=P(Ea,[["__scopeId","data-v-5b9116c6"]]);const Sa=[{path:"/",component:ka},{path:"/u/:id",component:ma}],Qa=fe({history:_e(),routes:Sa});const V=me(Ee);V.use(Qa);V.use(ye);V.mount("#app");