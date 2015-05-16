<?
$app->get('/queue/:id', function ($id) use($ajam) {
	$query = "SELECT * FROM queues_config WHERE extension='$id'";
	$result = mysql_query($query);
	$queue = mysql_fetch_assoc($result);


	if ($ajam) {
		$info['Queue'] =$id;
		$test = $ajam->doCommand('QueueSummary',$info);
		$test = $ajam->getResult();


		$data=$test['data'];

		if(count($data)){
			$queueSummary=$data[1];
			$queue['queueSummary']=$queueSummary;


		}

		$test = $ajam->doCommand('QueueStatus',$info);
		$test = $ajam->getResult();
		$data=$test['data'];
		$queueParams=array();
		$queueMembers=array();
		foreach($data as $k=>$v){

			if(array_key_exists('Event',$v)){

				$event=$v['Event'];
				switch($event){
					case 'QueueParams':
						$queueParams=$v;
						break;
					case 'QueueMember':
						$location=$v['Location'];
						$extension=explode('/',$location);
						$extension=explode('@',$extension[1]);
						$extension=$extension[0];
						$queueMembers[$extension]=$v;
						break;

				}
			}

		}
		$queue['queueParams']=$queueParams;
		$queue['queueMembers']=$queueMembers;




















		if(count($data)){
			$queueStatus=$data[1];
			$queue['queueStatus']=$queueStatus;


		}



	}


	echo json_encode($queue);

});




$app->get('/queue/', function () use ($app) {
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

	$totalQuery = "SELECT * FROM queues_config";
	$result = mysql_query($totalQuery);
	$total = mysql_num_rows($result);

	$query = "SELECT * FROM queues_config ORDER BY $property $direction  LIMIT $start,$limit;";

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


$app->get('/queuemember/:id', function ($id) use($ajam) {
	$query = "SELECT * FROM queues_config WHERE extension='$id'";
	$result = mysql_query($query);
	$queue = mysql_fetch_assoc($result);




	echo json_encode($queue);

});


$app->get('/queuemember/', function () use ($app,$ajam) {


	$query = "SELECT * FROM queues_config";

	$result = mysql_query($query);

	$queues = array();
	while ($queue = mysql_fetch_assoc($result)) {


		if ($ajam) {
			$info['Queue'] =$queue['extension'];

			$test = $ajam->doCommand('QueueStatus',$info);
			$test = $ajam->getResult();
			$data=$test['data'];
			$queueParams=array();
			$queueMembers=array();
			foreach($data as $k=>$v){

				if(array_key_exists('Event',$v)){

					$event=$v['Event'];
					switch($event){
						case 'QueueParams':
							$queueParams=$v;
							break;
						case 'QueueMember':
							$location=$v['Location'];
							$extension=explode('/',$location);
							$extension=explode('@',$extension[1]);
							$extension=$extension[0];
							$v['memberExtension']=$extension;
							$queueMembers[]=$v;
							break;

					}
				}

			}
			$queue['queueParams']=$queueParams;
			$queue['queueMembers']=$queueMembers;




		}
		$queues[] = $queue;
	}


	$queueMembersResult=array();
	foreach($queues as $k=>$v){
		foreach($v['queueMembers'] as $queueMember){
			$queueMember['QueueName']=$v['descr'].' ('.$v['extension'].')';
			$queueMembersResult[]=$queueMember;
		}


	}


	$ret = new stdClass();
	$ret->records = $queueMembersResult;
	$ret->total = count($queueMembersResult);
	echo json_encode($ret);

});



















?>