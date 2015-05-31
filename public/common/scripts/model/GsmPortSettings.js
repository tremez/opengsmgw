Ext.define('Common.model.GsmPortSettings', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'rest',
		url : '/portsettings',
		writer:{
			writeAllFields:true
		}
	}
});