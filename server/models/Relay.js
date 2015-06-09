var Backbone = require('backbone');
var Relay = Backbone.Model.extend({
	defaults:{
		id:-1,
		label:'',
		arduinoPin:0,
		shieldPort:0,
		status:0,
		description:'',

	},
	initialize: function(){

	},
});

module.exports=Relay;