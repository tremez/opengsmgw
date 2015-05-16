Ext.define('Feedback.view.feedbackForm', {
	extend: 'Ext.panel.Panel',

	requires: [
	],
	config: {
		canvas:null,
	},
	layout:'anchor',
	bodyPadding:5,
	autoScroll:true,
	initComponent: function () {

		this.items=[
			{
				xtype:'textfield',
				emptyText:'Reason',
				anchor:'100%'
			},
			{
				xtype:'textarea',
				emptyText:'Description',
				anchor:'100%'
			},
			{
				xtype:'fieldset',
				title:'Transferred info',
				collapsible:true,
				collapsed:true,
				items:[
					{
						xtype:'textfield',
						fieldLabel:'Location',
						value:window.location,
						anchor:'100%'
					},

					{
						xtype:'image',
						src:this.getCanvas().toDataURL("image/png"),
						anchor:'100%'

					}
				]
			},

		];
		this.callParent(arguments);

	},




})
;