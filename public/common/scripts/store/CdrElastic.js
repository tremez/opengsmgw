Ext.define('Common.store.CdrElastic', {
	extend: 'Common.ux.Data.Store.Elastic',
	model: 'Common.model.Cdr',
	remoteSort:true,
	remoteFilter:true,
});