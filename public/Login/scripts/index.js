Ext.Loader.setConfig({
	disableCaching: false
});

Ext.require([

], function () {

	Ext.application({
		name: 'Login',
		appFolder: 'scripts',
		extend: 'Login.Application',
		autoCreateViewport: true
	});

});