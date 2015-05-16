Ext.define('Ext.ux.TranslatablePanel', {
	extend: 'Ext.panel.Panel',
	initComponent: function () {
		this.pomoDefer = prepareTranslation('russian');
		this.callParent(arguments);
		this.on('afterrender', function () {
			var els = Ext.query('[translatable]');

			this.pomoDefer.ready(function () {

				Ext.Array.each(els, function (el) {


					var element = Ext.get(el);
					var orig = element.getAttribute('translatable');
					try{
						element.update( __(orig));
					}catch(e){
						console.log('msgid "'+orig+'"');
						console.log('msgstr "'+orig+'"');

					}

				})


			});


		})


	},
});