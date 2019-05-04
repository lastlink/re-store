<?php

// include('vendor/autoload.php');
// ini_set('display_errors', 1);

try {
    // $tableAresults = $dbHandler->doSomethingWithTableA();
    // require __DIR__ . '/vendor.phar';

    // $autoload = require_once __DIR__ . '/vendor.phar';
    // echo "test";
    // exit();
    // $autoload->add('MyNamespace', __DIR__ . '/src');
    echo "test";

    $client = \Symfony\Component\Panther\Client::createChromeClient();
    echo "test2";

    $crawler = $client->request('GET', 'https://api-platform.com'); // Yes, this website is 100% in JavaScript
    
    $link = $crawler->selectLink('Support')->link();
    $crawler = $client->click($link);
    
    // Wait for an element to be rendered
    $client->waitFor('.support');
    
    echo $crawler->filter('.support')->text();
    $client->takeScreenshot('screen.png'); // Yeah, screenshot!
    $client = \Symfony\Component\Panther\Client::createChromeClient();

    $crawler = $client->request('GET', 'http://example.com/');
    echo "test3";

    $fullPageHtml = $crawler->html();
    echo "test4";

    echo $fullPageHtml;
    // $pageH1 = 
    echo $crawler->filter('h1')->text();
    // echo $pageH1;
} catch (Exception $e) {
    echo "test5b";
    echo "<br>";
    echo $e;

    // echo json_encode($e);
}

echo "test6";
