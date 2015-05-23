var Backbone = require('backbone');
var pdu=require('pdu');
var md5=require('MD5');
i=0;
var Dongle = Backbone.Model.extend({
	ami:null,
	io:null,
	initialize: function(){

	},
	sendSms:function(number,message){
		var pduRequest={
			text:message,
			receiver:number, //MSISDN
			encoding:'16bit' //Or 7bit if you're sending an ascii message.
		};
		var pduMessage=pdu.generate(pduRequest);
		var actionId=md5(Math.random(10000));
		var msgId=null;
		pduMessage.forEach(function(pduMsg){
			msg={
				actionid:actionId,
				action:"DongleSendPDU",
				device:this.get('device'),
				pdu:pduMsg
			};

			this.ami.send(msg);
		},this)


		this.ami.on('ami_data',function(evt){
			if(evt.actionid===actionId){
				msgId=evt.id
			};
			if(evt.event==="DongleSMSStatus"){
				if(evt.id===msgId){
					console.log(pduRequest);
					console.log(evt);
				}
			}
		},this)


	},
	sendUssd:function(ussd){
		var actionId=md5(Math.random(10000));
		msg={
			action:"DongleSendUSSD",
			device:this.get('device'),
			ussd:ussd
		};
		this.ami.send(msg);
	},
	setAmi:function(ami){
		this.ami=ami;
		this.ami.on('ami_data',this.onAmiData.bind(this));

	},
	onAmiData:function(evt){
		if(evt.device && evt.device===this.get('device')){
			var event=evt.event;
			switch (event){
				case 'DongleNewSMSBase64':
					this.onDongleNewSMSBase64(evt);
					break;
				case 'DongleNewUSSD':
					this.onDongleNewUSSD(evt);
					break;
			}
		}
	},
	onDongleNewSMSBase64:function(evt){
		console.log(evt);
	},
	onDongleNewUSSD:function(evt){
		console.log(evt.device,'-->',this.get('device'));
		console.log('TEST',evt);
		this.io.sockets.emit('ussd:received',{
			device:this.get('device'),
			message:evt.messageline0
		})
	}
});

module.exports=Dongle;