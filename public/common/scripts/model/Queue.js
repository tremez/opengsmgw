Ext.define('Common.model.Queue', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'extension',  type: 'string'},
		{name: 'descr',  type: 'string'},

	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/queue/',
	}
});