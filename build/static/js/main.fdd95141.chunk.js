(this["webpackJsonpmusic-visualizer"]=this["webpackJsonpmusic-visualizer"]||[]).push([[0],{15:function(e,t,a){},18:function(e,t,a){e.exports=a(49)},38:function(e,t,a){},39:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n,o=a(0),r=a.n(o),s=a(11),l=a.n(s),c=a(2),i=a(3),u=a(5),m=a(4),d=a(16),p=a.n(d),h=(a(38),a(15),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"choice bg".concat(this.props.num," ").concat(this.props.active===this.props.num?"active":""),onClick:function(){return e.props.changeBackground(e.props.num)}})}}]),a}(r.a.Component)),f=(a(39),a(8)),b=a(6),v=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState({colorToggle:!n.state.colorToggle})},n.upload=function(){if(document.getElementById("file").files[0]){var e=document.getElementById("file").files[0].name;document.getElementById("file-name").innerHTML=e.replace(/\.[^/.]+$/,""),n.state.playing&&(n.setState({playing:!1}),n.props.stopSong(),setTimeout((function(){n.props.removeStop()}),200))}},n.confirm=function(){document.getElementById("file").files.length>=1||n.state.playing?(n.props.uploadSong(),n.props.toggleVisible(),n.setState({playing:!0}),n.props.enableShaking(document.getElementById("shakeSwitch").checked),n.props.enableColors(document.getElementById("colorSwitch").checked),n.props.enableLowerBars(document.getElementById("lowerBarSwitch").checked),n.props.enableRemoveBars(document.getElementById("removeBarsSwitch").checked),n.props.enableGradient(document.getElementById("gradientSwitch").checked),n.props.enableSecondary(document.getElementById("secondarySwitch").checked)):alert("No file uploaded")},n.state={controlPanelVisible:!1,playing:!1,colorToggle:!1},n}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t={infinite:!0,speed:1e3,slidesToShow:3,slidesToScroll:3},a=this.state.colorToggle?r.a.createElement("div",{class:"font-weight-bold mt-4"},"EPILEPSY WARNING: ENABLING COLOR CHANGE MAY CREATE FLASHING LIGHTS"):null;return r.a.createElement("div",{className:"control-panel "+(this.props.visible?"":"control-panel-hidden"),id:"panel"},r.a.createElement("div",{className:"control-panel-content"},r.a.createElement("input",{type:"file",name:"file",id:"file",accept:"audio/*",onChange:this.upload}),r.a.createElement("label",{className:"upload-button",for:"file"},r.a.createElement(f.a,{icon:b.c})," \xa0\xa0Upload song"),r.a.createElement("div",{id:"file-name",className:"file-name-text"},"No file chosen"),r.a.createElement("div",{className:"choose-background-text mt-3 mb-3 text-uppercase text-secondary"},"choose a background"),r.a.createElement("div",{className:"carousel mx-auto mb-4"},r.a.createElement(p.a,t,Array(9).fill(0).map((function(e,t){return t+1})).map((function(t){return r.a.createElement(h,{num:t,active:e.props.active,changeBackground:e.props.changeBackground})})))),r.a.createElement("div",{className:"settings-text my-3 text-uppercase text-secondary"},"settings"),r.a.createElement("div",{class:"row"},r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"colorSwitch",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",{class:"custom-control-label",for:"colorSwitch"},"Enable color change")),r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"shakeSwitch"}),r.a.createElement("label",{class:"custom-control-label",for:"shakeSwitch"},"Enable shake")),r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"gradientSwitch"}),r.a.createElement("label",{class:"custom-control-label",for:"gradientSwitch"},"Enable color gradient"))),r.a.createElement("div",{class:"row mt-3"},r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"removeBarsSwitch"}),r.a.createElement("label",{class:"custom-control-label",for:"removeBarsSwitch"},"Remove center bars")),r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"secondarySwitch"}),r.a.createElement("label",{class:"custom-control-label",for:"secondarySwitch"},"Different algorithm")),r.a.createElement("div",{class:"col custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",id:"lowerBarSwitch"}),r.a.createElement("label",{class:"custom-control-label",for:"lowerBarSwitch"},"Lower bars"))),a),r.a.createElement("div",{className:"control-panel-confirm"},r.a.createElement("div",{className:"confirm-button mt-2",onClick:this.confirm},this.state.playing?"Confirm":"Play")))}}]),a}(r.a.Component),g=a(17),E=(a(45),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).getColors=function(){if(!e.props.colorsEnabled&&!e.props.gradientEnabled)return"rgba(255, 255, 255, 0.3)";var t=e.props.i;if(!e.props.colorsEnabled&&e.props.gradientEnabled)return"rgba(".concat(255*t/17,", ").concat(t/7*10,", ").concat(255*(17-t)/17,", 0.8)");var a=40*Math.pow(e.props.totalVolume,5);return e.props.gradientEnabled?(a=e.props.totalVolume/1.45,"rgba(".concat(255*a*t/17,", ").concat(10*a*(t/7),", ").concat(255*a*(17-t)/17,", ").concat(a,")")):"rgba(".concat(.3*a+125,", ").concat(1.5*a+125,", ").concat(a+125,", 0.8)")},e.getHeight=function(){return e.props.removeCenter&&e.props.index>=12&&e.props.index<=19?"0%":e.props.height*(e.props.lowerBars?.65:1)+"%"},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"bar",style:{height:this.getHeight(),transition:"all ms ease",backgroundColor:this.getColors()}})}}]),a}(r.a.Component)),y=(a(46),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).positionHandle=function(e){if(null!=n.timeline&&null!=n.handle){var t=n.timeline.offsetWidth-n.handle.offsetWidth,a=e-n.timeline.offsetLeft;a>=0&&a<=t&&(n.handle.style.marginLeft=a+"px"),a<0&&(n.handle.style.marginLeft="0px"),a>t&&(n.handle.style.marginLeft=t+"px")}},n.mouseMove=function(e){null!=n.timeline&&null!=n.handle&&(n.positionHandle(e.pageX),n.props.audio.currentTime=(e.pageX-n.timeline.offsetLeft)/n.timeline.offsetWidth*n.props.audio.duration,n.props.audio.play(),n.setState({playing:!0}),window.addEventListener("mousemove",n.mouseMove),window.addEventListener("mouseup",n.mouseUp))},n.mouseUp=function(e){window.removeEventListener("mousemove",n.mouseMove),window.removeEventListener("mouseup",n.mouseUp)},n.mouseDown=function(e){window.addEventListener("mousemove",n.mouseMove),window.addEventListener("mouseup",n.mouseUp)},n.play=function(){n.state.playing?(n.setState({playing:!1}),n.props.audio.pause()):(n.setState({playing:!0}),n.props.audio.play())},n.state={playing:!0},n.lastTimeUpdate=0,n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.props.audio.addEventListener("timeupdate",(function(){if(!(Date.now()-e.lastTimeUpdate<300)&&null!=e.timeline){e.lasteTimeUpdate=Date.now();var t=e.props.audio.currentTime/e.props.audio.duration,a=e.timeline.offsetWidth*t+e.timeline.offsetLeft;e.positionHandle(a)}}))}},{key:"render",value:function(){var e=this,t=Math.round(this.props.audio.duration-this.props.audio.currentTime),a=t%60,n=(t-a)/60;return r.a.createElement("div",{className:"audio-player"},r.a.createElement("div",{className:"play-pause-btn",onClick:this.play},this.state.playing?r.a.createElement(f.a,{icon:b.a}):r.a.createElement(f.a,{icon:b.b})),r.a.createElement("div",{className:"timeline",onMouseUp:this.mouseUp,onMouseDown:this.mouseMove,ref:function(t){e.timeline=t}},r.a.createElement("div",{className:"line"}),r.a.createElement("div",{className:"handle",onMouseDown:this.mouseDown,ref:function(t){e.handle=t}})),r.a.createElement("div",{className:"timeline-time"},"-",n+":"+a.toString().padStart(2,0)))}}]),a}(r.a.Component)),w=(a(47),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var o;Object(c.a)(this,a),(o=t.call(this,e)).updateDA=function(){o.state.song.ended&&(o.props.songEnded(),window.clearInterval(n)),o.props.stop&&o.endSong();var e=0,t=o.state.analyser,a=o.state.dataArray;t.getByteFrequencyData(a);for(var r=1;r<=32;r++)e+=a[12*r];o.props.setShaking(a.subarray(4,8).reduce((function(e,t){return e+t}))/4>240),o.setState({analyser:t,dataArray:a,volume:e/3840,sumOfFreqs:e})};var r=document.getElementById("file").files[0],s=new Audio(URL.createObjectURL(r)),l=new AudioContext,i=l.createAnalyser(),u=l.createMediaElementSource(s);s.play(),u.connect(i),i.fftSize=2048,i.connect(l.destination);var m=new Uint8Array(i.frequencyBinCount);return o.state={analyser:i,dataArray:m,shake:!1,song:s,songfile:r,volume:0},o}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.state.song.ended||(n=setInterval(this.updateDA,25))}},{key:"endSong",value:function(){var e=this.state.song;e.currentTime=e.duration}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"visualizer"},r.a.createElement("div",{className:this.props.controlPanelVisible?"":"d-none"}," ",r.a.createElement(y,{audio:this.state.song})),r.a.createElement("div",{className:"bars"},r.a.createElement("div",{className:"hidden-bar"}),Object(g.a)(Array(33)).map((function(t,a){if(a=a>16?a-a%16*2:a+1,!e.props.secondary){var n=a;return r.a.createElement(E,{height:e.state.dataArray.subarray(Math.floor(a*a/2),Math.floor(a*a/2)+4).reduce((function(e,t){return e+t}))*Math.pow(e.state.volume,2.5)/19.2,colorsEnabled:e.props.colorsEnabled,totalVolume:e.state.volume,index:n,removeCenter:e.props.removeCenter,gradientEnabled:e.props.gradientEnabled,lowerBars:e.props.lowerBars,i:a})}var o;return a=17===a?16:a,o=[1,3,5,7,10,13,21,29,46,63,96,134,212,290,380,465,576,632,690],r.a.createElement(E,{height:(e.props.lowerBars?.65:1)*e.state.dataArray.subarray(o[a],o[a+1]).reduce((function(e,t){return e+t}))/(2.75*(o[a+1]-o[a])),colorsEnabled:e.props.colorsEnabled,totalVolume:e.state.volume/2+e.state.sumOfFreqs/16320,index:a})})))))}}]),a}(r.a.Component)),S=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).changeBackground=function(e){n.setState({active:e})},n.uploadSong=function(){n.setState({uploaded:!0})},n.enableShaking=function(e){n.setState({shakeEnabled:e})},n.songEnded=function(){n.setState({controlPanelVisible:!0,uploaded:!1})},n.enableColors=function(e){n.setState({colors:e})},n.enableLowerBars=function(e){n.setState({lowerBars:e})},n.enableRemoveBars=function(e){n.setState({removeBars:e})},n.enableGradient=function(e){n.setState({gradient:e})},n.enableSecondary=function(e){n.setState({secondary:e})},n.stopSong=function(){n.setState({stop:!0})},n.removeStop=function(){n.setState({stop:!1})},n.state={active:1,uploaded:!1,isShaking:!1,controlPanelVisible:!0,shakeEnabled:!1,colors:!1,lowerBars:!1,removeBars:!1,gradient:!1,stop:!1,secondary:!1},n}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container-fluid bg".concat(this.state.active)+(this.state.isShaking&&this.state.shakeEnabled?" shake":"")},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-6 mt-2"},r.a.createElement(v,{visible:this.state.controlPanelVisible,toggleVisible:function(){return e.setState({controlPanelVisible:!e.state.controlPanelVisible})},changeBackground:this.changeBackground,active:this.state.active,uploadSong:this.uploadSong,enableShaking:this.enableShaking,enableColors:this.enableColors,enableLowerBars:this.enableLowerBars,enableRemoveBars:this.enableRemoveBars,enableGradient:this.enableGradient,stopSong:this.stopSong,removeStop:this.removeStop,enableSecondary:this.enableSecondary}))),r.a.createElement("div",{className:"row"},this.state.uploaded?r.a.createElement(w,{controlPanelVisible:this.state.controlPanelVisible,setShaking:function(t){return e.setState({isShaking:t})},songEnded:this.songEnded,colorsEnabled:this.state.colors,lowerBars:this.state.lowerBars,removeCenter:this.state.removeBars,gradientEnabled:this.state.gradient,stop:this.state.stop,secondary:this.state.secondary}):""),r.a.createElement("div",{className:"show-control-panel-button",style:{display:this.state.controlPanelVisible?"none":"block"},onClick:function(){return e.setState({controlPanelVisible:!e.state.controlPanelVisible})}}))}}]),a}(r.a.Component),k=(a(48),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,null))}}]),a}(r.a.Component));l.a.render(r.a.createElement(r.a.Fragment,null,r.a.createElement(k,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.fdd95141.chunk.js.map