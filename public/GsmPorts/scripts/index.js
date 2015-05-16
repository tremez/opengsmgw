Ext.Loader.setConfig({
	disableCaching: false
});

Ext.require([

], function () {

	Ext.application({
		name: 'GsmPorts',
		appFolder: 'scripts',
		extend: 'GsmPorts.Application',
		autoCreateViewport: true
	});

});