var _ = require('underscore');
var SerialPort = require("serialport").SerialPort
var serialPortBuffer=[];
var util = require('util');
var events = require('events').EventEmitter;
var net = require('net');


var relayManager=function(){
	var dev='/dev/ttyACM0'
	var serialPort = new SerialPort(dev, {
		baudrate: 9600
	});
	serialPort.on("open", function () {


	});

	setStatus:function(pin,state){
		serialPort.write(state +' '+pin+"\n", function (err, results) {
		});
	}


	return this;




}
module.exports=relayManager;



