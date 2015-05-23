Ext.define('Common.model.GsmPort', {
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
		{name: 'device',  type: 'string'},
		{name: 'state',  type: 'string'},
		{name: 'imeistate',  type: 'string'},
		{name: 'imsistate',  type: 'string'},
		{name: 'rssi',  type: 'string'},
		{name: 'providername',  type: 'string'},
		{name: 'defaultcallingpres',  type: 'string'},
	],
	idProperty:'device',
	proxy: {
		type: 'rest',
		url : 'http://localhost:8090/ports',
		writer:{
			writeAllFields:true
		}
	},
	sendUssd:function(ussd){
		console.log('SENDING USSD',ussd);

		var ussdRequest=Ext.create('Common.model.UssdRequest',{
			device:this.get('device'),
			ussd:ussd
		});
		ussdRequest.save();
	}
});