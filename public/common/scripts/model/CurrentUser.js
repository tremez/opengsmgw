Ext.define('Common.model.CurrentUser', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'username',  type: 'string'},
		{name: '_sections',  type: 'auto'},
	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/user/current/',
	}
});