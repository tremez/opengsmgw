Ext.define('Ext.ux.PowerManagement.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.powermanagement',

	requires: [
		'Common.store.Relay',
		'Common.model.Relay',
	],
	config: {
		actionWindow:null,
		requestPanel:null
	},
	title: 'Relays List',
	viewConfig: {
		enableTextSelection: true
	},

	initComponent: function () {

		this.setRequestPanel(Ext.create('Ext.ux.PowerManagement.ActionPanel'));
		this.store = this.store || Ext.create('Common.store.Relay',
			{
				autoLoad: true,
				remoteSort: false
			});
		this.store.sort('shieldPort');
		this.columns = [

			{
				text: 'Label',
				dataIndex: 'label',
				width:100,
			},
			{
				text: 'Description',
				dataIndex: 'description',
				flex:1
			},
			{
				text: 'AP',
				dataIndex: 'arduinoPin',
				width: 40

			},
			{
				text: 'SP',
				dataIndex: 'shieldPort',
				width: 40

			},

			{
				text: 'STA',
				dataIndex: 'status',
				width: 40,
				renderer: this.statusRenderer,
				scope: this

			},
			{
				text: 'Action',
				width: 40,
				renderer: function () {
					return 'A';
				}
			}
		];

		this.tbar = [
			'->',
			{
				text: 'Add',
				handler: this.showEmptyEditor,
				scope: this
			},
		]


		this.callParent(arguments);
		this.on('celldblclick', this.onCellDblClick);

	},


	status: function (value) {
		switch(value){
			case 0:
				return 'ON';
			break;
			case 1:
				return "OFF";
			break;
		}


	},
	onCellDblClick: function (sender, td, cellIndex, record, tr, rowIndex, e, eOpts) {

		switch (cellIndex) {
			case 5:
				this.showActionWindow(record);
				break;
			default:

				this.showEditor(record);
				break;
		}


	},

	showEmptyEditor: function () {
		var relay = Ext.create('Common.model.Relay');
		relay.set('id',Math.round(Math.random()*10000));
		this.showEditor(relay);
	},
	showEditor: function (model) {
		var me=this;
		var editorPanel = Ext.create('Ext.ux.PowerManagement.EditorPanel', {
			model: model
		});
		var win = Ext.create('Ext.window.Window', {
			width: 500,
			constrain: true,
			resizable: false,
			title: 'Edit Relay',
			items: [
				editorPanel
			],
			buttons: [
				{
					text: 'Save',
					handler: function () {
						editorPanel.prepareModel();
						model.save({
							success: function () {
								win.close();
								me.getStore().load();
							}
						});
					}
				}
			]
		});
		win.show();
	},
	showActionWindow: function (model) {
		this.getRequestPanel().setModel(model);
		var win=this.getActionWindow();
		if(!win){
			this.setActionWindow(
				Ext.create('Ext.window.Window', {
					width: 500,
					constrain: true,
					resizable: false,
					closeAction:'hide',
					title: 'Send Request',
					items: [
						this.getRequestPanel()
					],
				}));

			win=this.getActionWindow();

		}
		win.setTitle('Send Request : ' +model.get('label'));
		win.show();
	},


});