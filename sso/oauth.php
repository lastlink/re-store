<?php
// echo "hello";
// exit();
// 
$token = $_GET['otoken'];
// echo $token;
// exit();
parts($token);


function parts($token)
{


  $curl = curl_init();

  curl_setopt_array($curl, array(
      //  in python file too it's a sanbox token
    CURLOPT_URL => "https://accesstest.authorize.net/oauth/v1/token?grant_type=authorization_code&code=" . urlencode($token) . "&client_id=kbQv0P5C2N&client_secret=5ce3711d-58dc-43fc-9b82-e0c2bb1df21d&platform=2",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_SSL_VERIFYPEER => 0,

    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);



  if ($err) {

    echo "cURL Error #:" . $err;
  } else {
    // echo "response:...";
    // echo $response;

    $myJSON = json_encode($response);

    echo $myJSON;
    // $myJSON2 = json_encode($curl);
    // echo $myJSON2;
  }
}
