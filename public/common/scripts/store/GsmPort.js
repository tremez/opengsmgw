Ext.define('Common.store.GsmPort', {
	extend: 'Ext.data.Store',
	model: 'Common.model.GsmPort',
	proxy: {
		type: 'rest',
		url : 'http://localhost:8090/ports',
		timeout:360000,
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});