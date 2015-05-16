Ext.define('Login.controller.Controller', {
	extend: 'Ext.app.Controller',

	views: [
		'Viewport'
	],

	refs: [
		{
			ref: 'viewport',
			selector: 'viewport'
		}
	],

	requires: [
	],


	config: {

	},

	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},

	onLaunch: function () {


		this.callParent(arguments);
	}

});
