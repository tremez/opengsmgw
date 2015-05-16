<?
$operators=array(
	array('code'=>'050','name'=>'mts'),
	array('code'=>'066','name'=>'mts'),
	array('code'=>'095','name'=>'mts'),
	array('code'=>'099','name'=>'mts'),
	array('code'=>'067','name'=>'ks'),
	array('code'=>'096','name'=>'ks'),
	array('code'=>'097','name'=>'ks'),
	array('code'=>'098','name'=>'ks'),
	array('code'=>'063','name'=>'life'),
	array('code'=>'093','name'=>'life'),
	array('code'=>'068','name'=>'beeline'),
	array('code'=>'092','name'=>'peoplenet'),
	array('code'=>'091','name'=>'3mob'),
	array('code'=>'039','name'=>'gt'),
	array('code'=>'094','name'=>'intertelecom'),
	array('code'=>'048','name'=>'Odessa'),
	array('code'=>'0482','name'=>'Odessa'),
	array('code'=>'044','name'=>'Kyiv'),
	array('code'=>'056','name'=>'Dniepropetrovsk'),
	array('code'=>'057','name'=>'Kharkiv'),
	array('code'=>'043','name'=>'Vinnitsa'),



);
$app->get('/operator/:id', function ($id) {

	echo json_encode(array());

});

$app->get('/operator/', function () use ($app,$operators) {

	echo json_encode(array("records"=>$operators));


});

?>