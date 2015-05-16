var Backbone = require('backbone');
var pdu=require('pdu');
var md5=require('MD5');
var Dongle = Backbone.Model.extend({
	ami:null,
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
		msg={
			actionid:actionId,
			action:"DongleSendPDU",
			device:this.get('device'),
			pdu:pduMessage[0]
		};
		this.ami.send(msg);

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


	}
});

module.exports=Dongle;