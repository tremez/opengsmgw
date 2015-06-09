Ext.define('Common.model.RelayRequest', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'pin',  type: 'int'},
		{name: 'action',  type: 'string'},

	],
	idProperty:'device',
	proxy: {
		type: 'rest',
		url : '/relayrequest',
		writer:{
			writeAllFields:true
		}
	},

});