Ext.define('Common.model.DiskUsage', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'recordings',  type: 'int'},
		{name: 'database',  type: 'int'},
		{name: 'disktotal',  type: 'int'},
		{name: 'diskused',  type: 'int'},
		{name: 'diskfree',  type: 'int'},
		{name: 'system',  type: 'int'},
	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/diskusage/',
	}
});