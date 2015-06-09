Ext.define('Common.store.Relay', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Relay',
	proxy: {
		type: 'rest',
		url : '/relays',
		timeout:360000,
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});