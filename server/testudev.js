var udev = require("udev");
var _ = require('underscore');
var SerialPort = require("serialport").SerialPort



var monitor = udev.monitor();
monitor.on('add', function (device) {
	if(device.SUBSYSTEM==='usb-serial'){

		var dev=device.DEVPATH;
		dev= _.last(dev.split('/'));
		if(dev==='ttyUSB0'){
			dev='/dev/'+dev;

			console.log(dev);

			var serialPort = new SerialPort(dev, {
				baudrate: 115200
			});

			serialPort.on("open", function () {
				console.log('open');
				serialPort.on('data', function(data) {
					console.log('data received: ' + data);
				});
				serialPort.write("AT+CGSN\r\n", function(err, results) {
					console.log('err ' + err);
					console.log('results ' + results);
				});
			});


		}


	}
});
