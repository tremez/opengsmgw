Ext.define('Common.store.Cdr', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Cdr',
	remoteSort:true,
	remoteFilter:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/cdr/',
		timeout:360000,
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});