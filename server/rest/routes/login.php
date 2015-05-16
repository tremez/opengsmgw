<?

$app->get('/login/:id', function ($id) use ($app,$ajam) {
    session_start();
	echo json_encode($_SESSION);

});



?>