var udev = require("udev");
var _ = require('underscore');
var SerialPort = require("serialport").SerialPort
var serialPortBuffer=[];
var util = require('util');
var events = require('events').EventEmitter;
var net = require('net');


module.exports = ttyDiscover;
function ttyDiscover(params){
	var monitor = udev.monitor();
	var me=this;
	monitor.on('add', function (device) {
		if (device.SUBSYSTEM === 'tty' && device.ID_USB_INTERFACE_NUM==='00') {
			//Probably need to filter by USB Modems in future, but not for now
			var dev = device.DEVPATH;
			dev = _.last(dev.split('/'));
			dev = '/dev/' + dev;
			serialPortBuffer.push(dev);
			var serialPort = new SerialPort(dev, {
				baudrate: 115200
			});

			serialPort.on("open", function () {
				serialPort.on('data', function (data) {
					var msg=data.toString();
					if(msg.indexOf('AT+CGSN')===-1){
						var imei=msg.replace(/\D/g, '');
						me.emit('newimei',imei);
						serialPort.close();
					}
				});
				serialPort.write("AT+CGSN\r\n", function (err, results) {
				});
			});


		}
	});




}

util.inherits(ttyDiscover, events);




