Ext.define('Ext.ux.PowerManagement.ActionPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.actionpanel',

	requires: [
		'Common.model.GsmPort',
		'Ext.ux.Helper.SocketIO',

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
					xtype:'combo',
					emptyText:'Action',
					itemId:'actionText',
					flex:1,
					store:['ON','OFF','STATUS']
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
			disabled:true

		}



	],
	bodyPadding:5,

	initComponent: function () {
		this.callParent(arguments);
		this.queryById('actionButton').on('click',this.onActionButtonClick,this);


		Ext.ux.Helper.SocketIO.getSocket().on('relay:response', function (data) {
			console.log('aaa',data)
			var currentResult=this.queryById('actionResult').getValue();
			currentResult+='Response: '+data+'\n';
			this.queryById('actionResult').setValue(currentResult);
			this.setLoading(false);
		}.bind(this));
	},
	onActionButtonClick:function(){
		var action=this.queryById('actionText').getValue();
		if(!action){
			return;
		}
		//var currentResult=this.queryById('actionResult').getValue();
		var currentResult='Request: '+action + ' / ' +this.getModel().get('label')  +'\n';
		this.queryById('actionResult').setValue(currentResult);
		this.setLoading(true);
		this.getModel().sendRequest(action);


	}




});