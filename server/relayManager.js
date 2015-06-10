var _ = require('underscore');
var SerialPort = require("serialport").SerialPort
var serialPortBuffer=[];
var util = require('util');
var events = require('events').EventEmitter;
var net = require('net');

var dev='/dev/tty.usbmodem145121';
var serialPort = new SerialPort(dev, {
	baudrate: 9600
});
var msgBuffer="";




var relayManager=function(){
	var me=this;
	serialPort.on("open", function () {

		serialPort.on('data', function (data) {
			var msg=data.toString();
			msgBuffer+=msg;
			if(msgBuffer.indexOf('OK')!==-1){
				me.emit('response',msgBuffer);
				msgBuffer="";
			}


		});

	});
	this.setStatus=function(pin,state){
		var command=state +' '+pin+"\n";
		serialPort.write(command ,function (err, results) {
		});
		console.log(command);
	}

	return this;
}


util.inherits(relayManager, events);
module.exports=relayManager;



