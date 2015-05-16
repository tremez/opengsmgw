Ext.define('GsmPorts.view.Viewport', {

	extend: 'Ext.container.Viewport',

	requires: [
		'Ext.ux.title.Panel',
		'Common.store.GsmPort',
		'Ext.ux.GsmPorts.Panel'
	],

	layout: {
		type: 'border'
	},


	config: {
		titlePanel: null,
		centerContent:null,
	},
	initComponent: function () {
		var headerContainer;
		this.setTitlePanel(Ext.create('Ext.ux.title.Panel', {
			region: 'north',

		}));
		this.setCenterContent(Ext.create('Ext.ux.GsmPorts.Panel', {
			region: 'center',
			padding:'5 5 5 5'
		}));
		this.items = [
			this.getTitlePanel(),
			this.getCenterContent()

		];
		this.callParent(arguments);


	},





});
