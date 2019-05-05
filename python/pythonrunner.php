<?php 

// echo $_SERVER["HTTP_ORIGIN"];
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");

$command = escapeshellcmd('/home/funktech/Python-3.5.2/python ../../python/request_offer_match.py');
header('Content-Type: application/json');
$output = shell_exec($command);


header('Access-Control-Allow-Methods: GET');

header("Access-Control-Allow-Headers: X-Requested-With");
echo $output;

?>
