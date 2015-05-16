Ext.define('Common.store.Operator', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Operator',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/operator/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});