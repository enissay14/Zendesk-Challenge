<?php
    
    $key = "f4bbbc77af4eed64479f4fe172eef34ad13c3cb508fb83da061c76ebaa8b4a88";
    
    $ch = curl_init('http://checkurl.phishtank.com/checkurl/index.php?url='. $_GET['url'] .'"&format="json"&app_key="'. $key .'"');                                                    
    
    $result = curl_exec($ch);
    echo $result;
    
?>