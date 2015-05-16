<?
$app->get('/cdr/:id', function ($id) {
	$query = "SELECT * FROM cdr WHERE uniqueid='$id'";
	$result = mysql_query($query);
	$cdr = mysql_fetch_assoc($result);

	echo json_encode($cdr);

});

$app->get('/cdr/', function () use ($app) {
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
	$property = 'calldate';
	$direction = 'desc';

	if ($sort) {

		$sort = json_decode($sort);
		$sort = $sort[0];
		$property = $sort->property ? $sort->property : 'calldate';
		$direction = $sort->direction ? $sort->direction : 'desc';
	}
	if ($property == 'linkedid') {
		$property = 'calldate';
		$direction = 'desc';
	}


	$filter = $app->request()->get('filter');
	$filterString = "WHERE 1 ";
	$showConnectedCalls = false;
	$hideMissedQueueCalls = false;
	if ($filter) {
		$filter = json_decode($filter);
		foreach ($filter as $filterItem) {
			switch ($filterItem->property) {
				case 'date_start':
					$filterString .= "AND calldate>='" . str_replace('T', ' ', $filterItem->value) . "' ";
					break;
				case 'date_finish':
					$filterString .= "AND calldate<='" . str_replace('T', ' ', $filterItem->value) . "' ";
					break;
				case 'did':
					if ($filterItem->value) {
						$filterString .= "AND did IN (" . implode(',', $filterItem->value) . ") ";
					}
					break;
				case 'user':
					if ($filterItem->value) {
						$filterString .= "AND (src IN (" . implode(',', $filterItem->value) . ") ";
						$filterString .= "OR dst IN (" . implode(',', $filterItem->value) . ")) ";

					}
					break;
				case 'queue':
					if ($filterItem->value) {
						$filterString .= "AND (src IN (" . implode(',', $filterItem->value) . ") ";
						$filterString .= "OR dst IN (" . implode(',', $filterItem->value) . ")) ";

					}
					break;
				case 'disposition':
					if ($filterItem->value) {
						$filterString .= "AND disposition IN ('" . implode("','", $filterItem->value) . "') ";
					}
					break;
				case 'showconnectedcalls':
					if ($filterItem->value) {
						$showConnectedCalls = true;
					}
					break;
				case 'hidemissedqueuecalls':
					if ($filterItem->value) {
						$hideMissedQueueCalls = true;
					}
					break;
			}
		}
	}


	$totalQuery = "SELECT * FROM cdr $filterString";


	$result = mysql_query($totalQuery);
	$total = mysql_num_rows($result);

	$query = "SELECT * FROM cdr $filterString ORDER BY $property $direction LIMIT $start,$limit;";
	$result = mysql_query($query);
	$cdrs = array();
	$uniqueids = array();
	$linkedids=array();
	while ($data = mysql_fetch_assoc($result)) {
		if (!$data['linkedid']) {
			$data['linkedid'] = $data['uniqueid'];
		}
		$cdrs[] = $data;
		$uniqueids[] = $data['uniqueid'];
		$linkedids[] = $data['linkedid'];

	}

	if ($hideMissedQueueCalls) {
		$filteredCdrs = array();
		foreach ($cdrs as $cdr) {
			if (($cdr['disposition'] == 'NO ANSWER') && ($cdr['lastapp'] != 'Queue')) {

				$linkedid = $cdr['linkedid'];
				$query = "SELECT * FROM cdr WHERE uniqueid=$linkedid";
				$result = mysql_query($query);
				$data = mysql_fetch_assoc($result);
				if ($data['lastapp'] != 'Queue') {
					$filteredCdrs[] = $cdr;

				}


			} else {
				$filteredCdrs[] = $cdr;
			}

		}
		$cdrs = $filteredCdrs;


	}

	if ($showConnectedCalls) {
		$linkedids = implode(",", $linkedids);
		$uniqueids = implode(",", $uniqueids);

		$query = "SELECT * FROM cdr WHERE linkedid IN ($linkedids) AND uniqueid NOT IN ($uniqueids)";
		$result = mysql_query($query);
		while ($data = mysql_fetch_assoc($result)) {
			$cdrs[] = $data;
		}
	}


	/*
	 * Now we need to go through result
	 * If there is a Queue call in a group - we need to mark this call as NOT ANSWERED if there is no ANSERED calls in a group

	*/
	$queueCallsArray = array();
	$origQueueCallsArray = array();
	$origQueueCallsCounterArray = array();

	$queueResultArray = array();
	$temp = array();
	foreach ($cdrs as $k => $data) {
		if ($data['lastapp'] == 'Queue') {
			$queueCallsArray[$data['linkedid']] = 'NO ANSWER';
			$origQueueCallsArray[$data['linkedid']] = $data['disposition'];

		}
		if ($data['linkedid'] == '1408226111.27') {
			$temp[] = $data;
		}
	}


	foreach ($cdrs as $k => $data) {

		if (isset($queueCallsArray[$data['linkedid']]) && $data['lastapp'] != 'Queue' && $data['disposition'] == 'ANSWERED') {
			$queueCallsArray[$data['linkedid']] = $data['disposition'];
		}
		if (isset($queueCallsArray[$data['linkedid']]) && $data['lastapp'] != 'Queue') {
			$origQueueCallsCounterArray[$data['linkedid']] = 1;
		}
	}


	foreach ($cdrs as $k => $data) {
		if ($data['lastapp'] == 'Queue' && isset($queueCallsArray[$data['linkedid']]) && isset($origQueueCallsCounterArray[$data['linkedid']])) {
			$cdrs[$k]['disposition'] = $queueCallsArray[$data['linkedid']];
		}
	}


	$ret = new stdClass();
	$ret->records = $cdrs;
	$ret->total = $total;
	$ret->query = $query;
	$ret->queues = $queueCallsArray;
	$ret->temp = $temp;

	echo json_encode($ret);


});

?>