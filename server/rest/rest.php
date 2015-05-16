<?php
define('FREEPBX_IS_AUTH',TRUE);
require_once '/etc/freepbx.conf';
require_once 'includes/Slim/Slim.php';
require_once 'includes/Ajam/Ajam.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$config['urlraw'] = 'http://localhost:8088/asterisk/rawman';  // use pbx ip, port number, http prefix, full URL to rawman
$config['admin'] = 'callnotifier';  // as defined in manager.conf
$config['secret'] = 'rfhm2tpx47';  // as defined in manager.conf
$config['authtype'] = 'plaintext';
$config['cookiefile'] = '/tmp/ajam';
$config['debug'] = false;  // set to true for verbose debug output, older versions don't accept false
$ajam = new Ajam($config);
session_start();
header('Content-Type: application/json');
require_once 'routes/cdr.php';
require_once 'routes/operator.php';
require_once 'routes/queue.php';
require_once 'routes/did.php';
require_once 'routes/user.php';
require_once 'routes/sysstats.php';
require_once 'routes/trunk.php';
require_once 'routes/disposition.php';
require_once 'routes/login.php';


$app->options('/:module+/', function ($module) use($app,$ajam){
	//Return response headers
	$response = $app->response();
	$app->response()->status(200);
	$response->header('Access-Control-Allow-Origin', '*');
	$response->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-authentication, X-client');
	$response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->run();

?>