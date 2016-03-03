<?php
    
    $db = "https://couchdb-e299bb.smileupps.com/honeypot_sample";
    
    if($_GET['port']){
        $ch = curl_init($db . '/_design/honeypot/_view/byPort?key='. $_GET['port']);                                                    
    }
    if($_GET['ip']){
        $ch = curl_init($db . '/_design/honeypot/_view/byIP?key="'. $_GET['ip'].'"');  
    }
    if($_GET['url']){
        $ch = curl_init($db . '/_design/honeypot/_view/byRequestUrl?key="'. $_GET['url'].'"');  
    }
    if($_GET['id']){
        $ch = curl_init($db . '/'. $_GET['id']);  
    };
//     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));  
    
//     curl_setopt($ch, CURLOPT_VERBOSE, true);
//     $fp = fopen(dirname(__FILE__).'/errorlog.txt', 'w');
//     curl_setopt($ch, CURLOPT_STDERR, $fp);
    
    $result = curl_exec($ch);
    echo $result;
    
?>