<?php 
$command = escapeshellcmd('/home/funktech/Python-3.5.2/python ../../python/request_offer_match.py');
header('Content-Type: application/json');
$output = shell_exec($command);
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET');

header("Access-Control-Allow-Headers: X-Requested-With");
echo $output;

?>
