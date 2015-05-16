<?
$dispositions=array(
	array('code'=>'NO ANSWER','name'=>'No Answer'),
	array('code'=>'CONGESTION','name'=>'Congestion'),
	array('code'=>'FAILED','name'=>'Failed'),
	array('code'=>'BUSY','name'=>'Busy'),
	array('code'=>'ANSWERED','name'=>'Answered'),



);
$app->get('/disposition/:id', function ($id) {

	echo json_encode(array());

});

$app->get('/disposition/', function () use ($app,$dispositions) {

	echo json_encode(array("records"=>$dispositions));


});

?>