Ext.define('Ext.ux.GsmPorts.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gsmportspanel',

	requires: [
		'Common.store.GsmPort',
		'Ext.ux.GsmPorts.Grid',
	],
	config: {
		store:null,
		gsmPortsGrid:null,
	},
	layout: {
		type: 'border'
	},
	bodyPadding:5,

	initComponent: function () {
		this.getStore()||this.setStore(Ext.create('Common.store.GsmPort',
			{
				autoLoad: true,
				remoteSort:false
			}));

		this.setGsmPortsGrid(Ext.create('Ext.ux.GsmPorts.Grid',{
			store:this.getStore(),
			flex:1,
			region:'center',
			collapsible:true,
			split:true
		}));




		this.items=[
			this.getGsmPortsGrid(),


		]


		this.callParent(arguments);


	},




})
;