var Backbone = require('backbone');
var _ = require('underscore');

var pdu=require('pdu');
var md5=require('MD5');
var GsmPortSettings = Backbone.Model.extend({
	callingpres_real:'prohib_not_screened',
	defaults:{
		device:'',
		imei:'',
		imsi:'',
		callingpres:'',
		rxgain:0,
		txgain:-5,
		mindtmfgap:45,
		mindtmfduration:80,
		mindtmfinterval:80,
		username:'test',
		password:'test',
		incoming_context:';exten => s,1,Set(CALLERID(NUM)=${CALLERID(NUM):1:12})\n'+'exten => s,1,Set(CALLERID(NAME)=${CALLERID(NUM)})\n'+'exten => s,n,Dial(SIP/{%device%}/{%gsm%})\n'+'exten => s,n,Hangup\n',
		outgoing_context:'exten => _X.,1,Dial(dongle/{%device%}/${EXTEN})'
	},
	initialize: function(){

	},
	getExtensionConfig:function(){
		var ret=[];
		var incoming_context=this.get('incoming_context');
		var outgoing_context=this.get('outgoing_context');

		incoming_context=incoming_context.split('{%device%}').join(this.get('device'));
		incoming_context=incoming_context.split('{%gsm%}').join(this.get('device').replace('dongle','gsm-'));

		outgoing_context=outgoing_context.split('{%device%}').join(this.get('device'));
		ret.push('['+this.get('device')+'-incoming]');
		ret.push(incoming_context);
		ret.push('['+this.get('device')+'-outgoing]');
		ret.push(outgoing_context);
		return ret.join('\n');


	},
	getSipConfig:function(){
		var ret=[];
		ret.push('['+this.get('device')+']');
		ret.push('username='+this.get('username'));
		ret.push('secret='+this.get('password'));
		ret.push('context='+this.get('device')+'-outgoing');
		return ret.join('\n');


	},
	getDongleConfig:function(){

		var ret=[];
		ret.push('['+this.get('device')+']');
		ret.push('context='+this.get('device')+'-incoming');

		if(this.get('imei')!==this.defaults['imei']){
			ret.push('imei='+this.get('imei'));
		}

		if(this.get('imsi')!==this.defaults['imsi']){
			ret.push('imsi='+this.get('imsi'));
		}

		if(this.get('rxgain')!==this.defaults['rxgain']){
			ret.push('rxgain='+this.get('rxgain'));
		}

		if(this.get('txgain')!==this.defaults['txgain']){
			ret.push('txgain='+this.get('txgain'));
		}

		if(this.get('mindtmfgap')!==this.defaults['mindtmfgap']){
			ret.push('mindtmfgap='+this.get('mindtmfgap'));
		}

		if(this.get('mindtmfduration')!==this.defaults['mindtmfduration']){
			ret.push('mindtmfduration='+this.get('mindtmfduration'));
		}

		if(this.get('mindtmfinterval')!==this.defaults['mindtmfinterval']){
			ret.push('mindtmfinterval='+this.get('mindtmfinterval'));
		}
		if(this.get('callingpres')){
			ret.push('callingpres='+this.callingpres_real);
		}
		return ret.join('\n');





	}

});

module.exports=GsmPortSettings;