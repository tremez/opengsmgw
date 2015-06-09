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
serialPort.on("open", function () {


});



var relayManager=function(){
	return this;
}
relayManager.setStatus=function(pin,state){
	var command=state +' '+pin+"\n";
	serialPort.write(command ,function (err, results) {
	});
	console.log(command);
}
module.exports=relayManager;



