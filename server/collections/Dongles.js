var Backbone = require('backbone');
var Dongle=require('../models/Dongle');

var Dongles = Backbone.Collection.extend({
	model: Dongle
});

module.exports=Dongles;