Ext.define('Common.store.Trunk', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Trunk',
	remoteSort:true,
	pageSize:50,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/trunk/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});