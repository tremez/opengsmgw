Ext.define('Common.model.GsmPort', {
	extend: 'Ext.data.Model',
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
	}
});