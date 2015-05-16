<?

$app->get('/diskusage/', function () use ($app) {
	$ret = new stdClass();

	$recordings=array();
	exec('du -sk /var/spool/asterisk/monitor/',$recordings);
	$recordings=$recordings[0];
	$recordings=explode("\t",$recordings);
	$recordings=$recordings[0];
	$ret->recordings=$recordings;

	$database=array();
	exec('du -sk /var/lib/mysql/',$database);
	$database=$database[0];
	$database=explode("\t",$database);
	$database=$database[0];
	$ret->database=$database;


	$disk=array();
	exec('df | grep simfs',$disk);
	$disk=$disk[0];
	while(strpos($disk,'  ')){
		$disk=str_replace('  ',' ',$disk);
	}

	$disk=explode(' ',$disk);

	$ret->disktotal=$disk[1];
	$ret->diskused=$disk[2];
	$ret->diskfree=$disk[3];

	$ret->system=$disk[2]-$recordings-$database;

	$return=new stdClass();
	$return->records=array($ret);
	echo json_encode($return);


});


?>