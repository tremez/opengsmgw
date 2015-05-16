Ext.define('Common.store.CurrentUser', {
	extend: 'Ext.data.Store',
	model: 'Common.model.CurrentUser',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/user/current/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});