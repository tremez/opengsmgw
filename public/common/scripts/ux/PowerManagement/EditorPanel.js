Ext.define('Ext.ux.PowerManagement.EditorPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.relayeditorpanel',

	requires: [
		'Common.model.Relay',
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
			xtype:'textfield',
			fieldLabel:'Label',
			dataField:'label'

		},

		{
			xtype:'textfield',
			fieldLabel:'Arduino PIN',
			dataField:'arduinoPin'

		},
		{
			xtype:'textfield',
			fieldLabel:'Shield Port',
			dataField:'shieldPort'

		},
		{
			xtype:'textarea',
			fieldLabel:'Description',
			dataField:'description'

		},



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




});