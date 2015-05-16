<?
$app->get('/trunk/:id', function ($id) {
	$query = "SELECT * FROM trunks WHERE trunkid='$id'";
	$result = mysql_query($query);
	$cdr = mysql_fetch_assoc($result);

	echo json_encode($cdr);

});

$app->get('/trunk/', function () use ($app) {
	$page = $app->request()->get('page');
	$start = $app->request()->get('start');
	if (!$start) {
		$start = 0;
	}
	$limit = $app->request()->get('limit');
	if (!$limit) {
		$limit = 5;
	}

	$sort = $app->request()->get('sort');
	$property = 'trunkid';
	$direction = 'desc';

	if ($sort) {

		$sort = json_decode($sort);
		$sort = $sort[0];
		$property = $sort->property ? $sort->property : 'extension';
		$direction = $sort->direction ? $sort->direction : 'desc';
	}

	$totalQuery = "SELECT * FROM trunks ";
	$result = mysql_query($totalQuery);
	$total = mysql_num_rows($result);

	$query = "SELECT * FROM trunks LEFT JOIN sip ON sip.id=CONCAT('tr-peer-',trunks.trunkid) AND sip.keyword='fromuser'  ORDER BY $property $direction  LIMIT $start,$limit;";


	$result = mysql_query($query);
	$trunks = array();
	while ($data = mysql_fetch_assoc($result)) {

		$trunks[] = $data;
	}

	$trunkRegistries=array();
	exec("sudo /usr/sbin/asterisk -rx 'sip show registry' | tail -n+4",$trunkRegistries);
	$trunkRegistriesKey=array();

	foreach($trunkRegistries as $trunkRegistry){
		while(strpos($trunkRegistry,'  ')){
			$trunkRegistry=str_replace('  ',' ',$trunkRegistry);
		}

		$trunkRegistry=explode(" ",$trunkRegistry);
		$userName=$trunkRegistry[2];
		$trunkRegistriesKey[$userName]=$trunkRegistry;
	}

	$trunkPeers=array();
	exec("sudo /usr/sbin/asterisk -rx 'sip show peers' | tail -n+4",$trunkPeers);
	$trunkPeersKey=array();

	foreach($trunkPeers as $trunkPeer){
		while(strpos($trunkPeer,'  ')){
			$trunkPeer=str_replace('  ',' ',$trunkPeer);
		}

		$trunkPeer=explode(" ",$trunkPeer);
		$userName=$trunkPeer[0];
		$trunkPeersKey[$userName]=$trunkPeer;
	}











	$trunksOut=array();
	foreach($trunks as $trunk){

		$userName=$trunk['data'];
		$trunk['username']=$userName;

		$trunkName=$trunk['channelid'];
		if($userName){
			$trunkName.='/'.$userName;
		}


		try{
		if($trunkRegistriesKey[$userName]){
			$trunk['registrationStatus']=$trunkRegistriesKey[$userName][4];
		}
		}catch (Exception $e){

		}

		try{
			if($trunkPeersKey[$trunkName]){
				$trunk['monitoringStatus']=implode(' ',$trunkPeersKey[$trunkName]);
			}
		}catch (Exception $e){

		}

		$trunksOut[]=$trunk;
	}

	$ret = new stdClass();
	$ret->records = $trunksOut;
	$ret->total = $total;
	$ret->regData = $trunkPeersKey;
	echo json_encode($ret);


});

?>