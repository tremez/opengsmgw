var udev = require("udev");
var _ = require('underscore');
var SerialPort = require("serialport").SerialPort
var monitor = udev.monitor();
var serialPortBuffer=[];
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
			console.log('open');
			serialPort.on('data', function (data) {
				var msg=data.toString();
				//console.log(msg);
				if(msg.indexOf('AT+CGSN')===-1){
					msg=msg.replace(/\D/g, '');
					console.log(msg);
					serialPort.close();
				}
			});
			serialPort.write("AT+CGSN\r\n", function (err, results) {
			});
		});


	}
});

