Ext.define('Common.store.Queue', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Queue',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/queue/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});