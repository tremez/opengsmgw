var Backbone = require('backbone');
var Dongle=require('../models/Dongle');
var _=require('underscore');
var Dongles = Backbone.Collection.extend({
	model: Dongle,
});

module.exports=Dongles;