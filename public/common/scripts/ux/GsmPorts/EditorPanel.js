Ext.define('Ext.ux.GsmPorts.EditorPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gsmporteditorpanel',

	requires: [
		'Common.model.GsmPort',
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
			xtype:'tabpanel',
			border:false,
			defaults:{
				anchor:'100%',
				layout:'anchor',
				border:false
			},
			items:[
				{
					xtype:'panel',
					title:'GSM',
					defaults:{
						anchor:'100%',
						layout:'anchor',
						labelWidth:150
					},
					items:[
						{
							xtype:'textfield',
							fieldLabel:'Name',
							dataField:'device'

						},
						{
							xtype:'textfield',
							fieldLabel:'IMEI',
							dataField:'imei'
						},
						{
							xtype:'textfield',
							fieldLabel:'IMSI',
							dataField:'imsi',
						},

						{
							xtype:'checkbox',
							fieldLabel:'Hide CID',
							value:'yes',
							dataField:'callingpres'
						},
						{
							xtype:'slider',
							fieldLabel:'RxGain',
							minValue:-5,
							maxValue:5,
							value:0,
							dataField:'rxgain'
						},
						{
							xtype:'slider',
							fieldLabel:'TxGain',
							minValue:-5,
							maxValue:5,
							value:-5,
							dataField:'txgain'
						},
						{
							xtype:'slider',
							fieldLabel:'Min DTMF Gap',
							value:45,
							minValue:0,
							maxValue:100,
							dataField:'mindtmfgap'
						},
						{
							xtype:'slider',
							fieldLabel:'Min DTMF Duration',
							minValue:0,
							maxValue:200,
							value:80,
							dataField:'mindtmfduration'
						},
						{
							xtype:'slider',
							fieldLabel:'Min DTMF Interval',
							minValue:0,
							maxValue:200,
							value:80,
							dataField:'mindtmfinterval'
						},



					]
				},
				{
					xtype:'panel',
					title:'SIP',
					defaults:{
						anchor:'100%',
						layout:'anchor'
					},
					items:[
						{
							xtype:'textfield',
							fieldLabel:'Username',
							dataField:'username'
						},
						{
							xtype:'textfield',
							fieldLabel:'Password',
							dataField:'password'
						},
					]
				},
				{
					xtype:'panel',
					title:'Incoming',
					defaults:{
						anchor:'100%',
						layout:'anchor'
					},
					items:[
						{
							xtype:'textarea',
							dataField:'incoming_context',
							height:400
						},
					]
				},
				{
					xtype:'panel',
					title:'Outgoing',
					defaults:{
						anchor:'100%',
						layout:'anchor'
					},
					items:[

						{
							xtype:'textarea',
							dataField:'outgoing_context',
							height:400
						},
					]
				}


			]
		}



	],
	bodyPadding:5,

	initComponent: function () {
		this.callParent(arguments);
		this.processModel()



	},
	processModel:function(){
		var model=this.getModel();
		var items=this.query('[dataField]');
		Ext.Array.each(items,function(item){
			item.setValue(model.get(item.dataField));
		},this);
	},
	prepareModel:function(){
		var model=this.getModel();
		var items=this.query('[dataField]');
		Ext.Array.each(items,function(item){
			model.set(item.dataField,item.getValue());
		},this);
	}




})
;