Ext.define('Common.store.QueueMember', {
	extend: 'Ext.data.Store',
	model: 'Common.model.QueueMember',
	remoteSort:true,
	groupField: 'QueueName',

	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/queuemember/',
		reader: {
			type: 'json',
			rootProperty: 'records'
		}
	}
});