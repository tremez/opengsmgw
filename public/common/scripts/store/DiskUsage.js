Ext.define('Common.store.DiskUsage', {
	extend: 'Ext.data.Store',
	model: 'Common.model.DiskUsage',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/diskusage/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});