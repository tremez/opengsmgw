var restify = require('restify');
var AsteriskAmi = require('asterisk-ami');
var Dongle=require('./models/Dongle');
var DonglesCollection=require('./collections/Dongles');
var GsmPortSettings=require('./models/GsmPortSettings');
var Db = require('tingodb')().Db;
var assert = require('assert');
var db = new Db('./server/data/', {});
var portsCollection = db.collection("gsmports");
var portSettingsCollection = db.collection("gsmportsettings");
var currentOutgoingNumbers={};
var currentIncomingNumbers={};

var currentOutgoingChannels={};
var currentIncomingChannels={};

var server = restify.createServer({
	name: 'Remez GSM API',
	version: ['1.0.0']
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));

server.use(restify.CORS());
//server.use(restify.fullResponse());
server.opts(/.*/, function (req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
	res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
	res.send(200);
	return next();
});

var io = require('socket.io').listen(server.server);
//
//
io.on('connection', function (socket) {
	console.log('CC');
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

var dongles=new DonglesCollection();

//--------SMS API----------//
/*
GET List of SMS Messages
 */
server.get('/sms/:port', function (req, res, next) {
	res.send(req.params);
	return next();
});
/*
SEND AN SMS Message
 */
server.post('/sms/:port', function (req, res, next) {
	var port=req.params.port;
	var number=req.params.number;
	var message=req.params.message;

	var device=dongles.find(function(don){
		return don.get('device')===port;
	});
	if(device){
		device.sendSms(number,message)
	}
	res.send(req.params);
	return next();
});


// ------ DONGLES API -------- //

server.get('/ports/', function (req, res, next) {
	var ret={
		records:dongles.toJSON(),
		total:dongles.length
	}
	res.send(ret);
	return next();
});

server.put('/ports/:device', function (req, res, next) {
	var port=req.params.device;
	console.log(req.body);

	portsCollection.update({device:port},[req.body],{upsert:true},function(){
		console.log(arguments);
	});

	//portsCollection.findOne({device:port}, function(err, item) {
	//	if(!item){
	//
	//		portsCollection.insert([req.params], {w:1}, function(err, result) {
	//			assert.equal(null, err);
	//		});
	//
	//	}else{
	//		console.log(2);
	//		console.log(item);
	//		console.log(item.save());
	//		console.log(1);
	//	}
	//})
	var ret={};
	res.send(ret);
	return next();
});

//----- SETTOINGS API --- //

server.get('/portsettings/:device', function (req, res, next) {
	var device=req.params.device;
	portSettingsCollection.findOne({id:device}, function(err, item) {
		console.log(item);
		var settings=new GsmPortSettings(item);
		res.send(settings.toJSON());
	})
});

server.put('/portsettings/:device', function (req, res, next) {
	var data=req.body;
	console.log(data);
	var settings=new GsmPortSettings(data);

	portSettingsCollection.update({id:settings.get('id')},settings.toJSON(),{upsert:true},function(){
		console.log(arguments);
		res.send(settings.toJSON());

	});
});

// ----- STATICS

server.get(/\/?.*/, restify.serveStatic({
	directory: './public/',
	default: 'index.html'

}));






var ami = new AsteriskAmi( { host: '127.0.0.1', username: 'remezgsm', password: 'megagsm', reconnect:true } );
ami.on('ami_data', function(evt){
	var event=evt.event;
	//console.log(evt);
	if(event==='Newchannel'){
		var context=evt.context;
		if(context && context.indexOf('dongle')!==-1){
			var con=context.split('-outgoing');
			if(con.length>1){
				var dongle=con[0];
				var number=evt.exten;
				currentOutgoingNumbers[dongle]=number;
				currentOutgoingChannels[evt.uniqueid]=dongle;

			}
			var con=context.split('-incoming');
			if(con.length>1){
				var dongle=con[0];
				var number=evt.calleridnum;
				currentIncomingNumbers[dongle]=number;
				currentIncomingChannels[evt.uniqueid]=dongle;

			}
		}
	}
	if(event==='Hangup'){
		var uniqueid=evt.uniqueid
		if(currentOutgoingChannels[uniqueid]){
			var dongle=currentOutgoingChannels[uniqueid];
			currentOutgoingNumbers[dongle]='';
		}

	}
	if(event==='DongleDeviceEntry'){
		var dongle=new Dongle(evt);
		dongle.set('outgoingNumber',currentOutgoingNumbers[dongle.get('device')]);
		dongle.set('incomingNumber',currentIncomingNumbers[dongle.get('device')]);

		dongle.ami=ami;
		dongles.add(dongle);
	};

	if(event==='DongleShowDevicesComplete'){
		io.sockets.emit('portsupdated',evt);

	};

	if(event==='DongleSMSStatus'){
	};

	if(event==='DongleStatus'){
		//Ports updated,need new status
		console.log('UPDATING PORT INFO');
		var showDevices={
			action:"DongleShowDevices"
		}
		dongles.reset();
		ami.send(showDevices)

	}


	//decide between Events and non events here and what to do with them, maybe run an event emitter for the ones you care about
});
ami.connect(function(){
	console.log("AMI CONNECTED");

});//connect creates a socket connection and sends the login action
ami.on('ami_login',function(){
	console.log('LOGIN');
	var showDevices={
		ActionID:100500,
		action:"DongleShowDevices"
	}
	dongles.reset();
	ami.send(showDevices)
})
server.listen(8090, function () {
	console.log('%s listening at %s', server.name, server.url);
});
