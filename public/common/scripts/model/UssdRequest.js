Ext.define('Common.model.UssdRequest', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'device',  type: 'string'},
		{name: 'ussd',  type: 'string'},

	],
	idProperty:'device',
	proxy: {
		type: 'rest',
		url : '/ussd',
		writer:{
			writeAllFields:true
		}
	},

});