Pomo.domain = 'translation_domain';
Pomo.returnStrings = true;
Pomo.unescapeStrings = true;

window._=function(textStr){
	return '<span translatable="'+textStr+'">'+textStr+'</span>'
}
window.__=function(textStr){
	return Pomo.getText(textStr,{ domain: 'default_domain' });
}

window.prepareTranslation=function(language) {


	var lnk_deferred = Pomo.load(
		language, {
			format: 'po',
			mode: 'link',  //the new mode, tells Pomo to find a <link id="%LINK_ELEMENT_NAME%" and fetch it
			translation_domain: 'default_domain'
		});
	return lnk_deferred;
}