Ext.define('Common.model.Operator', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'code',  type: 'string'},
		{name: 'name',  type: 'string'},


	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/operator/',
	}
});