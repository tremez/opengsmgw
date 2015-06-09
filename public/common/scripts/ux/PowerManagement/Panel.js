Ext.define('Ext.ux.PowerManagement.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.powermanagementpanel',

	requires: [
		'Common.store.Relay',
		'Ext.ux.PowerManagement.Grid',
	],
	config: {
		store:null,
		pmGrid:null,
	},
	layout: {
		type: 'border'
	},
	bodyPadding:5,

	initComponent: function () {
		this.getStore()||this.setStore(Ext.create('Common.store.Relay',
			{
				autoLoad: true,
				remoteSort:false
			}));

		this.setPmGrid(Ext.create('Ext.ux.PowerManagement.Grid',{
			store:this.getStore(),
			flex:1,
			region:'center',
			collapsible:true,
			split:true
		}));




		this.items=[
			this.getPmGrid(),


		]


		this.callParent(arguments);


	},




})
;