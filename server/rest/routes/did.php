<?
$app->get('/did/:id', function ($id) {
	$query = "SELECT extension,description FROM incoming WHERE extension='$id' and cidnum=''";
	$result = mysql_query($query);
	$cdr = mysql_fetch_assoc($result);

	echo json_encode($cdr);

});

$app->get('/did/', function () use ($app) {
	$page = $app->request()->get('page');
	$start = $app->request()->get('start');
	if (!$start) {
		$start = 0;
	}
	$limit = $app->request()->get('limit');
	if (!$limit) {
		$limit = 25;
	}
	$sort = $app->request()->get('sort');
	$property = 'extension';
	$direction = 'desc';

	if ($sort) {

		$sort = json_decode($sort);
		$sort = $sort[0];
		$property = $sort->property ? $sort->property : 'extension';
		$direction = $sort->direction ? $sort->direction : 'desc';
	}

	$totalQuery = "SELECT DISTINCT * FROM incoming WHERE cidnum='' AND extension REGEXP '^[0-9]+$' ";
	$result = mysql_query($totalQuery);
	$total = mysql_num_rows($result);

	$query = "SELECT DISTINCT extension,description FROM incoming WHERE cidnum='' AND  extension REGEXP '^[0-9]+$' ORDER BY $property $direction  LIMIT $start,$limit;";

	$result = mysql_query($query);
	$queues = array();
	while ($data = mysql_fetch_assoc($result)) {

		$queues[] = $data;
	}



	$ret = new stdClass();
	$ret->records = $queues;
	$ret->total = $total;
	$ret->query = $query;
	echo json_encode($ret);


});

?>