Ext.define('Common.store.Did', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Did',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/did/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});