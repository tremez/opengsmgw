<?

$app->get('/user/:id', function ($id) use ($app,$ajam) {
	$query = "SELECT `extension`,`name` FROM users WHERE extension='$id'";
	$result = mysql_query($query);
	$user = mysql_fetch_assoc($result);

	if ($ajam) {
		$info['Peer'] =$id;
		$test = $ajam->doCommand('SIPshowpeer',$info);
		$test = $ajam->getResult();
		$data=$test['data'];


		if(count($data)){
			$userPeersData=$data[0];
			$user['peerInfo']=$userPeersData;


		}

	}


	echo json_encode($user);

});


$app->get('/user/current/', function () use ($app,$ajam) {
    $amp_user=array_key_exists('AMP_user',$_SESSION)?$_SESSION['AMP_user']:false;
    if($amp_user){
        $amp_user->_password='';
    }
    $ret = new stdClass();
    $ret->records = $amp_user?array($amp_user):null;
    $ret->total = $amp_user?1:0;
    echo json_encode($ret);
});


$app->get('/user/', function () use ($app,$ajam) {
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

	$totalQuery = "SELECT * FROM users ";
	$result = mysql_query($totalQuery);
	$total = mysql_num_rows($result);

	$query = "SELECT DISTINCT `extension`,`name` FROM users  ORDER BY $property $direction  LIMIT $start,$limit;";


	$result = mysql_query($query);
	$users = array();
	while ($data = mysql_fetch_assoc($result)) {

		$users[] = $data;
	}



	foreach($users as $k=>$user){
		$extension=$user['extension'];

		if ($ajam) {
			$info['Peer'] =$extension;
			$test = $ajam->doCommand('SIPshowpeer',$info);
			$test = $ajam->getResult();
			$data=$test['data'];


			if(count($data)){
				$userPeersData=$data[0];
				$user['peerInfo']=$userPeersData;
				$users[$k]=$user;


			}

		}
	}

	$ret = new stdClass();
	$ret->records = $users;
	$ret->total = $total;
	$ret->query = $query;
	echo json_encode($ret);


});

?>