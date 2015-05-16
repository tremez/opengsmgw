Ext.define('Common.model.Trunk', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'trunkid',  type: 'string'},
		{name: 'name',  type: 'string'},
		{name: 'tech',  type: 'string'},
		{name: 'outcid',  type: 'string'},
		{name: 'keepcid',  type: 'string'},
		{name: 'maxchans',  type: 'string'},
		{name: 'failscript',  type: 'string'},
		{name: 'dialoutprefix',  type: 'string'},
		{name: 'channelid',  type: 'string'},
		{name: 'usercontext',  type: 'string'},
		{name: 'provider',  type: 'string'},
		{name: 'disabled',  type: 'string'},
		{name: 'continue',  type: 'string'},
		{name: 'registrationStatus',  type: 'string'},
		{name: 'username',  type: 'string'},
		{name: 'monitoringStatus',  type: 'string'},


	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/trunk/',
	}
});