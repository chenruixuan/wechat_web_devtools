'use strict';!function(require,directRequire){const a=require('react'),{DEV_TYPE:b,SIZE:c}=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),d=require('./1c48b306885608960cb81098864d8bb0.js'),e=require('./bc04f89cf8edab62335086e0a2a5a103.js'),f=require('./84b183688a46c9e2626d3e6f83365e13.js'),g='darwin'===process.platform?'darwin':'win';module.exports=class extends a.Component{constructor(a){super(a),this.handleMaskClick=()=>{this.setState({accountDDOpen:!1,showMask:!1})},this.state={showMask:!1},this.setupController()}componentDidMount(){this.resize()}setupController(){this.accountDDControl={},this.accountDDControl.items=['\u9000\u51FA\u5E10\u6237'],this.accountDDControl.toggle=()=>{if(!this.state.accountDDOpen){const a=this.accountDDIcon.getBoundingClientRect();this.accountDDControl.left=a.left+20+'px',this.accountDDControl.top=a.top-20+'px',this.setState({accountDDOpen:!0,showMask:!0})}else this.setState({accountDDOpen:!1,showMask:!1})},this.accountDDControl.onItemSelected=(a)=>{0===a&&this.logout()}}resize(){try{let a=this.props.win?this.props.win:global.Win;a.show(),a.setResizable(!0),a.resizeTo(c.LOGIN.WIDTH,c.LOGIN.HEIGHT),a.setResizable(!1)}catch(a){}}logout(){this.props.logout()}handleQuitClick(){f.quit()}render(){const c={WebkitAppRegion:'no-drag'};return a.createElement('div',{className:'container',style:{WebkitAppRegion:'drag'}},this.state.showMask?a.createElement('div',{className:'ui-mask ui-mask-transparent',onClick:this.handleMaskClick}):null,a.createElement('div',null,a.createElement('div',null,a.createElement(d,null),a.createElement('div',{className:'welcome'},a.createElement('div',{className:'welcome-hd'},a.createElement('h2',null,'\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177'),a.createElement('p',null,'v',global.appVersion)),a.createElement('div',{className:'welcome-bd'},a.createElement('div',{className:'ui-flex'},a.createElement('div',{style:c,className:'welcome-card',onClick:()=>this.props.onDevTypeSelected(b.MINI_PROGRAM)},a.createElement('div',{className:'welcome-card-bd'},a.createElement('i',{className:'ui-icon-mini-app'})),a.createElement('div',{className:'welcome-card-ft'},a.createElement('h3',null,'\u5C0F\u7A0B\u5E8F\u9879\u76EE'),a.createElement('p',null,'\u7F16\u8F91\u3001\u8C03\u8BD5\u5C0F\u7A0B\u5E8F'))),a.createElement('div',{style:c,className:'welcome-card',onClick:()=>this.props.onDevTypeSelected(b.MP_WEB)},a.createElement('div',{className:'welcome-card-bd'},a.createElement('i',{className:'ui-icon-user'})),a.createElement('div',{className:'welcome-card-ft'},a.createElement('h3',null,'\u516C\u4F17\u53F7\u7F51\u9875\u9879\u76EE'),a.createElement('p',null,'\u8C03\u8BD5\u516C\u4F17\u53F7\u7F51\u9875'))))),a.createElement('div',{className:'welcome-ft'},a.createElement('div',{className:'luncher-account'},a.createElement('div',{className:'luncher-account-avatar'},a.createElement('img',{src:this.props.user?this.props.user.headUrl:'',alt:''})),a.createElement('div',{style:c,className:'luncher-account-name',onClick:this.accountDDControl.toggle},a.createElement('p',null,this.props.user?this.props.user.nickName:''),a.createElement('i',{className:'ui-icon-arrow-down',ref:(a)=>this.accountDDIcon=a}),a.createElement(e,{width:'90px',height:'38px',open:this.state.accountDDOpen,left:this.accountDDControl.left,top:this.accountDDControl.top,items:this.accountDDControl.items,onItemSelected:this.accountDDControl.onItemSelected}))))))))}}}(require('lazyload'),require);