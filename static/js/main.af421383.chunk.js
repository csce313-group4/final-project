(this.webpackJsonpplaylist_rec=this.webpackJsonpplaylist_rec||[]).push([[0],{41:function(e,t,a){e.exports=a(81)},46:function(e,t,a){},47:function(e,t,a){},74:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(11),s=a.n(o),r=(a(46),a(25)),l=a(26),c=a(38),u=a(27),m=a(8),d=a(39),g=(a(47),a(48),a(28)),h=a.n(g),f=(a(49),a(29)),p=a(32),y=a.n(p),v=a(34),P=a.n(v),k=(a(74),function(e){var t=e.dataUri,a=e.isFullscreen?"demo-image-preview-fullscreen":"";return i.a.createElement("div",{className:"demo-image-preview "+a},i.a.createElement("img",{src:t}))}),b=a(40),E=a(37),j=function(e){function t(e,a){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e,a))).state={dataUri:null,loading:!1,emotions:n.props.emotions,age:20,loadSong:!1,playlistId:""},n.onSelectImage=n.onSelectImage.bind(Object(m.a)(n)),n.onTakePhotoAnimationDone=n.onTakePhotoAnimationDone.bind(Object(m.a)(n)),n.getAge=n.getAge(Object(m.a)(n)),n.getEmotions=n.getEmotions(Object(m.a)(n)),n.getRecs=n.getRecs(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"onTakePhotoAnimationDone",value:function(e){this.setState({dataUri:e,loading:!0}),this.getAge(),this.getEmotions(),this.getRecs()}},{key:"onSelectImage",value:function(){this.setState({loadSong:!0})}},{key:"getAge",value:function(){var e=this.state.age;this.setState({age:e})}},{key:"getEmotions",value:function(){var e=this.state.emotions;this.setState({emotions:e})}},{key:"getMusicYearFromAge",value:function(e){var t=(new Date).getFullYear()-e+10,a=t%10,n=t-a;return a>=5&&(n+=10),n<1950?n=1950:n>2010&&(n=2010),n}},{key:"isThisEmotionHappy",value:function(e){var t=0,a=0;return e.forEach((function(e,n){0===e.label.localeCompare("happy")?t=e.confidence:0===e.label.localeCompare("sad")&&(a=e.confidence)})),!(a>t)}},{key:"getPlaylistFromParams",value:function(e,t){switch(e){case 1950:return t?"PLNDhBcjuPp0-UCSML4DxFqqc5WN4aGcW1":"PLjLPKGJvC8TuhpLXMhskQUaC26zSBjCsM";case 1960:return t?"PLPKXtd2AJvNkaZgrb0yK3UoQk7487TceH":"PLAZH8pP5KBzXiSfcH_2GgoDeXjtTUF3sM";case 1970:return t?"PL9QL1AvNabH5u2gfi48VogStrPUY_LijY":"PLjyiHjKMhSuK-rChCn2Xl4RNfUcUhx-qA";case 1980:return t?"PL857_Yj5tf8cek2iOFyZBE9XSOLOhW-0m":"PLT_7RtTUm0XwsUHTCuQog7xknmMCuvr4B";case 1990:return t?"PLLWfa8Ng-FdBamt3JCTadmbdd9UtLFZ7K":"PLu1jpc624xfKGhWItKFNRPu7QylkwS-OR";case 2e3:return t?"PLPf_PZG3-WAGq4tgjU6m87Ksndn2Jz2OF":"PLIWqGUaiQxN7kL47fzQ87h0OlTaCyr8-o";case 2010:return t?"PLeZgwVkN7bbfVLcqnz9l5RjASqUkBtpBe":"PL5D7fjEEs5yflZzSZAhxfgQmN6C_6UJ1W";default:return"Invalid year! No playlist id generated"}}},{key:"getRecs",value:function(){var e=this.state.age,t=this.state.emotions,a=this.state.playlistId,n=this.getMusicYearFromAge(e),i=this.isThisEmotionHappy(t);a=this.getPlaylistFromParams(n,i),this.setState({playlistId:a})}},{key:"render",value:function(){return this.state.loading?i.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}},i.a.createElement(y.a,{sizeUnit:"px",size:100,color:"#36d7b7",loading:this.state.loading})):this.state.loadSong?i.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}},i.a.createElement(f.a,{videoId:"dQw4w9WgXcQ",opts:{height:"390",width:"640",playerVars:{autoplay:1}}})):i.a.createElement("div",{className:"App"},this.state.loading?i.a.createElement(P.a,{active:!0,spinner:!0},i.a.createElement("p",null,i.a.createElement(k,{isFullscreen:!0,dataUri:this.state.dataUri})," ")):i.a.createElement(h.a,{onTakePhotoAnimationDone:this.onTakePhotoAnimationDone}),i.a.createElement("div",null,i.a.createElement(E.a,{bg:"dark",variant:"dark",sticky:"top"},i.a.createElement(b.a,{variant:"primary",onClick:this.onSelectImage},"Get Recommendation"))))}}]),t}(i.a.Component);j.defaultProps={emotions:[{confidence:.9386989,label:"Happy"},{confidence:.0483937,label:"Neutral"},{confidence:.0120008,label:"Disgust"},{confidence:406e-6,label:"Sad"},{confidence:3461e-7,label:"Fear"},{confidence:15e-5,label:"Angry"},{confidence:46e-7,label:"Surprise"}]};var L=j;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.af421383.chunk.js.map