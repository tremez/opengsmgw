Ext.define('Ext.ux.GsmPorts.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gsmportsgrid',

	requires: [
		'Common.store.GsmPort',
		'Common.model.GsmPortSettings',
		'Ext.ux.Helper.SocketIO'
	],
	config: {},
	title: 'Gsm Ports List',
	viewConfig: {
		enableTextSelection: true
	},

	initComponent: function () {
		this.store = this.store || Ext.create('Common.store.GsmPort',
			{
				autoLoad: true,
				remoteSort: false
			});
		this.columns = [

			{
				text: 'Device',
				dataIndex: 'device',
				width: 150

			},
			{
				text: 'Incoming',
				dataIndex: 'incomingNumber',
				width: 150

			},
			{
				text: 'Outgoing',
				dataIndex: 'outgoingNumber',
				width: 150

			},
			{
				text: 'STA',
				dataIndex: 'state',
				width: 40,
				renderer: this.stateRenderer,
				scope: this

			},
			{
				text: 'IMEI',
				dataIndex: 'imeistate',
				flex: 1
			},
			{
				text: 'IMSI',
				dataIndex: 'imsistate',
				flex: 1

			},
			{
				text: 'SIG',
				dataIndex: 'rssi',
				width: 40,
				renderer: this.signalRenderer,
				scope: this

			},
			{
				text: 'OP',
				dataIndex: 'providername',
				width: 40,
				align: 'center',
				renderer: this.operatorRenderer,
				scope: this

			},
			{
				text: 'CP',
				dataIndex: 'defaultcallingpres',
				width: 40,
				renderer: this.callingPresRenderer,
				scope: this
			},
			{
				text:'U',
				width: 40,
				renderer:function(){
					return 'U';
				}
			}
		];

		this.tbar = [
			'->',
			{
				text: 'Add',
				handler: this.showEmptyEditor,
				scope: this
			}
		]


		this.callParent(arguments);
		Ext.ux.Helper.SocketIO.getSocket().on('portsupdated', function () {
			console.log(arguments);
			this.getStore().load();
		}.bind(this));




		this.on('celldblclick',this.onCellDblClick);

	},

	operatorRenderer: function (value) {
		var cls = "";
		switch (value.toUpperCase()) {
			case 'KYIVSTAR':
			case 'UA-KYIVSTAR':
				cls = 'mobo-kyivstar-16';
				break;
			case 'MTS UKR':
				cls = 'mobo-mts-16';
				break;
			case 'LIFE:)':
				cls = 'mobo-life-16';
				break;
			case 'DJUICE':
				cls = 'mobo-djuice-16';
				break;


		}
		return '<i title="' + value + '"class="' + cls + '"></i>';
	},
	signalRenderer: function (value, meta, model) {
		var floatValue = parseFloat(value);
		var bars = 0;
		if (floatValue > 6 && floatValue < 9) {
			bars = 1;
		}

		if (floatValue >= 9 && floatValue < 15) {
			bars = 2;
		}
		if (floatValue >= 15 && floatValue < 20) {
			bars = 3;
		}
		if (floatValue >= 20) {
			bars = 4;
		}
		//var cls='icon-ic_signal_wifi_'+bars+'_bar_24px text-ok'
		var cls = 'svg-ic_signal_wifi_' + bars + '_bar_24px icon-24';
		//var cls='mdfi_device_signal_cellular_'+bars+'_bar text-ok';
		if (model.get('state') === 'GSM not registered') {
			cls = 'mdfi_device_signal_wifi_statusbar_connected_no_internet_4_26x24px text-danger';
		}
		return '<span class="span-16"><i title="' + value + '"class="' + cls + '"></i></span>';

	},
	stateRenderer: function (value) {
		var cls = '';
		if (value === 'Free') {
			cls = 'mdfi_communication_business text-ok ';
		}
		if (value === 'Ring') {
			cls = 'mdfi_communication_ring_volume text-blue ';
		}
		if (value === 'Dialing') {
			cls = 'mdfi_communication_call_made text-blue ';
		}
		if (value === 'Outgoing') {
			cls = 'mdfi_communication_call_made text-blue ';
		}
		if (value === 'Incoming') {
			cls = 'mdfi_communication_call_received text-blue ';
		}
		if (value === 'GSM not registered') {
			cls = 'mdfi_communication_no_sim text-danger';
		}
		if (cls !== '') {
			return '<i title="' + value + '"class="' + cls + '"></i>';
		} else {
			return value;
		}

	},
	callingPresRenderer: function (value) {
		var cls;
		if (value === 'Presentation Prohibited, Not Screened') {
			cls = 'mdfi_action_https';
		}
		return '<i title="' + value + '"class="' + cls + '"></i>';

	},
	onCellDblClick: function (sender, td, cellIndex, record, tr, rowIndex, e, eOpts) {

		switch (cellIndex){
			case 9:
				this.showUssdWindow(record);
				break;
			default:
				var settings=Ext.create('Common.model.GsmPortSettings',{
					id:record.get('device')
				});
				settings.load({
					success:function(){
						console.log(settings);
						this.showEditor(settings);
					},
					scope:this
				});
				break;
		}



	},
	showEmptyEditor:function(){
		var settings=Ext.create('Common.model.GsmPortSettings');
		settings.load({
			success:function(){
				console.log(settings);
				this.showEditor(settings);
			},
			scope:this
		});

	},
	showEditor: function (model) {
		var editorPanel = Ext.create('Ext.ux.GsmPorts.EditorPanel',{
			model:model
		});
		var win = Ext.create('Ext.window.Window', {
			width:500,
			constrain:true,
			resizable:false,
			title: 'Edit GSM Port',
			items: [
				editorPanel
			],
			buttons:[
				{
					text:'Save',
					handler:function(){
						editorPanel.prepareModel();
						model.save({
							success:function(){
								win.close();
							}
						});
					}
				}
			]
		});
		win.show();
	},
	showUssdWindow: function (model) {
		var ussdPanel = Ext.create('Ext.ux.GsmPorts.UssdPanel',{
			model:model
		});
		var win = Ext.create('Ext.window.Window', {
			width:500,
			constrain:true,
			resizable:false,
			title: 'Send USSD',
			items: [
				ussdPanel
			],
		});
		win.show();
	},



});