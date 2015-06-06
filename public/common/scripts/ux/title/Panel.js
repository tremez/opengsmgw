Ext.define('Ext.ux.title.Panel', {
	extend: 'Ext.panel.Panel',

	requires: [
	],
	layout:'hbox',
	border:0,

	defaults:{
		margin:'2 2 2 2'

	},
	items:[
		{
			xtype:'image',
			src:'../common/assets/images/logo.png',
			height:30,
			width:30,
			margin:'2 2 2 10'
		},
		{
			xtype:'button',
			text:'Dashboard',
			height:30,

			handler:function(){
				document.location.href='../Dashboard/'
			}
		},
		{
			xtype:'button',
			text:'GSM Ports',
			height:30,

			handler:function(){
				document.location.href='../GsmPorts/'
			}
		},
		{
			xtype:'button',
			text:'Statistics',
			height:30,

			handler:function(){
				document.location.href='../GsmPorts/'
			}
		},


	],
	listeners:{
		header:{
			'click':function(){
				document.location.href='../Dashboard/index.html';
			}
		}
	},
	initComponent: function () {
		this.callParent(arguments);



	},
	fbHandler:function(){


	}
});