Ext.define('Common.model.Cdr', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'acctid',  type: 'string'},
		{name: 'calldate',  type: 'string'},
		{name: 'clid',  type: 'string'},
		{name: 'src',  type: 'string'},
		{name: 'dst',  type: 'string'},
		{name: 'dcontext',  type: 'string'},
		{name: 'channel',  type: 'string'},
		{name: 'dstchannel',  type: 'string'},
		{name: 'lastapp',  type: 'string'},
		{name: 'lastdata',  type: 'string'},
		{name: 'duration',  type: 'int'},
		{name: 'billsec',  type: 'int'},
		{name: 'disposition',  type: 'string'},
		{name: 'amaflags',  type: 'string'},
		{name: 'accountcode',  type: 'string'},
		{name: 'uniqueid',  type: 'string'},
		{name: 'userfield',  type: 'string'},
		{name: 'recordingfile',  type: 'string'},
		{name: 'did',  type: 'string'},
		{name: 'cnum',  type: 'string'},
		{name: 'cnam',  type: 'string'},
		{name: 'outbound_cnum',  type: 'string'},
		{name: 'outbound_cnam',  type: 'string'},
		{name: 'dst_cnam',  type: 'string'},
		{name: 'linkedid',  type: 'string'},



	],
	proxy: {
		type: 'rest',
		url : 'http://178.86.25.1/rest/rest.php/cdr/',
	}
});