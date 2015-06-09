Ext.define('Common.model.Relay', {
	extend: 'Ext.data.Model',
	mixins: [
		'Ext.mixin.Observable',
	],
	constructor: function(config) {
		var me = this,
			storeId;
		me.callParent(arguments);

		me.isInitializing = true;
		me.mixins.observable.constructor.call(me, config);
		me.isInitializing = false;

	},
	fields: [
		{name: 'id',  type: 'int'},
		{name: 'label',  type: 'string'},
		{name: 'arduinoPin',  type: 'int'},
		{name: 'shieldPort',  type: 'int'},
		{name: 'status',  type: 'string'},
		{name: 'description',  type: 'string'},

	],
	proxy: {
		type: 'rest',
		url : '/relays',
		writer:{
			writeAllFields:true
		}
	},
	sendRequest:function(action){
		console.log('SENDING ACTION',action);
		var relayRequest=Ext.create('Common.model.RelayRequest',{
			pin:this.get('arduinoPin'),
			action:action
		});
		relayRequest.save();
	}
});