<?php
// echo "hello";
// exit();
//
$token = $_GET['otoken'];

if (isset($_SERVER["HTTP_ORIGIN"])) {
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');

header('Access-Control-Allow-Methods: GET');

header("Access-Control-Allow-Headers: X-Requested-With");

if (!isset($token)) {
    http_response_code(400);
    exit();
}

header('Content-Type: application/json');

// Create connection
// echo $token;
// exit();
parts($token);

function parts($token)
{


    $url = "https://accesstest.authorize.net/oauth/v1/token";
    $curl = curl_init();

    curl_setopt_array($curl, array(
        //  in python file too it's a sanbox token
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_SSL_VERIFYPEER => 0,

        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
    ));

    $query ="grant_type=authorization_code&code=" . urlencode($token) . "&client_id=kbQv0P5C2N&client_secret=5ce3711d-58dc-43fc-9b82-e0c2bb1df21d&platform=2";
    curl_setopt($curl, CURLOPT_POSTFIELDS, $query);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);



    if ($err) {

        echo json_encode("cURL Error #:" . $err);
    } else {
        // echo "response:...";
        // echo $response;
        http_response_code($httpcode);
        echo $response;

        // $myJSON = json_encode($response);

        // echo $myJSON;
        // $myJSON2 = json_encode($curl);
        // echo $myJSON2;
    }
}
