Ext.define('Ext.ux.Helper.SocketIO', {
	singleton: true,
	constructor: function(config) {
		this.socket = io('http://localhost:8090');
		this.socket.on('connect', function(){
			console.log('connect');

		});
		this.socket.on('disconnect', function(){
			console.log('disconnect');

		});
	},
	getSocket:function(){
		return this.socket;
	}
});