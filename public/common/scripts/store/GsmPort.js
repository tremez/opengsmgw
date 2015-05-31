Ext.define('Common.store.GsmPort', {
	extend: 'Ext.data.Store',
	model: 'Common.model.GsmPort',
	proxy: {
		type: 'rest',
		url : '/ports',
		timeout:360000,
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});