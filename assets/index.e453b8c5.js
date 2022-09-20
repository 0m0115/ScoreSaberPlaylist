import{r as p,o as b,c as C,a as ne,d as W,w as n,b as a,e as h,t as Q,f as S,u as s,G as be,g as j,p as oe,h as le,i as P,j as N,k as F,F as V,l as ue,U as ae,m as he,n as ke,v as Se,S as Ee,q as T,_ as Qe,s as X,x as de,C as Ce,y as we,D as pe,z as Ie,A as xe,B as _e,E as Be,H as Pe,I as Ne,J as Ue}from"./vendor.bf32044b.js";const Me=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function l(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=l(r);fetch(r.href,c)}};Me();var H=(e,t)=>{const l=e.__vccOpts||e;for(const[o,r]of t)l[o]=r;return l};const Re={};function ze(e,t){const l=p("router-view");return b(),C(l)}var Je=H(Re,[["render",ze]]),te={getScoreSaberData:e=>ne.post("https://us-w1-console-api.leancloud.app/1.1/functions/getScoreSaberData",{url:e},{headers:{"x-lc-id":"B1s8viG57mIaYwcxmYKgndRp-MdYXbMMI","x-lc-key":"pTLIjdxpysSviH0x3YsOhiwP,master","Content-Type":"application/json"}}).then(t=>{var l;return(l=t==null?void 0:t.data)==null?void 0:l.result})},ee={version:"1.4.4",pageSize:100};function De(e){return ne.get(e).then(t=>t.data)}var $={getPlayerInfo(e){return te.getScoreSaberData(`https://scoresaber.com/api/player/${e}/full`)},getScores(e,t,l=ee.pageSize,o="top"){return te.getScoreSaberData(`https://scoresaber.com/api/player/${e}/scores?page=${t}&sort=${o}&limit=${l}&withMetadata=false`).then(r=>r.playerScores)},getLeaderBoardInfo(e){return te.getScoreSaberData(`https://scoresaber.com/api/leaderboard/by-id/${e}/info`)},getSongInfo(e){return De(`https://beatsaver.com/api/maps/hash/${e}`)},downloadFile(e,t){return ne.get(e,{responseType:"blob"}).then(l=>{const o=new Blob([l.data]),r=document.createElement("a");r.href=URL.createObjectURL(o),r.download=t,r.click(),URL.revokeObjectURL(r.href)}).catch(console.error)}};function Le(e,t){const{type:l,order:o}=t;e.sort((r,c)=>r[l]>c[l]?-1:1),o==="ASC"&&e.reverse()}async function je(e){var m,i,g;if(e.acc!==void 0&&e.acc!==-1/0)return e.acc;if(!e.baseScore)return 0;if(e.ranked)return e.baseScore/e.maxScore*100;let t=null;try{t=await $.getLeaderBoardInfo(e.id)}catch{return-1/0}const l=t.difficulties.findIndex(A=>A.leaderboardId===e.id);if(l===-1)return-1/0;let o=null;try{o=await $.getSongInfo(e.songHash)}catch{return-1/0}const r=(i=(m=o==null?void 0:o.versions)==null?void 0:m[0])==null?void 0:i.diffs[l];if(e.key=o==null?void 0:o.id,e.mapperId=(g=o==null?void 0:o.uploader)==null?void 0:g.id,!r)return-1/0;const c=r.notes;if(c>13)e.maxScore=c*920-7245;else if(c>5)e.maxScore=c*460-1265;else if(c>1)e.maxScore=c*230-115;else if(c===1)e.maxScore=115;else return-1/0;return e.baseScore/e.maxScore*100}async function Fe(e,t,l,o){if(o=Math.min(o,e.length),!o)return;const r=[];for(let g=0;g<o;g++){const A=e[g],k={songName:A.songName,hash:A.songHash,difficulties:[{characteristic:"Standard",name:A.difficultyRaw.split("_")[1]}]};r.push(k)}const c=await fe(t),m={playlistTitle:l,playlistAuthor:"ScoreSaberPlaylist",songs:r,image:c},i=`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(m))}`;$.downloadFile(i,`${l}.bplist`)}function Te(e){const t=e.score,l=e.leaderboard;return{id:l.id,rank:t.rank,baseScore:t.baseScore,maxScore:l.maxScore,pp:t.pp,ppWeighted:t.pp*t.weight,fullCombo:t.fullCombo,timeSet:W(t.timeSet),songHash:l.songHash,songName:l.songName,songSubName:l.songSubName,songAuthorName:l.songAuthorName,levelAuthorName:l.levelAuthorName,difficultyRaw:l.difficulty.difficultyRaw,ranked:l.ranked,stars:l.stars,coverImage:l.coverImage}}function $e(e){const t=/scoresaber.com\/u\/(\S+)/.exec(e);return t!=null&&t[1]?t[1]:e}function fe(e){return new Promise(t=>{const l=new Image;l.setAttribute("crossOrigin","anonymous"),l.onload=function(){const o=document.createElement("canvas");o.width=l.width,o.height=l.height,o.getContext("2d").drawImage(this,0,0),o.toBlob(function(c){const m=document.createElement("img"),i=URL.createObjectURL(c);m.onload=function(){URL.revokeObjectURL(i)},m.src=i},"image/jpeg",1);const r=o.toDataURL("image/jpeg");t(r)},l.src=e})}var O={sort:Le,getAcc:je,downloadPlaylist:Fe,playerScoreToItem:Te,matchPlayerId:$e,convertImgUrlToBase64:fe};function Ke(e,t){return t.rankedType==="All"||(e.ranked?t.rankedType==="Ranked":t.rankedType==="UnRanked")}function Oe(e,t){return t.fullComboType==="All"||(e.fullCombo?t.fullComboType==="FullCombo":t.fullComboType==="UnFullCombo")}function He(e,t){var r,c;if(!t.date.enable||((c=(r=t.date)==null?void 0:r.value)==null?void 0:c.length)<2)return!0;const l=W(t.date.value[0]).startOf("day"),o=W(t.date.value[1]).endOf("day");return e.timeSet>=l&&e.timeSet<=o}async function Ye(e,t){var r,c;if(e.acc=await O.getAcc(e),!t.acc.enable||((c=(r=t.acc)==null?void 0:r.value)==null?void 0:c.length)<2)return!0;const l=t.acc.value[0],o=t.acc.value[1];return e.acc>=l&&e.acc<=o}function Ge(e,t){var r,c;if(!t.rank.enable||((c=(r=t.rank)==null?void 0:r.value)==null?void 0:c.length)<2)return!0;const l=t.rank.value[0],o=t.rank.value[1];return e.rank>=l&&(e.rank<=o||o===300)}function Ze(e,t){var r,c;if(t.rankedType==="UnRanked"||!t.pp.enable||((c=(r=t.pp)==null?void 0:r.value)==null?void 0:c.length)<2)return!0;const l=t.pp.value[0],o=t.pp.value[1];return e.pp>=l&&(e.pp<=o||o===600)}function qe(e,t){var r,c;if(t.rankedType==="UnRanked"||!t.stars.enable||((c=(r=t.stars)==null?void 0:r.value)==null?void 0:c.length)<2)return!0;const l=t.stars.value[0],o=t.stars.value[1];return e.stars>=l&&e.stars<=o}function Xe(e,t,l){if(!t.competitor.enable||!t.competitor.id)return e.competitorAcc=null,e.competitorPP=null,!0;const o=l.get(e.id),r=o==null?void 0:o.baseScore;return r?(e.competitorPP=o==null?void 0:o.pp,e.competitorAcc=e.acc!==void 0&&e.acc>0?r/e.maxScore*100:void 0,t.competitor.type==="All"?!0:t.competitor.type==="Lower"?e.baseScore<=r:e.baseScore>=r):(e.competitorAcc=null,e.competitorPP=null,t.competitor.unplayed)}var We={async dataFilter(e,t,l){return Ke(e,t)&&Oe(e,t)&&He(e,t)&&Ge(e,t)&&Ze(e,t)&&qe(e,t)&&await Ye(e,t)&&Xe(e,t,l)}};const re=e=>(oe("data-v-7ff865b8"),e=e(),le(),e),Ve={class:"player-info"},et=re(()=>S("span",null,"Global Ranking",-1)),tt=re(()=>S("span",null,"Performance Points",-1)),at=re(()=>S("span",null,"Average Ranked Accuracy",-1)),nt={props:{playerInfo:Object},setup(e){const t=e;function l(){window.open(`https://scoresaber.com/u/${t.playerInfo.id}`,"_blank")}function o(){const r=Math.ceil(t.playerInfo.rank/50);window.open(`https://scoresaber.com/rankings?page=${r}`,"_blank")}return(r,c)=>{const m=p("a-avatar"),i=p("a-button"),g=p("a-tooltip"),A=p("a-card-meta"),k=p("a-card");return b(),C(k,null,{default:n(()=>[a(A,null,{avatar:n(()=>[a(m,{size:64,src:e.playerInfo.avatar,onClick:l,class:"cursor-pointer"},null,8,["src"])]),title:n(()=>[a(i,{type:"primary",size:"large",shape:"round",block:"",ghost:"",class:"player-info-text",onClick:l},{default:n(()=>[h(Q(e.playerInfo.name),1)]),_:1})]),description:n(()=>{var v;return[S("div",Ve,[a(g,{placement:"bottom"},{title:n(()=>[et]),default:n(()=>[a(i,{type:"link",class:"player-info-text",onClick:o},{default:n(()=>[a(s(be)),h(" #"+Q(e.playerInfo.rank),1)]),_:1})]),_:1}),a(g,{placement:"bottom"},{title:n(()=>[tt]),default:n(()=>[a(i,{type:"text",class:"player-info-text"},{default:n(()=>[h(Q(e.playerInfo.pp)+"pp",1)]),_:1})]),_:1}),(v=e.playerInfo.scoreStats)!=null&&v.averageRankedAccuracy?(b(),C(g,{key:0,placement:"bottom"},{title:n(()=>[at]),default:n(()=>[a(i,{type:"text",class:"player-info-text"},{default:n(()=>[h(Q(e.playerInfo.scoreStats.averageRankedAccuracy.toFixed(2))+"%",1)]),_:1})]),_:1})):j("",!0)])]}),_:1})]),_:1})}}};var ot=H(nt,[["__scopeId","data-v-7ff865b8"]]);const lt={players:"players"};function rt(e){const t=localStorage.getItem(e);return new Map(JSON.parse(t))}function st(e,t){const l=JSON.stringify(Array.from(t));localStorage.setItem(e,l)}var M={keys:lt,getMap:rt,setMap:st};const ct={class:"competitor-modal-content"},it=h("\u5168\u90E8"),dt=h("\u6392\u4F4D\u66F2"),ut=h("\u975E\u6392\u4F4D\u66F2"),pt=h("\u5168\u90E8"),_t=h("\u5DF2\u5168\u8FDE"),ft=h("\u672A\u5168\u8FDE"),mt=h(" \u4E0E "),gt=h("\u76F8\u6BD4 "),vt=h("\u5305\u542B\u5176\u672A\u73A9\u8FC7\u8C31\u9762"),At=h(" \u67E5\u8BE2 "),yt={props:{loading:Boolean},emits:["submit"],setup(e,{emit:t}){const l=P(!1),o=P(),r=M.getMap(M.keys.players),c=P(!1),m=N({}),i=N({fullComboType:"All",rankedType:"Ranked",date:{enable:!1,value:[]},acc:{enable:!1,value:[0,100]},rank:{enable:!1,greater:!1,value:[0,300]},pp:{enable:!1,value:[0,600]},stars:{enable:!1,value:[0,14]},sort:{type:"PP",order:"DESC"},competitor:{enable:!1,id:null,type:"All",totalPage:0,unplayed:!1}});function g(){t("submit",i)}async function A(){if(!o.value)return;const u=O.matchPlayerId(o.value);await k(u)}async function k(u){c.value=!0;try{const d=await $.getPlayerInfo(u);m.id=d.id,m.name=d.name,m.avatar=d.profilePicture,i.competitor.totalPlayCount=d.scoreStats.totalPlayCount,i.competitor.id=d.id,i.competitor.enable=!0,r.set(d.id,{id:d.id,name:d.name,avatar:d.profilePicture}),M.setMap(M.keys.players,r),B()}catch{T.error("\u73A9\u5BB6\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25")}c.value=!1}function v(){l.value=!0}function B(){l.value=!1,o.value=null}const R=N({65:"A-",80:"S",90:"SS"}),z=N({10:"10",50:"50",100:"100",200:"200",300:"300+"}),U=N({100:"100",200:"200",300:"300",400:"400",500:"500",600:"600+"}),w=N([{value:"All",label:"\u5168\u90E8"},{value:"Lower",label:"\u66F4\u4F4E"},{value:"Higher ",label:"\u66F4\u9AD8"}]),I={"font-weight":"bolder","min-height":"30px"},J={"font-weight":"bolder","font-size":"22px","background-color":"#b9d7ea"};function f(u){return u&&u>W().endOf("day")}return(u,d)=>{const E=p("a-avatar"),y=p("a-tooltip"),x=p("a-avatar-group"),K=p("a-input-search"),G=p("a-modal"),D=p("a-radio-button"),Z=p("a-radio-group"),ie=p("a-space"),L=p("a-card"),Y=p("a-switch"),me=p("a-select"),ge=p("a-checkbox"),ve=p("a-range-picker"),q=p("a-slider"),Ae=p("a-button"),ye=p("a-spin");return b(),F(V,null,[a(G,{visible:l.value,"onUpdate:visible":d[1]||(d[1]=_=>l.value=_),title:"\u8BF7\u9009\u62E9\u6BD4\u8F83\u5BF9\u8C61",width:600,footer:null,onCancel:B},{default:n(()=>[S("div",ct,[s(r).size>0?(b(),C(x,{key:0,size:64,maxCount:5,"max-style":J},{default:n(()=>[(b(!0),F(V,null,ue(s(r).values(),_=>(b(),C(y,{key:_.id,placement:"top",title:_.name},{default:n(()=>[a(E,{src:_.avatar,onClick:ea=>k(_.id),class:"cursor-pointer"},null,8,["src","onClick"])]),_:2},1032,["title"]))),128))]),_:1})):j("",!0),a(K,{value:o.value,"onUpdate:value":d[0]||(d[0]=_=>o.value=_),placeholder:"\u8BF7\u8F93\u5165Score Saber\u8D26\u53F7\u6216Score Saber\u4E3B\u9875\u7F51\u5740","enter-button":"\u786E\u5B9A",size:"large","allow-clear":"",loading:c.value,onSearch:A},{prefix:n(()=>[a(s(ae))]),_:1},8,["value","loading"])])]),_:1},8,["visible"]),a(ye,{spinning:e.loading,size:"large"},{default:n(()=>[a(L,{bodyStyle:{padding:"2px 24px"}},{default:n(()=>[a(L,{hoverable:"",class:"form-card-item"},{default:n(()=>[a(ie,null,{default:n(()=>[a(Z,{value:s(i).rankedType,"onUpdate:value":d[2]||(d[2]=_=>s(i).rankedType=_),"button-style":"solid",size:"small"},{default:n(()=>[a(D,{value:"All"},{default:n(()=>[it]),_:1}),a(D,{value:"Ranked"},{default:n(()=>[dt]),_:1}),a(D,{value:"UnRanked"},{default:n(()=>[ut]),_:1})]),_:1},8,["value"]),a(Z,{value:s(i).fullComboType,"onUpdate:value":d[3]||(d[3]=_=>s(i).fullComboType=_),"button-style":"solid",size:"small"},{default:n(()=>[a(D,{value:"All"},{default:n(()=>[pt]),_:1}),a(D,{value:"FullCombo"},{default:n(()=>[_t]),_:1}),a(D,{value:"UnFullCombo"},{default:n(()=>[ft]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),a(L,{title:"\u73A9\u5BB6\u6BD4\u8F83",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).competitor.enable,"onUpdate:checked":d[4]||(d[4]=_=>s(i).competitor.enable=_)},null,8,["checked"])]),default:n(()=>[a(ie,null,{default:n(()=>[mt,s(i).competitor.enable&&s(m).id!=null?(b(),C(y,{key:0,placement:"bottom",title:s(m).name},{default:n(()=>[a(E,{size:64,src:s(m).avatar,class:"cursor-pointer",onClick:v},null,8,["src"])]),_:1},8,["title"])):(b(),C(y,{key:1,placement:"bottom",title:"\u8BF7\u9009\u62E9\u6BD4\u8F83\u5BF9\u8C61"},{default:n(()=>[a(E,{size:64,class:"cursor-pointer",onClick:v},{icon:n(()=>[a(s(ae))]),_:1})]),_:1})),gt,a(me,{ref:"select",size:"small",value:s(i).competitor.type,"onUpdate:value":d[5]||(d[5]=_=>s(i).competitor.type=_),style:{width:"120px"},options:s(w)},null,8,["value","options"]),a(ge,{checked:s(i).competitor.unplayed,"onUpdate:checked":d[6]||(d[6]=_=>s(i).competitor.unplayed=_)},{default:n(()=>[vt]),_:1},8,["checked"])]),_:1})]),_:1}),a(L,{title:"\u65E5\u671F",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).date.enable,"onUpdate:checked":d[7]||(d[7]=_=>s(i).date.enable=_)},null,8,["checked"])]),default:n(()=>[a(ve,{value:s(i).date.value,"onUpdate:value":d[8]||(d[8]=_=>s(i).date.value=_),"disabled-date":f,disabled:!s(i).date.enable,locale:s(he)},null,8,["value","disabled","locale"])]),_:1}),a(L,{title:"ACC",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).acc.enable,"onUpdate:checked":d[9]||(d[9]=_=>s(i).acc.enable=_)},null,8,["checked"])]),default:n(()=>[a(q,{value:s(i).acc.value,"onUpdate:value":d[10]||(d[10]=_=>s(i).acc.value=_),range:"",min:65,disabled:!s(i).acc.enable,"tip-formatter":_=>`${_}%`,marks:s(R)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),a(L,{title:"\u6392\u540D",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).rank.enable,"onUpdate:checked":d[11]||(d[11]=_=>s(i).rank.enable=_)},null,8,["checked"])]),default:n(()=>[a(q,{value:s(i).rank.value,"onUpdate:value":d[12]||(d[12]=_=>s(i).rank.value=_),range:"",min:0,max:300,step:10,disabled:!s(i).rank.enable,"tip-formatter":_=>_===300?"300+":_,marks:s(z)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),ke(S("div",null,[a(L,{title:"PP",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).pp.enable,"onUpdate:checked":d[13]||(d[13]=_=>s(i).pp.enable=_)},null,8,["checked"])]),default:n(()=>[a(q,{value:s(i).pp.value,"onUpdate:value":d[14]||(d[14]=_=>s(i).pp.value=_),range:"",min:0,max:600,step:10,disabled:!s(i).pp.enable,"tip-formatter":_=>_===600?"600+":_,marks:s(U)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),a(L,{title:"\u661F\u7EA7",hoverable:"",headStyle:I,class:"form-card-item"},{extra:n(()=>[a(Y,{checked:s(i).stars.enable,"onUpdate:checked":d[15]||(d[15]=_=>s(i).stars.enable=_)},null,8,["checked"])]),default:n(()=>[a(q,{value:s(i).stars.value,"onUpdate:value":d[16]||(d[16]=_=>s(i).stars.value=_),range:"",min:0,max:14,disabled:!s(i).stars.enable},null,8,["value","disabled"])]),_:1})],512),[[Se,s(i).rankedType!="UnRanked"]]),a(Ae,{type:"primary",shape:"round",size:"large",onClick:g,loading:e.loading},{icon:n(()=>[a(s(Ee))]),default:n(()=>[At]),_:1},8,["loading"])]),_:1})]),_:1},8,["spinning"])],64)}}};var bt=H(yt,[["__scopeId","data-v-40fe4395"]]);const se=e=>(oe("data-v-3deb779c"),e=e(),le(),e),ht={class:"data-list-item"},kt={class:"info-text text-bolder"},St={class:"text-bolder"},Et={class:"text-bolder"},Qt={class:"text-bolder"},Ct={class:"text-bolder"},wt=se(()=>S("span",null,"Copy BSR",-1)),It=se(()=>S("span",null,"One-Click",-1)),xt=se(()=>S("span",null,"Download zip",-1)),Bt={props:{item:Object},setup(e){var I,J;const t=e,{toClipboard:l}=Qe(),o=P((I=t.item)==null?void 0:I.key),r=P((J=t.item)==null?void 0:J.mapperId),c=X(()=>t.item.acc-t.item.competitorAcc),m=X(()=>t.item.pp-t.item.competitorPP),i=new Map([["_Easy_SoloStandard","E"],["_Normal_SoloStandard","N"],["_Hard_SoloStandard","H"],["_Expert_SoloStandard","Ex"],["_ExpertPlus_SoloStandard","Ex+"]]),g=new Map([["_Easy_SoloStandard","green"],["_Normal_SoloStandard","cyan"],["_Hard_SoloStandard","orange"],["_Expert_SoloStandard","red"],["_ExpertPlus_SoloStandard","purple"]]),A=X(()=>{var f;return t.item.ranked?`${t.item.stars}\u2605`:(f=i.get(t.item.difficultyRaw))!=null?f:"O"}),k=X(()=>{var f;return(f=g.get(t.item.difficultyRaw))!=null?f:"yellow"});async function v(){if(!(o.value&&r.value))return $.getSongInfo(t.item.songHash).then(f=>{var u;o.value=f==null?void 0:f.id,r.value=(u=f==null?void 0:f.uploader)==null?void 0:u.id}).catch(f=>{T.error("BeatSaver\u8C31\u9762\u4FE1\u606F\u83B7\u53D6\u5931\u8D25")})}async function B(){await v(),o.value&&window.open(`https://beatsaver.com/maps/${o.value}`,"_blank")}async function R(){await v(),r.value&&window.open(`https://beatsaver.com/profile/${r.value}`,"_blank")}async function z(){if(await v(),o.value){const f=`!bsr ${o.value}`;try{await l(f),T.success("\u590D\u5236\u6210\u529F: "+f)}catch{T.error("\u590D\u5236\u5931\u8D25")}}}async function U(){await v(),o.value&&window.open(`beatsaver://${o.value}`,"_blank")}function w(){window.open(`https://na.cdn.beatsaver.com/${t.item.songHash.toLowerCase()}.zip`,"_blank")}return(f,u)=>{const d=p("a-image"),E=p("a-col"),y=p("a-button"),x=p("a-row"),K=p("a-tooltip"),G=p("a-space"),D=p("a-card"),Z=p("a-badge-ribbon");return b(),F("div",ht,[a(Z,{text:s(A),color:s(k),placement:"start"},{default:n(()=>[a(D,{bodyStyle:{padding:"10px"}},{default:n(()=>[a(x,{justify:"space-between",align:"middle",wrap:""},{default:n(()=>[a(E,{span:16},{default:n(()=>[a(x,{justify:"start",wrap:""},{default:n(()=>[a(E,null,{default:n(()=>[a(d,{width:64,src:e.item.coverImage,placeholder:"",fallback:"data:image/png;base64,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"},null,8,["src"])]),_:1}),a(E,null,{default:n(()=>[a(x,{justify:"start"},{default:n(()=>[a(y,{type:"link",onClick:B},{default:n(()=>[S("span",kt,Q(e.item.songName)+" "+Q(e.item.songSubName)+" - "+Q(e.item.songAuthorName),1)]),_:1})]),_:1}),a(x,{justify:"start"},{default:n(()=>[a(y,{class:"info-text",type:"text",onClick:R},{default:n(()=>[h(Q(e.item.levelAuthorName),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(E,{span:8},{default:n(()=>[a(x,{justify:"end"},{default:n(()=>[a(G,null,{default:n(()=>[S("span",St,Q(e.item.timeSet.format("YYYY.MM.DD")),1),e.item.acc!=-1/0?(b(),C(y,{key:0,type:"primary",ghost:"",shape:"round"},{default:n(()=>[S("span",Et,Q(e.item.acc.toFixed(2))+"%",1),e.item.competitorAcc!=null&&s(c)!=0?(b(),F("span",{key:0,class:de(`num-difference ${s(c)>0?"acc-higher":"acc-lower"}`)},"\xA0"+Q(`${s(c)>0?"+":""}${s(c).toFixed(2)}%`),3)):j("",!0)]),_:1})):j("",!0),e.item.ranked?(b(),C(y,{key:1,type:"primary",ghost:"",shape:"round"},{default:n(()=>[S("span",Qt,Q(e.item.pp.toFixed(2))+"pp",1),e.item.competitorPP!=null&&s(m)!=0?(b(),F("span",{key:0,class:de(`num-difference ${s(m)>0?"acc-higher":"acc-lower"}`)},"\xA0"+Q(`${s(m)>0?"+":""}${s(m).toFixed(2)}`),3)):j("",!0),S("span",Ct,"\xA0/ "+Q(e.item.ppWeighted.toFixed(2))+"pp",1)]),_:1})):j("",!0),a(K,{placement:"bottom"},{title:n(()=>[wt]),default:n(()=>[a(y,{type:"primary",shape:"circle",onClick:z},{icon:n(()=>[a(s(Ce))]),_:1})]),_:1}),a(K,{placement:"bottom"},{title:n(()=>[It]),default:n(()=>[a(y,{type:"primary",shape:"circle",onClick:U},{icon:n(()=>[a(s(we))]),_:1})]),_:1}),a(K,{placement:"bottom"},{title:n(()=>[xt]),default:n(()=>[a(y,{type:"primary",shape:"circle",onClick:w},{icon:n(()=>[a(s(pe))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["text","color"])])}}};var Pt=H(Bt,[["__scopeId","data-v-3deb779c"]]);const Nt=h(" \u6309 "),Ut=h("\u6392\u5E8F "),Mt={props:{loading:Boolean},emits:["change"],setup(e,{emit:t}){const l=e,o=N({type:"pp",order:"DESC"});Ie(()=>l.loading,(i,g)=>{i&&(o.type="pp",o.order="DESC")});const r=N([{value:"pp",label:"PP"},{value:"timeSet",label:"\u65E5\u671F"},{value:"stars",label:"\u661F\u7EA7"},{value:"acc",label:"ACC"}]),c=N([{value:"DESC",label:"\u4ECE\u5927\u5230\u5C0F"},{value:"ASC",label:"\u4ECE\u5C0F\u5230\u5927"}]);function m(){t("change",o)}return(i,g)=>{const A=p("a-select"),k=p("a-space");return b(),C(k,null,{default:n(()=>[Nt,a(A,{ref:"select",size:"small",value:s(o).type,"onUpdate:value":g[0]||(g[0]=v=>s(o).type=v),style:{width:"120px"},options:s(r),onChange:m},null,8,["value","options"]),a(A,{ref:"select",size:"small",value:s(o).order,"onUpdate:value":g[1]||(g[1]=v=>s(o).order=v),style:{width:"120px"},options:s(c),onChange:m},null,8,["value","options"]),Ut]),_:1})}}};const Rt=h(" \u4E0B\u8F7D\u6B4C\u5355 "),zt={class:"model"},Jt=h(" \u6B4C\u5355\u6807\u9898 "),Dt=h(" \u4E0B\u8F7D\u524D "),Lt=h(" \u9996 "),jt=h("\u53D6\u6D88"),Ft=h("\u786E\u5B9A"),Tt={props:{data:Object,playerInfo:Object,loading:Boolean},setup(e){const t=e,l=P(!1),o=P("ScoreSaberPlaylist"),r=P(0),c={pageSize:8,showTotal:(k,v)=>`\u5171 ${k} \u6761\u6570\u636E [ ${v[0]} - ${v[1]} ]`,showQuickJumper:!0};async function m(){await O.downloadPlaylist(t.data,t.playerInfo.avatar,o.value,r.value),g()}function i(){o.value=`ScoreSaberPlaylist-${t.playerInfo.name}`,r.value=t.data.length,l.value=!0}function g(){l.value=!1}function A(k){O.sort(t.data,k)}return(k,v)=>{const B=p("a-button"),R=p("a-space"),z=p("a-card"),U=p("a-spin"),w=p("a-list"),I=p("a-input"),J=p("a-input-number"),f=p("a-modal");return b(),F(V,null,[a(w,{"data-source":e.data,pagination:c,class:"data-list"},{header:n(()=>[a(U,{spinning:e.loading,size:"large"},{default:n(()=>{var u;return[e.loading||((u=e.data)==null?void 0:u.length)?(b(),C(z,{key:0,hoverable:""},{default:n(()=>[a(R,{size:"large"},{default:n(()=>[a(Mt,{loading:e.loading,onChange:A},null,8,["loading"]),a(B,{type:"primary",shape:"round",size:"large",loading:e.loading,onClick:i},{icon:n(()=>[a(s(pe))]),default:n(()=>[Rt]),_:1},8,["loading"])]),_:1})]),_:1})):j("",!0)]}),_:1},8,["spinning"])]),renderItem:n(({item:u})=>[(b(),C(Pt,{item:u,key:u.id},null,8,["item"]))]),_:1},8,["data-source"]),a(f,{visible:l.value,"onUpdate:visible":v[2]||(v[2]=u=>l.value=u),title:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},{footer:n(()=>[a(B,{key:"back",onClick:g},{default:n(()=>[jt]),_:1}),a(B,{key:"submit",type:"primary",loading:e.loading,onClick:m},{default:n(()=>[Ft]),_:1},8,["loading"])]),default:n(()=>[S("div",zt,[S("div",null,[a(I,{value:o.value,"onUpdate:value":v[0]||(v[0]=u=>o.value=u),placeholder:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},{addonBefore:n(()=>[Jt]),_:1},8,["value"])]),S("div",null,[Dt,a(J,{value:r.value,"onUpdate:value":v[1]||(v[1]=u=>r.value=u),min:1,max:t.data.length,precision:0},null,8,["value","max"]),Lt])])]),_:1},8,["visible"])],64)}}};var $t=H(Tt,[["__scopeId","data-v-a0f81694"]]);const Kt={setup(e){const t=xe(7),l=[];let o=null;const r=new Map,c=N({}),m=N([]),i=P(0),g=P(!1),A=_e(),k=A.currentRoute.value.params.id;k&&v(k);function v(f){$.getPlayerInfo(f).then(u=>{c.id=u.id,c.name=u.name,c.avatar=u.profilePicture,c.pp=u.pp,c.rank=u.rank,i.value=Math.ceil(u.scoreStats.totalPlayCount/ee.pageSize);const d=M.getMap(M.keys.players);d.set(u.id,{id:u.id,name:u.name,avatar:u.profilePicture}),M.setMap(M.keys.players,d)}).catch(u=>{console.error(u),T.error("\u73A9\u5BB6\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),A.push("/")})}async function B(f){if(g.value)return;if(!(c!=null&&c.id)){T.error("\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),A.push("/");return}g.value=!0,m.length=0,console.time("\u603B\u8017\u65F6"),console.time("\u67E5\u8BE2\u73A9\u5BB6\u8BB0\u5F55\u8017\u65F6"),await z(),console.timeEnd("\u67E5\u8BE2\u73A9\u5BB6\u8BB0\u5F55\u8017\u65F6"),console.time("\u67E5\u8BE2\u6BD4\u8F83\u5BF9\u8C61\u8BB0\u5F55\u8017\u65F6"),await R(f),console.timeEnd("\u67E5\u8BE2\u6BD4\u8F83\u5BF9\u8C61\u8BB0\u5F55\u8017\u65F6"),console.time("\u5904\u7406\u6570\u636E\u8017\u65F6"),await I(f),console.timeEnd("\u5904\u7406\u6570\u636E\u8017\u65F6"),console.timeEnd("\u603B\u8017\u65F6"),console.log("------------------------------");const u={type:"pp",order:"DESC"};O.sort(m,u),g.value=!1}async function R(f){const u=f.competitor.id;if(!f.competitor.enable||!u||u===o||(r.clear(),u===k))return;o=u;const d=Math.ceil(f.competitor.totalPlayCount/ee.pageSize);await U(u,d,y=>{const x=y.leaderboard.id,K=y.score.baseScore,G=y.score.pp;r.set(x,{baseScore:K,pp:G})})}async function z(){if(l!=null&&l.length)return;const f=u=>{const d=O.playerScoreToItem(u);l.push(d)};await U(c==null?void 0:c.id,i.value,f)}async function U(f,u,d){const E=[];for(let y=1;y<=u;y++){const x=w(f,y,d);E.push(x)}await Promise.all(E)}async function w(f,u,d){try{const E=await $.getScores(f,u);for(const y of E)d(y)}catch(E){console.error(E),T.error("ScoreSaber\u8BB0\u5F55\u67E5\u8BE2\u5F02\u5E38")}}async function I(f){const u=[];for(const d of l){const E=t(()=>J(d,f));u.push(E)}await Promise.all(u)}async function J(f,u){await We.dataFilter(f,u,r)&&m.push(f)}return(f,u)=>{var x;const d=p("a-col"),E=p("a-row"),y=p("a-spin");return b(),C(y,{spinning:((x=s(c))==null?void 0:x.id)===void 0,size:"large"},{default:n(()=>[a(E,{justify:"space-between",align:"top",class:"main-layout"},{default:n(()=>[a(d,{span:7,class:"main-layout-slider"},{default:n(()=>[a(ot,{"player-info":s(c)},null,8,["player-info"]),a(bt,{onSubmit:B,loading:g.value},null,8,["loading"])]),_:1}),a(d,{span:17},{default:n(()=>[a($t,{data:s(m),playerInfo:s(c),loading:g.value},null,8,["data","playerInfo","loading"])]),_:1})]),_:1})]),_:1},8,["spinning"])}}};var Ot=H(Kt,[["__scopeId","data-v-3a7b566e"]]);const Ht=e=>(oe("data-v-217905c8"),e=e(),le(),e),Yt={class:"login-layout"},Gt={class:"login-content"},Zt=Ht(()=>S("h1",null,"Score Saber Playlist",-1)),qt={setup(e){const t=P(),l=P(!1),o=_e(),r=M.getMap(M.keys.players);function c(){!t.value||(l.value=!0,t.value=O.matchPlayerId(t.value),$.getPlayerInfo(t.value).then(g=>{l.value=!1,m(t.value)}).catch(g=>{console.error(g),l.value=!1,T.error("\u67E5\u8BE2\u7528\u6237\u4FE1\u606F\u5931\u8D25")}))}function m(g){o.push(`/u/${g}`)}const i={"font-weight":"bolder","font-size":"22px","background-color":"#b9d7ea"};return(g,A)=>{const k=p("a-image"),v=p("a-avatar"),B=p("a-tooltip"),R=p("a-avatar-group"),z=p("a-input-search"),U=p("a-card");return b(),F("div",Yt,[a(U,null,{default:n(()=>[S("div",Gt,[a(k,{width:128,preview:!1,src:"https://scoresaber.com/images/logo.svg"}),S("div",null,[Zt,S("h3",null,"Version "+Q(s(ee).version),1)]),s(r).size>0?(b(),C(R,{key:0,size:64,maxCount:5,"max-style":i},{default:n(()=>[(b(!0),F(V,null,ue(s(r).values(),w=>(b(),C(B,{key:w.id,placement:"top",title:w.name},{default:n(()=>[a(v,{src:w.avatar,onClick:I=>m(w.id),class:"cursor-pointer"},null,8,["src","onClick"])]),_:2},1032,["title"]))),128))]),_:1})):j("",!0),a(z,{value:t.value,"onUpdate:value":A[0]||(A[0]=w=>t.value=w),placeholder:"\u8BF7\u8F93\u5165Score Saber\u8D26\u53F7\u6216Score Saber\u4E3B\u9875\u7F51\u5740","enter-button":"\u786E\u5B9A",size:"large","allow-clear":"",loading:l.value,onSearch:c},{prefix:n(()=>[a(s(ae))]),_:1},8,["value","loading"])])]),_:1})])}}};var Xt=H(qt,[["__scopeId","data-v-217905c8"]]);const Wt=[{path:"/",component:Xt},{path:"/u/:id",component:Ot}],Vt=Be({history:Pe(),routes:Wt});const ce=Ne(Je);ce.use(Vt);ce.use(Ue);ce.mount("#app");
