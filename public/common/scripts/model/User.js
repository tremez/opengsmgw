Ext.define('Common.model.User', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'extension',  type: 'string'},
		{name: 'name',  type: 'string'},
		{name: 'peerInfo',  type: 'auto'},


	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/user/',
	}
});