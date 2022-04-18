import{r as u,o as b,c as I,a as oe,d as $,w as o,b as t,e as E,t as Q,f as C,u as s,G as ve,g as T,p as ne,h as le,i as U,j as N,k as j,F as X,l as ue,U as te,m as ye,n as be,v as he,S as ke,q as O,_ as Se,s as q,x as de,C as Ee,y as Ce,D as pe,z as Qe,A as Ie,B as Ae,E as we,H as xe,I as Be,J as Pe}from"./vendor.8e0f1664.js";const Ne=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const A of i.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&n(A)}).observe(document,{childList:!0,subtree:!0});function c(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerpolicy&&(i.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?i.credentials="include":l.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(l){if(l.ep)return;l.ep=!0;const i=c(l);fetch(l.href,i)}};Ne();var Y=(e,a)=>{const c=e.__vccOpts||e;for(const[n,l]of a)c[n]=l;return c};const Ue={};function Me(e,a){const c=u("router-view");return b(),I(c)}var Je=Y(Ue,[["render",Me]]),ae={getScoreSaberData:e=>oe.post("https://b1s8vig5.api.lncldglobal.com/1.1/functions/getScoreSaberData",{url:e},{headers:{"x-lc-id":"B1s8viG57mIaYwcxmYKgndRp-MdYXbMMI","x-lc-key":"9QwyH5wTJQdz41P5S2qMUaS0","Content-Type":"application/json"}}).then(a=>{var c;return(c=a==null?void 0:a.data)==null?void 0:c.result})},ee={version:"1.4.0",pageSize:100};function ze(e){return oe.get(e).then(a=>a.data)}var L={getPlayerInfo(e){return ae.getScoreSaberData(`https://scoresaber.com/api/player/${e}/full`)},getScores(e,a,c=ee.pageSize,n="top"){return ae.getScoreSaberData(`https://scoresaber.com/api/player/${e}/scores?page=${a}&sort=${n}&limit=${c}&withMetadata=false`).then(l=>l.playerScores)},getLeaderBoardInfo(e){return ae.getScoreSaberData(`https://scoresaber.com/api/leaderboard/by-id/${e}/info`)},getSongInfo(e){return ze(`https://beatsaver.com/api/maps/hash/${e}`)},downloadFile(e,a){return oe.get(e,{responseType:"blob"}).then(c=>{const n=new Blob([c.data]),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download=a,l.click(),URL.revokeObjectURL(l.href)}).catch(console.error)}};function Re(e,a){const{type:c,order:n}=a;e.sort((l,i)=>l[c]>i[c]?-1:1),n==="ASC"&&e.reverse()}async function Fe(e){var A,d,f;if(e.acc!==void 0&&e.acc!==-1/0)return e.acc;if(!e.baseScore)return 0;if(e.ranked)return e.baseScore/e.maxScore*100;let a=null;try{a=await L.getLeaderBoardInfo(e.id)}catch{return-1/0}const c=a.difficulties.findIndex(h=>h.leaderboardId===e.id);if(c===-1)return-1/0;let n=null;try{n=await L.getSongInfo(e.songHash)}catch{return-1/0}const l=(d=(A=n==null?void 0:n.versions)==null?void 0:A[0])==null?void 0:d.diffs[c];if(e.key=n==null?void 0:n.id,e.mapperId=(f=n==null?void 0:n.uploader)==null?void 0:f.id,!l)return-1/0;const i=l.notes;if(i>13)e.maxScore=i*920-7245;else if(i>5)e.maxScore=i*460-1265;else if(i>1)e.maxScore=i*230-115;else if(i===1)e.maxScore=115;else return-1/0;return e.baseScore/e.maxScore*100}async function De(e,a){const c=[];for(const i of e){const A={songName:i.songName,hash:i.songHash,difficulties:[{characteristic:"Standard",name:i.difficultyRaw.split("_")[1]}]};c.push(A)}const n={playlistTitle:a,playlistAuthor:"ScoreSaberPlaylist",songs:c,image:"data:image/png;base64,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"},l=`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(n))}`;L.downloadFile(l,`${a}.bplist`)}function Ke(e){const a=e.score,c=e.leaderboard;return{id:c.id,rank:a.rank,baseScore:a.baseScore,maxScore:c.maxScore,pp:a.pp,ppWeighted:a.pp*a.weight,fullCombo:a.fullCombo,timeSet:$(a.timeSet),songHash:c.songHash,songName:c.songName,songSubName:c.songSubName,songAuthorName:c.songAuthorName,levelAuthorName:c.levelAuthorName,difficultyRaw:c.difficulty.difficultyRaw,ranked:c.ranked,stars:c.stars,coverImage:c.coverImage}}function Te(e){const a=/scoresaber.com\/u\/(\S+)/.exec(e);return a!=null&&a[1]?a[1]:e}var H={sort:Re,getAcc:Fe,downloadPlaylist:De,playerScoreToItem:Ke,matchPlayerId:Te};function je(e,a){return a.rankedType==="All"||(e.ranked?a.rankedType==="Ranked":a.rankedType==="UnRanked")}function Oe(e,a){return a.fullComboType==="All"||(e.fullCombo?a.fullComboType==="FullCombo":a.fullComboType==="UnFullCombo")}function Le(e,a){var l,i;if(!a.date.enable||((i=(l=a.date)==null?void 0:l.value)==null?void 0:i.length)<2)return!0;const c=$(a.date.value[0]).startOf("day"),n=$(a.date.value[1]).endOf("day");return e.timeSet>=c&&e.timeSet<=n}async function He(e,a){var l,i;if(e.acc=await H.getAcc(e),!a.acc.enable||((i=(l=a.acc)==null?void 0:l.value)==null?void 0:i.length)<2)return!0;const c=a.acc.value[0],n=a.acc.value[1];return e.acc>=c&&e.acc<=n}function Ye(e,a){var l,i;if(!a.rank.enable||((i=(l=a.rank)==null?void 0:l.value)==null?void 0:i.length)<2)return!0;const c=a.rank.value[0],n=a.rank.value[1];return e.rank>=c&&(e.rank<=n||n===300)}function Ge(e,a){var l,i;if(a.rankedType==="UnRanked"||!a.pp.enable||((i=(l=a.pp)==null?void 0:l.value)==null?void 0:i.length)<2)return!0;const c=a.pp.value[0],n=a.pp.value[1];return e.pp>=c&&(e.pp<=n||n===600)}function Ze(e,a){var l,i;if(a.rankedType==="UnRanked"||!a.stars.enable||((i=(l=a.stars)==null?void 0:l.value)==null?void 0:i.length)<2)return!0;const c=a.stars.value[0],n=a.stars.value[1];return e.stars>=c&&e.stars<=n}function Ve(e,a,c){if(!a.competitor.enable||!a.competitor.id)return e.competitorAcc=null,e.competitorPP=null,!0;const n=c.get(e.id),l=n==null?void 0:n.baseScore;return l?(e.competitorPP=n==null?void 0:n.pp,e.competitorAcc=e.acc!==void 0&&e.acc>0?l/e.maxScore*100:void 0,a.competitor.type==="All"?!0:a.competitor.type==="Lower"?e.baseScore<=l:e.baseScore>=l):(e.competitorAcc=null,e.competitorPP=null,!1)}var We={async dataFilter(e,a,c){return je(e,a)&&Oe(e,a)&&Le(e,a)&&Ye(e,a)&&Ge(e,a)&&Ze(e,a)&&await He(e,a)&&Ve(e,a,c)}};const re=e=>(ne("data-v-7ff865b8"),e=e(),le(),e),qe={class:"player-info"},$e=re(()=>C("span",null,"Global Ranking",-1)),Xe=re(()=>C("span",null,"Performance Points",-1)),ea=re(()=>C("span",null,"Average Ranked Accuracy",-1)),aa={props:{playerInfo:Object},setup(e){const a=e;function c(){window.open(`https://scoresaber.com/u/${a.playerInfo.id}`,"_blank")}function n(){const l=Math.ceil(a.playerInfo.rank/50);window.open(`https://scoresaber.com/rankings?page=${l}`,"_blank")}return(l,i)=>{const A=u("a-avatar"),d=u("a-button"),f=u("a-tooltip"),h=u("a-card-meta"),k=u("a-card");return b(),I(k,null,{default:o(()=>[t(h,null,{avatar:o(()=>[t(A,{size:64,src:e.playerInfo.avatar,onClick:c,class:"cursor-pointer"},null,8,["src"])]),title:o(()=>[t(d,{type:"primary",size:"large",shape:"round",block:"",ghost:"",class:"player-info-text",onClick:c},{default:o(()=>[E(Q(e.playerInfo.name),1)]),_:1})]),description:o(()=>{var _;return[C("div",qe,[t(f,{placement:"bottom"},{title:o(()=>[$e]),default:o(()=>[t(d,{type:"link",class:"player-info-text",onClick:n},{default:o(()=>[t(s(ve)),E(" #"+Q(e.playerInfo.rank),1)]),_:1})]),_:1}),t(f,{placement:"bottom"},{title:o(()=>[Xe]),default:o(()=>[t(d,{type:"text",class:"player-info-text"},{default:o(()=>[E(Q(e.playerInfo.pp)+"pp",1)]),_:1})]),_:1}),(_=e.playerInfo.scoreStats)!=null&&_.averageRankedAccuracy?(b(),I(f,{key:0,placement:"bottom"},{title:o(()=>[ea]),default:o(()=>[t(d,{type:"text",class:"player-info-text"},{default:o(()=>[E(Q(e.playerInfo.scoreStats.averageRankedAccuracy.toFixed(2))+"%",1)]),_:1})]),_:1})):T("",!0)])]}),_:1})]),_:1})}}};var ta=Y(aa,[["__scopeId","data-v-7ff865b8"]]);const oa={players:"players"};function na(e){const a=localStorage.getItem(e);return new Map(JSON.parse(a))}function la(e,a){const c=JSON.stringify(Array.from(a));localStorage.setItem(e,c)}var z={keys:oa,getMap:na,setMap:la};const ra={class:"competitor-modal-content"},sa=E("\u5168\u90E8"),ca=E("\u6392\u4F4D\u66F2"),ia=E("\u975E\u6392\u4F4D\u66F2"),da=E("\u5168\u90E8"),ua=E("\u5DF2\u5168\u8FDE"),pa=E("\u672A\u5168\u8FDE"),Aa=E(" \u4E0E "),ga=E("\u76F8\u6BD4 "),fa=E(" \u67E5\u8BE2 "),ma={props:{loading:Boolean},emits:["submit"],setup(e,{emit:a}){const c=U(!1),n=U(),l=z.getMap(z.keys.players),i=U(!1),A=N({}),d=N({fullComboType:"All",rankedType:"Ranked",date:{enable:!1,value:[]},acc:{enable:!1,value:[0,100]},rank:{enable:!1,greater:!1,value:[0,300]},pp:{enable:!1,value:[0,600]},stars:{enable:!1,value:[0,14]},sort:{type:"PP",order:"DESC"},competitor:{enable:!1,id:null,type:"All",totalPage:0}});function f(){a("submit",d)}async function h(){if(!n.value)return;const g=H.matchPlayerId(n.value);await k(g)}async function k(g){i.value=!0;try{const r=await L.getPlayerInfo(g);A.id=r.id,A.name=r.name,A.avatar=r.profilePicture,d.competitor.totalPlayCount=r.scoreStats.totalPlayCount,d.competitor.id=r.id,d.competitor.enable=!0,l.set(r.id,{id:r.id,name:r.name,avatar:r.profilePicture}),z.setMap(z.keys.players,l),B()}catch{O.error("\u73A9\u5BB6\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25")}i.value=!1}function _(){c.value=!0}function B(){c.value=!1,n.value=null}const R=N({65:"A-",80:"S",90:"SS"}),F=N({10:"10",50:"50",100:"100",200:"200",300:"300+"}),M=N({100:"100",200:"200",300:"300",400:"400",500:"500",600:"600+"}),w=N([{value:"All",label:"\u5168\u90E8"},{value:"Lower",label:"\u66F4\u4F4E"},{value:"Higher ",label:"\u66F4\u9AD8"}]),x={"font-weight":"bolder","min-height":"30px"},D={"font-weight":"bolder","font-size":"22px","background-color":"#b9d7ea"};function m(g){return g&&g>$().endOf("day")}return(g,r)=>{const v=u("a-avatar"),y=u("a-tooltip"),S=u("a-avatar-group"),P=u("a-input-search"),Z=u("a-modal"),J=u("a-radio-button"),V=u("a-radio-group"),ie=u("a-space"),K=u("a-card"),G=u("a-switch"),ge=u("a-select"),fe=u("a-range-picker"),W=u("a-slider"),me=u("a-button"),_e=u("a-spin");return b(),j(X,null,[t(Z,{visible:c.value,"onUpdate:visible":r[1]||(r[1]=p=>c.value=p),title:"\u8BF7\u9009\u62E9\u6BD4\u8F83\u5BF9\u8C61",width:600,footer:null,onCancel:B},{default:o(()=>[C("div",ra,[s(l).size>0?(b(),I(S,{key:0,size:64,maxCount:5,"max-style":D},{default:o(()=>[(b(!0),j(X,null,ue(s(l).values(),p=>(b(),I(y,{key:p.id,placement:"top",title:p.name},{default:o(()=>[t(v,{src:p.avatar,onClick:Ga=>k(p.id),class:"cursor-pointer"},null,8,["src","onClick"])]),_:2},1032,["title"]))),128))]),_:1})):T("",!0),t(P,{value:n.value,"onUpdate:value":r[0]||(r[0]=p=>n.value=p),placeholder:"\u8BF7\u8F93\u5165Score Saber\u8D26\u53F7\u6216Score Saber\u4E3B\u9875\u7F51\u5740","enter-button":"\u786E\u5B9A",size:"large","allow-clear":"",loading:i.value,onSearch:h},{prefix:o(()=>[t(s(te))]),_:1},8,["value","loading"])])]),_:1},8,["visible"]),t(_e,{spinning:e.loading,size:"large"},{default:o(()=>[t(K,{bodyStyle:{padding:"2px 24px"}},{default:o(()=>[t(K,{hoverable:"",class:"form-card-item"},{default:o(()=>[t(ie,null,{default:o(()=>[t(V,{value:s(d).rankedType,"onUpdate:value":r[2]||(r[2]=p=>s(d).rankedType=p),"button-style":"solid",size:"small"},{default:o(()=>[t(J,{value:"All"},{default:o(()=>[sa]),_:1}),t(J,{value:"Ranked"},{default:o(()=>[ca]),_:1}),t(J,{value:"UnRanked"},{default:o(()=>[ia]),_:1})]),_:1},8,["value"]),t(V,{value:s(d).fullComboType,"onUpdate:value":r[3]||(r[3]=p=>s(d).fullComboType=p),"button-style":"solid",size:"small"},{default:o(()=>[t(J,{value:"All"},{default:o(()=>[da]),_:1}),t(J,{value:"FullCombo"},{default:o(()=>[ua]),_:1}),t(J,{value:"UnFullCombo"},{default:o(()=>[pa]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),t(K,{title:"PK",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).competitor.enable,"onUpdate:checked":r[4]||(r[4]=p=>s(d).competitor.enable=p)},null,8,["checked"])]),default:o(()=>[t(ie,null,{default:o(()=>[Aa,s(d).competitor.enable&&s(A).id!=null?(b(),I(y,{key:0,placement:"bottom",title:s(A).name},{default:o(()=>[t(v,{size:64,src:s(A).avatar,class:"cursor-pointer",onClick:_},null,8,["src"])]),_:1},8,["title"])):(b(),I(y,{key:1,placement:"bottom",title:"\u8BF7\u9009\u62E9\u6BD4\u8F83\u5BF9\u8C61"},{default:o(()=>[t(v,{size:64,class:"cursor-pointer",onClick:_},{icon:o(()=>[t(s(te))]),_:1})]),_:1})),ga,t(ge,{ref:"select",size:"small",value:s(d).competitor.type,"onUpdate:value":r[5]||(r[5]=p=>s(d).competitor.type=p),style:{width:"120px"},options:s(w)},null,8,["value","options"])]),_:1})]),_:1}),t(K,{title:"\u65E5\u671F",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).date.enable,"onUpdate:checked":r[6]||(r[6]=p=>s(d).date.enable=p)},null,8,["checked"])]),default:o(()=>[t(fe,{value:s(d).date.value,"onUpdate:value":r[7]||(r[7]=p=>s(d).date.value=p),"disabled-date":m,disabled:!s(d).date.enable,locale:s(ye)},null,8,["value","disabled","locale"])]),_:1}),t(K,{title:"ACC",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).acc.enable,"onUpdate:checked":r[8]||(r[8]=p=>s(d).acc.enable=p)},null,8,["checked"])]),default:o(()=>[t(W,{value:s(d).acc.value,"onUpdate:value":r[9]||(r[9]=p=>s(d).acc.value=p),range:"",min:65,disabled:!s(d).acc.enable,"tip-formatter":p=>`${p}%`,marks:s(R)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),t(K,{title:"\u6392\u540D",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).rank.enable,"onUpdate:checked":r[10]||(r[10]=p=>s(d).rank.enable=p)},null,8,["checked"])]),default:o(()=>[t(W,{value:s(d).rank.value,"onUpdate:value":r[11]||(r[11]=p=>s(d).rank.value=p),range:"",min:0,max:300,step:10,disabled:!s(d).rank.enable,"tip-formatter":p=>p===300?"300+":p,marks:s(F)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),be(C("div",null,[t(K,{title:"PP",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).pp.enable,"onUpdate:checked":r[12]||(r[12]=p=>s(d).pp.enable=p)},null,8,["checked"])]),default:o(()=>[t(W,{value:s(d).pp.value,"onUpdate:value":r[13]||(r[13]=p=>s(d).pp.value=p),range:"",min:0,max:600,step:10,disabled:!s(d).pp.enable,"tip-formatter":p=>p===600?"600+":p,marks:s(M)},null,8,["value","disabled","tip-formatter","marks"])]),_:1}),t(K,{title:"\u661F\u7EA7",hoverable:"",headStyle:x,class:"form-card-item"},{extra:o(()=>[t(G,{checked:s(d).stars.enable,"onUpdate:checked":r[14]||(r[14]=p=>s(d).stars.enable=p)},null,8,["checked"])]),default:o(()=>[t(W,{value:s(d).stars.value,"onUpdate:value":r[15]||(r[15]=p=>s(d).stars.value=p),range:"",min:0,max:14,disabled:!s(d).stars.enable},null,8,["value","disabled"])]),_:1})],512),[[he,s(d).rankedType!="UnRanked"]]),t(me,{type:"primary",shape:"round",size:"large",onClick:f,loading:e.loading},{icon:o(()=>[t(s(ke))]),default:o(()=>[fa]),_:1},8,["loading"])]),_:1})]),_:1},8,["spinning"])],64)}}};var _a=Y(ma,[["__scopeId","data-v-b3e86448"]]);const se=e=>(ne("data-v-3deb779c"),e=e(),le(),e),va={class:"data-list-item"},ya={class:"info-text text-bolder"},ba={class:"text-bolder"},ha={class:"text-bolder"},ka={class:"text-bolder"},Sa={class:"text-bolder"},Ea=se(()=>C("span",null,"Copy BSR",-1)),Ca=se(()=>C("span",null,"One-Click",-1)),Qa=se(()=>C("span",null,"Download zip",-1)),Ia={props:{item:Object},setup(e){var x,D;const a=e,{toClipboard:c}=Se(),n=U((x=a.item)==null?void 0:x.key),l=U((D=a.item)==null?void 0:D.mapperId),i=q(()=>a.item.acc-a.item.competitorAcc),A=q(()=>a.item.pp-a.item.competitorPP),d=new Map([["_Easy_SoloStandard","E"],["_Normal_SoloStandard","N"],["_Hard_SoloStandard","H"],["_Expert_SoloStandard","Ex"],["_ExpertPlus_SoloStandard","Ex+"]]),f=new Map([["_Easy_SoloStandard","green"],["_Normal_SoloStandard","cyan"],["_Hard_SoloStandard","orange"],["_Expert_SoloStandard","red"],["_ExpertPlus_SoloStandard","purple"]]),h=q(()=>{var m;return a.item.ranked?`${a.item.stars}\u2605`:(m=d.get(a.item.difficultyRaw))!=null?m:"O"}),k=q(()=>{var m;return(m=f.get(a.item.difficultyRaw))!=null?m:"yellow"});async function _(){if(!(n.value&&l.value))return L.getSongInfo(a.item.songHash).then(m=>{var g;n.value=m==null?void 0:m.id,l.value=(g=m==null?void 0:m.uploader)==null?void 0:g.id}).catch(m=>{O.error("BeatSaver\u8C31\u9762\u4FE1\u606F\u83B7\u53D6\u5931\u8D25")})}async function B(){await _(),n.value&&window.open(`https://beatsaver.com/maps/${n.value}`,"_blank")}async function R(){await _(),l.value&&window.open(`https://beatsaver.com/profile/${l.value}`,"_blank")}async function F(){if(await _(),n.value){const m=`!bsr ${n.value}`;try{await c(m),O.success("\u590D\u5236\u6210\u529F: "+m)}catch{O.error("\u590D\u5236\u5931\u8D25")}}}async function M(){await _(),n.value&&window.open(`beatsaver://${n.value}`,"_blank")}function w(){window.open(`https://na.cdn.beatsaver.com/${a.item.songHash.toLowerCase()}.zip`,"_blank")}return(m,g)=>{const r=u("a-image"),v=u("a-col"),y=u("a-button"),S=u("a-row"),P=u("a-tooltip"),Z=u("a-space"),J=u("a-card"),V=u("a-badge-ribbon");return b(),j("div",va,[t(V,{text:s(h),color:s(k),placement:"start"},{default:o(()=>[t(J,{bodyStyle:{padding:"10px"}},{default:o(()=>[t(S,{justify:"space-between",align:"middle",wrap:""},{default:o(()=>[t(v,{span:16},{default:o(()=>[t(S,{justify:"start",wrap:""},{default:o(()=>[t(v,null,{default:o(()=>[t(r,{width:64,src:e.item.coverImage,placeholder:"",fallback:"data:image/png;base64,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"},null,8,["src"])]),_:1}),t(v,null,{default:o(()=>[t(S,{justify:"start"},{default:o(()=>[t(y,{type:"link",onClick:B},{default:o(()=>[C("span",ya,Q(e.item.songName)+" "+Q(e.item.songSubName)+" - "+Q(e.item.songAuthorName),1)]),_:1})]),_:1}),t(S,{justify:"start"},{default:o(()=>[t(y,{class:"info-text",type:"text",onClick:R},{default:o(()=>[E(Q(e.item.levelAuthorName),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(v,{span:8},{default:o(()=>[t(S,{justify:"end"},{default:o(()=>[t(Z,null,{default:o(()=>[C("span",ba,Q(e.item.timeSet.format("YYYY.MM.DD")),1),e.item.acc!=-1/0?(b(),I(y,{key:0,type:"primary",ghost:"",shape:"round"},{default:o(()=>[C("span",ha,Q(e.item.acc.toFixed(2))+"%",1),e.item.competitorAcc!=null&&s(i)!=0?(b(),j("span",{key:0,class:de(`num-difference ${s(i)>0?"acc-higher":"acc-lower"}`)},"\xA0"+Q(`${s(i)>0?"+":""}${s(i).toFixed(2)}%`),3)):T("",!0)]),_:1})):T("",!0),e.item.ranked?(b(),I(y,{key:1,type:"primary",ghost:"",shape:"round"},{default:o(()=>[C("span",ka,Q(e.item.pp.toFixed(2))+"pp",1),e.item.competitorPP!=null&&s(A)!=0?(b(),j("span",{key:0,class:de(`num-difference ${s(A)>0?"acc-higher":"acc-lower"}`)},"\xA0"+Q(`${s(A)>0?"+":""}${s(A).toFixed(2)}`),3)):T("",!0),C("span",Sa,"\xA0/ "+Q(e.item.ppWeighted.toFixed(2))+"pp",1)]),_:1})):T("",!0),t(P,{placement:"bottom"},{title:o(()=>[Ea]),default:o(()=>[t(y,{type:"primary",shape:"circle",onClick:F},{icon:o(()=>[t(s(Ee))]),_:1})]),_:1}),t(P,{placement:"bottom"},{title:o(()=>[Ca]),default:o(()=>[t(y,{type:"primary",shape:"circle",onClick:M},{icon:o(()=>[t(s(Ce))]),_:1})]),_:1}),t(P,{placement:"bottom"},{title:o(()=>[Qa]),default:o(()=>[t(y,{type:"primary",shape:"circle",onClick:w},{icon:o(()=>[t(s(pe))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["text","color"])])}}};var wa=Y(Ia,[["__scopeId","data-v-3deb779c"]]);const xa=E(" \u6309 "),Ba=E("\u6392\u5E8F "),Pa={props:{loading:Boolean},emits:["change"],setup(e,{emit:a}){const c=e,n=N({type:"pp",order:"DESC"});Qe(()=>c.loading,(d,f)=>{d&&(n.type="pp",n.order="DESC")});const l=N([{value:"pp",label:"PP"},{value:"timeSet",label:"\u65E5\u671F"},{value:"stars",label:"\u661F\u7EA7"},{value:"acc",label:"ACC"}]),i=N([{value:"DESC",label:"\u4ECE\u5927\u5230\u5C0F"},{value:"ASC",label:"\u4ECE\u5C0F\u5230\u5927"}]);function A(){a("change",n)}return(d,f)=>{const h=u("a-select"),k=u("a-space");return b(),I(k,null,{default:o(()=>[xa,t(h,{ref:"select",size:"small",value:s(n).type,"onUpdate:value":f[0]||(f[0]=_=>s(n).type=_),style:{width:"120px"},options:s(l),onChange:A},null,8,["value","options"]),t(h,{ref:"select",size:"small",value:s(n).order,"onUpdate:value":f[1]||(f[1]=_=>s(n).order=_),style:{width:"120px"},options:s(i),onChange:A},null,8,["value","options"]),Ba]),_:1})}}};const Na=E(" \u4E0B\u8F7D\u6B4C\u5355 "),Ua=E("\u53D6\u6D88"),Ma=E("\u786E\u5B9A"),Ja={props:{data:Object,loading:Boolean},emits:["download"],setup(e,{emit:a}){const c=e,n=U(!1),l=U("ScoreSaberPlaylist"),i={pageSize:8,showTotal:(k,_)=>`\u5171 ${k} \u6761\u6570\u636E [ ${_[0]} - ${_[1]} ]`,showQuickJumper:!0};function A(){a("download",l.value),f()}function d(){n.value=!0}function f(){n.value=!1}function h(k){H.sort(c.data,k)}return(k,_)=>{const B=u("a-button"),R=u("a-space"),F=u("a-card"),M=u("a-spin"),w=u("a-list"),x=u("a-input"),D=u("a-modal");return b(),j(X,null,[t(w,{"data-source":e.data,pagination:i,class:"data-list"},{header:o(()=>[t(M,{spinning:e.loading,size:"large"},{default:o(()=>{var m;return[e.loading||((m=e.data)==null?void 0:m.length)?(b(),I(F,{key:0,hoverable:""},{default:o(()=>[t(R,{size:"large"},{default:o(()=>[t(Pa,{loading:e.loading,onChange:h},null,8,["loading"]),t(B,{type:"primary",shape:"round",size:"large",loading:e.loading,onClick:d},{icon:o(()=>[t(s(pe))]),default:o(()=>[Na]),_:1},8,["loading"])]),_:1})]),_:1})):T("",!0)]}),_:1},8,["spinning"])]),renderItem:o(({item:m})=>[(b(),I(wa,{item:m,key:m.id},null,8,["item"]))]),_:1},8,["data-source"]),t(D,{visible:n.value,"onUpdate:visible":_[1]||(_[1]=m=>n.value=m),title:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},{footer:o(()=>[t(B,{key:"back",onClick:f},{default:o(()=>[Ua]),_:1}),t(B,{key:"submit",type:"primary",loading:e.loading,onClick:A},{default:o(()=>[Ma]),_:1},8,["loading"])]),default:o(()=>[t(x,{value:l.value,"onUpdate:value":_[0]||(_[0]=m=>l.value=m),placeholder:"\u8BF7\u8F93\u5165\u6B4C\u5355\u6807\u9898"},null,8,["value"])]),_:1},8,["visible"])],64)}}};var za=Y(Ja,[["__scopeId","data-v-49a69700"]]);const Ra={setup(e){const a=Ie(7),c=[];let n=null;const l=new Map,i=N({}),A=N([]),d=U(0),f=U(!1),h=Ae(),k=h.currentRoute.value.params.id;k&&_(k);function _(g){L.getPlayerInfo(g).then(r=>{i.id=r.id,i.name=r.name,i.avatar=r.profilePicture,i.pp=r.pp,i.rank=r.rank,d.value=Math.ceil(r.scoreStats.totalPlayCount/ee.pageSize);const v=z.getMap(z.keys.players);v.set(r.id,{id:r.id,name:r.name,avatar:r.profilePicture}),z.setMap(z.keys.players,v)}).catch(r=>{console.error(r),O.error("\u73A9\u5BB6\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),h.push("/")})}async function B(g){if(f.value)return;if(!(i!=null&&i.id)){O.error("\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u5931\u8D25"),h.push("/");return}f.value=!0,A.length=0,console.time("\u603B\u8017\u65F6"),console.time("\u67E5\u8BE2\u73A9\u5BB6\u8BB0\u5F55\u8017\u65F6"),await F(),console.timeEnd("\u67E5\u8BE2\u73A9\u5BB6\u8BB0\u5F55\u8017\u65F6"),console.time("\u67E5\u8BE2\u6BD4\u8F83\u5BF9\u8C61\u8BB0\u5F55\u8017\u65F6"),await R(g),console.timeEnd("\u67E5\u8BE2\u6BD4\u8F83\u5BF9\u8C61\u8BB0\u5F55\u8017\u65F6"),console.time("\u5904\u7406\u6570\u636E\u8017\u65F6"),await x(g),console.timeEnd("\u5904\u7406\u6570\u636E\u8017\u65F6"),console.timeEnd("\u603B\u8017\u65F6"),console.log("------------------------------");const r={type:"pp",order:"DESC"};H.sort(A,r),f.value=!1}async function R(g){const r=g.competitor.id;if(!g.competitor.enable||!r||r===n||(l.clear(),r===k))return;n=r;const v=Math.ceil(g.competitor.totalPlayCount/ee.pageSize);await M(r,v,S=>{const P=S.leaderboard.id,Z=S.score.baseScore,J=S.score.pp;l.set(P,{baseScore:Z,pp:J})})}async function F(){if(c!=null&&c.length)return;const g=r=>{const v=H.playerScoreToItem(r);c.push(v)};await M(i==null?void 0:i.id,d.value,g)}async function M(g,r,v){const y=[];for(let S=1;S<=r;S++){const P=w(g,S,v);y.push(P)}await Promise.all(y)}async function w(g,r,v){try{const y=await L.getScores(g,r);for(const S of y)v(S)}catch(y){console.error(y),O.error("ScoreSaber\u8BB0\u5F55\u67E5\u8BE2\u5F02\u5E38")}}async function x(g){const r=[];for(const v of c){const y=a(()=>D(v,g));r.push(y)}await Promise.all(r)}async function D(g,r){await We.dataFilter(g,r,l)&&A.push(g)}async function m(g){await H.downloadPlaylist(A,g)}return(g,r)=>{var P;const v=u("a-col"),y=u("a-row"),S=u("a-spin");return b(),I(S,{spinning:((P=s(i))==null?void 0:P.id)===void 0,size:"large"},{default:o(()=>[t(y,{justify:"space-between",align:"top",class:"main-layout"},{default:o(()=>[t(v,{span:7,class:"main-layout-slider"},{default:o(()=>[t(ta,{"player-info":s(i)},null,8,["player-info"]),t(_a,{onSubmit:B,loading:f.value},null,8,["loading"])]),_:1}),t(v,{span:17},{default:o(()=>[t(za,{data:s(A),loading:f.value,onDownload:m},null,8,["data","loading"])]),_:1})]),_:1})]),_:1},8,["spinning"])}}};var Fa=Y(Ra,[["__scopeId","data-v-5225e7b8"]]);const Da=e=>(ne("data-v-217905c8"),e=e(),le(),e),Ka={class:"login-layout"},Ta={class:"login-content"},ja=Da(()=>C("h1",null,"Score Saber Playlist",-1)),Oa={setup(e){const a=U(),c=U(!1),n=Ae(),l=z.getMap(z.keys.players);function i(){!a.value||(c.value=!0,a.value=H.matchPlayerId(a.value),L.getPlayerInfo(a.value).then(f=>{c.value=!1,A(a.value)}).catch(f=>{console.error(f),c.value=!1,O.error("\u67E5\u8BE2\u7528\u6237\u4FE1\u606F\u5931\u8D25")}))}function A(f){n.push(`/u/${f}`)}const d={"font-weight":"bolder","font-size":"22px","background-color":"#b9d7ea"};return(f,h)=>{const k=u("a-image"),_=u("a-avatar"),B=u("a-tooltip"),R=u("a-avatar-group"),F=u("a-input-search"),M=u("a-card");return b(),j("div",Ka,[t(M,null,{default:o(()=>[C("div",Ta,[t(k,{width:128,preview:!1,src:"https://scoresaber.com/images/logo.svg"}),C("div",null,[ja,C("h3",null,"Version "+Q(s(ee).version),1)]),s(l).size>0?(b(),I(R,{key:0,size:64,maxCount:5,"max-style":d},{default:o(()=>[(b(!0),j(X,null,ue(s(l).values(),w=>(b(),I(B,{key:w.id,placement:"top",title:w.name},{default:o(()=>[t(_,{src:w.avatar,onClick:x=>A(w.id),class:"cursor-pointer"},null,8,["src","onClick"])]),_:2},1032,["title"]))),128))]),_:1})):T("",!0),t(F,{value:a.value,"onUpdate:value":h[0]||(h[0]=w=>a.value=w),placeholder:"\u8BF7\u8F93\u5165Score Saber\u8D26\u53F7\u6216Score Saber\u4E3B\u9875\u7F51\u5740","enter-button":"\u786E\u5B9A",size:"large","allow-clear":"",loading:c.value,onSearch:i},{prefix:o(()=>[t(s(te))]),_:1},8,["value","loading"])])]),_:1})])}}};var La=Y(Oa,[["__scopeId","data-v-217905c8"]]);const Ha=[{path:"/",component:La},{path:"/u/:id",component:Fa}],Ya=we({history:xe(),routes:Ha});const ce=Be(Je);ce.use(Ya);ce.use(Pe);ce.mount("#app");
