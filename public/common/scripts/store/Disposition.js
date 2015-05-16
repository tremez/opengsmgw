Ext.define('Common.store.Disposition', {
	extend: 'Ext.data.Store',
	model: 'Common.model.Disposition',
	remoteSort:true,
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/disposition/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});