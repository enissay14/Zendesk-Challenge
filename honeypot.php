<?php
    
    $db = "https://couchdb-e299bb.smileupps.com/honeypot_sample";
    
    if(isset($_GET["port"])){
        $ch = curl_init($db . '/_design/honeypot/_view/byPort?key='. $_GET['port']);                                                    
    }
    if(isset($_GET["ip"])){
        $ch = curl_init($db . '/_design/honeypot/_view/byIP?key="'. $_GET['ip'].'"');  
    }
    if(isset($_GET["url"])){
        $ch = curl_init($db . '/_design/honeypot/_view/byRequestUrl?key="'. $_GET['url'].'"');  
    }
    if(isset($_GET["id"])){
        $ch = curl_init($db . '/'. $_GET['id']);  
    };

    $result = curl_exec($ch);
    echo $result;
    
?>