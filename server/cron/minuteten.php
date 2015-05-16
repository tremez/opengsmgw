#!/usr/bin/php
<?php
$config=parse_ini_file("/etc/amportal.conf");
mysql_connect($config['AMPDBHOST'],$config['AMPDBUSER'],$config['AMPDBPASS']);
mysql_select_db($config['AMPDBNAME']);
//Update did
$query="UPDATE cdr c LEFT JOIN (SELECT * FROM cdr WHERE did<>'') d ON d.uniqueid=c.linkedid SET c.did=d.did WHERE c.did=''";
$start=time();
mysql_query($query);
echo mysql_affected_rows();
echo mysql_error();

echo 'DID sync complete in '.(time()-$start);