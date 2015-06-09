Ext.define('Ext.ux.PowerManagement.ActionPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.actionpanel',

	requires: [
		'Common.model.GsmPort',
		'Ext.ux.Helper.SocketIO'
	],
	config: {
		model:null
	},
	layout:'anchor',
	defaults:{
		anchor:'100%',
		layout:'anchor'
	},
	items:[
		{
			xtype:'container',
			layout:{
				type:'hbox',
				align: 'stretch'
			},
			items:[
				{
					xtype:'textfield',
					emptyText:'Action',
					itemId:'actionText',

					flex:1
				},
				{
					xtype:'button',
					text:'send',
					itemId:'actionButton'
				}
			]
		},
		{
			xtype:'textarea',
			itemId:'actionResult',
			height:400

		}



	],
	bodyPadding:5,

	initComponent: function () {
		this.callParent(arguments);
		this.queryById('actionButton').on('click',this.onActionButtonClick,this);
	},
	onActionButtonClick:function(){
		var action=this.queryById('actionText').getValue();
		var currentResult=this.queryById('actionResult').getValue();
		currentResult+='Request: '+action + ' / ' +this.getModel().get('label')  +'\n';
		this.queryById('actionResult').setValue(currentResult);
		this.setLoading(true);
		this.getModel().sendRequest(action);

	}




});