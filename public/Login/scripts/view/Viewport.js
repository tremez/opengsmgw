Ext.define('Login.view.Viewport', {

	extend: 'Ext.container.Viewport',

	requires: [
		'Ext.ux.Login.AuthForm'


	],
	cls:'loginbody',


	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},

	config: {
		authForm: null,
	},

	initComponent: function () {
		this.setAuthForm(Ext.create('Ext.ux.Login.AuthForm', {
			region: 'center',
			width: 300,

		}));


		this.items = [
			this.getAuthForm(),

		];
		this.callParent(arguments);


	},


});
