Ext.define('Common.store.User', {
	extend: 'Ext.data.Store',
	model: 'Common.model.User',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/user/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});