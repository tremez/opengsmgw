Ext.define('Feedback.view.feedbackWindow', {
	extend: 'Ext.window.Window',
	requires:[
		'Feedback.view.feedbackForm'
	],
	config: {
		canvas:null,
		feedbackForm:null,

	},
	title: 'Feedback',
	modal:true,
	layout:'fit',
	width:800,
	//height:800,



	initComponent: function () {
		this.setFeedbackForm(Ext.create('Feedback.view.feedbackForm',{
			canvas:this.getCanvas()
		}));
		this.items=[
			this.getFeedbackForm()
		];
		this.callParent(arguments);

	},




})
;