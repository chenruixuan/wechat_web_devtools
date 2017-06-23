"use strict";function init(){var e=require("../../lib/react.js"),t=require("../../stores/webviewStores.js"),i=require("../../stores/windowStores.js"),s=(require("../../actions/leftviewActions.js"),require("../../stores/projectStores.js")),n=require("../../common/log/log.js"),r=require("../../config/config.js"),o=(require("../../utils/newReport.js"),require("../../actions/webviewActions.js")),a=(require("querystring"),require("../../weapp/utils/projectManager.js")),h=require("../../config/compileTypeConfig.js"),c=require("../../config/webviewIDConfig.js"),p=c.DP_WEBVIEW_ID,u=function(e){console.warn(e.message)},w=e.createClass({displayName:"WebviewBody",getInitialState:function(){return this.dpsMsgQueue=[],{webviewID:p}},reload:function(){this.webview.reload()},setUserAgentOverride:function(e){e=e||i.getUA(),e=e.replace("{{webviewID}}",this.state.webviewID),this.props.project&&(e=e+" widget weapp/"+this.id),this.webview.setUserAgentOverride(e)},initWidgetPage:function(){var e=this.refs.container,t=this.state.webviewID,i=this.webview=document.createElement("webview");i.className="simulator-bd-webview_body webviewbody"+t,i.setAttribute("partition","persist:trusted"),e.appendChild(i),this.setUserAgentOverride(),this.addContentScripts(i),this.initRuntime(),this.onErrorOccurred();try{var s=a.getAppConfigJSONSync(this.props.project);i.src="http://"+this.props.project.hash+".widget.open.weixin.qq.com/"+s.widget+"/widgetPage.html"}catch(e){}this._setWebviewInfo()},setWebviewSrc:function(e){this.webview.src=e},initEvent:function(){var e=this.webview;global.appConfig.isDev||e.contextMenus.onShow.addListener(function(e){e.preventDefault()})},onErrorOccurred:function(){var e=this.webview,t=e.request;t.onErrorOccurred.addListener(function(e){var t=e.type;"script"!==t&&"main_frame"!==t&&"net::ERR_ABORTED"!==e.error&&u({message:r.WEBVIEW_NETWORK_ERROR,details:e})},{urls:["<all_urls>"]})},addContentScripts:function(e){e.addContentScripts([{name:"contentscript",matches:["<all_urls>"],js:{files:["app/dist/contentscript/contentScript.js"]},run_at:"document_start"}])},_initport:function(e){var i=this;e.name==="webview"+this.state.webviewID&&(this.port=e,this.portID=e.name,t.addWebviewPorts(this.portID,this.port),this.port.onMessage.addListener(this.onMessage),this.port.onDisconnect.addListener(function(){t.delWebviewPorts(i.portID),i.port.onMessage.removeListener(i.onMessage),delete i.port,delete i.portID,i.msgQuery=[]}),this.postMessage("contentscript",{},"SHAKE_HANDS"))},initRuntime:function(){chrome.runtime.onConnect.addListener(this._initport)},toAppService:function(e){e.eventName=e.eventName.replace("publish_",""),e.webviewID=this.state.webviewID,o.postMessageToAS(e)},onMessage:function(e){var t=e.command,i=(this.state.webviewID,e.msg);if(this.props.project){var s=e.weappID;if(s!==this.id){n.error("webviewbody.js get a message from a wrong webview"),chrome.runtime.onConnect.removeListener(this._initport),n.info("webviewbody.js this.componentWillUnmount begin");try{this.componentWillUnmount(),n.info("webviewbody.js this.componentWillUnmount end")}catch(e){this.webview.remove(),n.error("webviewbody.js trigger this.componentWillUnmount() error "+e.toString())}return}}switch(t){case"TO_APP_SERVICE":this.toAppService(i);break;case"WEBVIEW_READY":var r=this.props.project.widgetOptions||{},o={title:"",path:"",query:{},cacheKey:""};if(r.enable){var a=r.path||"",h=a.split("?"),c={};try{h=h[1].split("&"),h.forEach(function(e){var t=e.split("=");c[t[0]]=t[1]})}catch(e){c={}}o.title=r.title,o.path=a.split("?")[0],o.query=c,o.cacheKey=r.cacheKey}this.postMessageToAS({eventName:"onCanvasInsert",data:o})}},postMessage:function(e,t,i,s){var n=this,r={to:e,msg:t,command:i,ext:s};return r.webviewID=this.state.webviewID,r.id=this.id,this.port?(this.msgQuery.length&&(this.msgQuery.forEach(function(e){n.port.postMessage(e)}),this.msgQuery=[]),void this.port.postMessage(r)):void this.msgQuery.push(r)},_onCompileChange:function(e){"widget"===e&&this._didMount()},_didMount:function(){this.mounted||(this.mounted=!0,this.initWidgetPage(),this.initEvent())},_restart:function(e){e.compileType!=h.widget&&e.compileType!=h.search||this.webview&&this.webview.reload()},_onWidgetDrawCanvas:function(e){this.postMessage("webframe",{data:e},"WIDGET_DRAW_CANVAS")},_onDPServcieReady:function(){var e=this;this.dpsMsgQueue.length&&(this.dpsMsgQueue.forEach(function(t){e.postMessageToAS(t)}),this.dpsMsgQueue=[])},_setWebviewInfo:function(e){var t=this;setTimeout(function(){var e=t.props.project.compileType,s=i.getWidgetOffset(e),n="",r=s.width,o=s.height;e==h.search?(r-=36,o-=30,n="height:"+o+"px;width:"+r+"px;padding:12px 18px 18px 18px;"):e==h.widget&&(n="height:100%;width:100%"),t.postMessage("webframe",{data:{width:r,height:o,style:n}},"WIDGET_SET_CANVAS")},0)},postMessageToAS:function(e){return t.getAppServiceReadyState()?o.postMessageToAS(e):void this.dpsMsgQueue.push(e)},componentDidMount:function(){this.id=parseInt(1e5*Math.random()),this.msgQuery=[],s.on("ON_COMPILE_CHANGE",this._onCompileChange),s.on("RESTART_PROJECT",this._restart),t.on("WIDGET_DRAW_CANVAS",this._onWidgetDrawCanvas),t.on("APPSERVICE_INIT",this._onDPServcieReady),i.on("SET_WEBVIEW_INFO",this._setWebviewInfo),this._didMount()},componentWillUnmount:function(){s.removeListener("ON_COMPILE_CHANGE",this._onCompileChange),s.removeListener("RESTART_PROJECT",this._restart),t.removeListener("WIDGET_DRAW_CANVAS",this._onWidgetDrawCanvas),t.removeListener("APPSERVICE_INIT",this._onDPServcieReady),i.removeListener("SET_WEBVIEW_INFO",this._setWebviewInfo),chrome.runtime.onConnect.removeListener(this._initport),this.webview&&this.webview.remove()},render:function(){var t=this.props.offset;return e.createElement("div",{className:"simulator-bd-webview",style:{height:t.height,width:t.width},ref:"container"})}});_exports=w}var _exports;init(),module.exports=_exports;