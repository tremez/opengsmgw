var Backbone = require('backbone');
var pdu=require('pdu');
var md5=require('MD5');
var GsmPortSettings = Backbone.Model.extend({
	defaults:{
		device:'test',
		imei:'test',
		imsi:'test',
		callingpres:'',
		rxgain:0,
		txgain:-5,
		mindtmfgap:45,
		mindtmfduration:80,
		mindtmfinterval:80,
		username:'test',
		password:'test',
		incoming_context:'text',
		outgoing_context:'text'
	},
	initialize: function(){

	},

});

module.exports=GsmPortSettings;