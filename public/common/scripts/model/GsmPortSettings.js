Ext.define('Common.model.GsmPortSettings', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'rest',
		url : 'http://localhost:8090/portsettings',
		writer:{
			writeAllFields:true
		}
	}
});