Ext.define('Common.model.Did', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'extension',  type: 'string'},
		{name: 'description',  type: 'string'},

	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/did/',
	}
});