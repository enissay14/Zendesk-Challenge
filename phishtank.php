<?php
    
    $key = "f4bbbc77af4eed64479f4fe172eef34ad13c3cb508fb83da061c76ebaa8b4a88";
    
    error_log($_GET['url']);
    error_log('http://checkurl.phishtank.com/checkurl/index.php?url='. $_GET['url'] .'&format="json"&app_key="'. $key .'"');
    $ch = curl_init('http://checkurl.phishtank.com/checkurl/index.php?url='. $_GET['url'] .'"&format="json"&app_key="'. $key .'"');                                                    
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));  
    
//     curl_setopt($ch, CURLOPT_VERBOSE, true);
//     $fp = fopen(dirname(__FILE__).'/errorlog.txt', 'w');
//     curl_setopt($ch, CURLOPT_STDERR, $fp);
    
    
    $result = curl_exec($ch);
    echo $result;
    
?>