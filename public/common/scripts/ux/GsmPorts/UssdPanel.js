Ext.define('Ext.ux.GsmPorts.UssdPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ussdpanel',

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
					emptyText:'USSD Message',
					itemId:'sendUssdText',

					flex:1
				},
				{
					xtype:'button',
					text:'send',
					itemId:'sendUssdButton'
				}
			]
		},
		{
			xtype:'textarea',
			itemId:'sendUssdResult',
			height:400

		}



	],
	bodyPadding:5,

	initComponent: function () {
		this.callParent(arguments);
		this.queryById('sendUssdButton').on('click',this.onSendUssdButtonClick,this);
		console.log(this.getModel());

		Ext.ux.Helper.SocketIO.getSocket().on('ussd:received', function (ussdInfo) {
			var device=ussdInfo.device;
			if(device===this.getModel().get('device')){
				var currentResult=this.queryById('sendUssdResult').getValue();
				currentResult+='Response: '+ussdInfo.message+'\n';
				this.queryById('sendUssdResult').setValue(currentResult);
				this.setLoading(false);
			}
		}.bind(this));

	},
	onSendUssdButtonClick:function(){
		var ussdText=this.queryById('sendUssdText').getValue();
		var currentResult=this.queryById('sendUssdResult').getValue();
		currentResult+='Request: '+ussdText+'\n';
		this.queryById('sendUssdResult').setValue(currentResult);

		this.setLoading(true);
		this.getModel().sendUssd(ussdText);

	}




});