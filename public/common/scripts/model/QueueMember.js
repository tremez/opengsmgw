Ext.define('Common.model.QueueMember', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'Event',  type: 'string'},
		{name: 'Queue',  type: 'string'},
		{name: 'QueueName',  type: 'string'},
		{name: 'Name',  type: 'string'},
		{name: 'Location',  type: 'string'},
		{name: 'Membership',  type: 'string'},
		{name: 'Penalty',  type: 'string'},
		{name: 'CallsTaken',  type: 'string'},
		{name: 'LastCall',  type: 'date', dateFormat: 'timestamp'},
		{name: 'Status',  type: 'int'},
		{name: 'Paused',  type: 'string'},
		{name: 'memberExtension',  type: 'string'},
	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/queuemember/',
	}
});