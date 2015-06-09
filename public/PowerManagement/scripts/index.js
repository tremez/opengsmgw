Ext.Loader.setConfig({
	disableCaching: false
});

Ext.require([

], function () {

	Ext.application({
		name: 'PowerManagement',
		appFolder: 'scripts',
		extend: 'PowerManagement.Application',
		autoCreateViewport: true
	});

});