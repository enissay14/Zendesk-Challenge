<?php
    
    if(isset($_GET["port"])){
        $ch = curl_init('https://isc.sans.edu/api/port/'. $_GET['port']. '?json');                                                    
    }
    if(isset($_GET["ip"])){
        $ch = curl_init('https://isc.sans.edu/api/ip/' . $_GET['ip']. '?json');  
    }
    
    $result = curl_exec($ch);
    echo $result;
    
?>