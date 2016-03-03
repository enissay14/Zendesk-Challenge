<?php
    
    if($_GET['port']){
        $ch = curl_init('http://isc.sans.edu/api/port/'. $_GET['port']. '?json');                                                    
    }
    if($_GET['ip']){
        $ch = curl_init('http://isc.sans.edu/api/ip/' . $_GET['ip']. '?json');  
    }

//     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));  
    
//     curl_setopt($ch, CURLOPT_VERBOSE, true);
//     $fp = fopen(dirname(__FILE__).'/errorlog.txt', 'w');
//     curl_setopt($ch, CURLOPT_STDERR, $fp);
    
    $result = curl_exec($ch);
    echo $result;
    
?>