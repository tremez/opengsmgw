Ext.define('Ext.ux.Login.AuthForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.authform',

	requires: [

	],
	config: {
		image:null,
		loginField:null,
		passwordField:null,
		loginButton:null,
	},
	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	bodyPadding:5,
	frame: false,
	border: false,
	bodyStyle: 'background:transparent;',
	defaults:{
		height:50
	},
	initComponent: function () {
		this.setImage(Ext.create('Ext.Img',
			{
				height:100,
				width:100,
				src:'../common/assets/images/logo.png',
				style:{
					left:0,
					right:0,
				},
			}));
		this.setLoginField(Ext.create('Ext.form.field.Text',{
			emptyText:'Login',
			allowBlank:false


		}));

		this.setPasswordField(Ext.create('Ext.form.field.Text',{
			emptyText:'Password',
			inputType: 'password',
			allowBlank:false
		}));

		this.setLoginButton(Ext.create('Ext.button.Button',{
			text:'Login',
			handler:this.onLoginClick,
			scope:this,
			margin:{
				top:25,
				bottom:100
			}
		}));

		this.items=[
			{
				xtype:'container',
				height:100,
				layout:{
					type:'vbox',
					align:'center'
				},
				items:[
					this.getImage(),

				]
			},
			this.getLoginField(),
			this.getPasswordField(),
			this.getLoginButton()

		];


		this.callParent(arguments);


	},

	onLoginClick:function(){
		if(this.isValid()){
			var username=this.getLoginField().getValue();
			var password=this.getPasswordField().getValue();
			document.location.href='../GsmPorts/index.html'

			//Ext.Ajax.request({
			//	url: 'http://178.86.25.1/admin/config.php',
			//	method: 'POST',
			//	params: {
			//		username: username,
			//		password:password
			//	},
			//	success: function(response){
			//		if(response.responseText.indexOf('Invalid Username or Password')==-1){
			//			document.location.href='../Dashboard/index.html'
			//		}
			//
			//	},
			//	failure: function(){console.log('failure');}
			//});


		}
	}

});