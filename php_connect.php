<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// connect database
$hostname_db1 = "122.154.179.132";
$database_db1 = "escdb";
$username_db1 = "postgres";
$password_db1 = "##esc@postgis##";
$port = "5432";

$db = pg_connect("host=$hostname_db1 user=$username_db1 port=$port password=$password_db1 dbname=$database_db1") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'");

     if ( $_GET[""] == '' ) {
  
         $sql = "SELECT distinct osm_name, occup FROM kaoliao_spp_home LIMIT 10;";
        
             $result = pg_query( $sql);
             $coursesArray = array();
        
             while ($row = pg_fetch_assoc($result)) {
             $coursesArray[] = $row;
             }
             echo json_encode($coursesArray);
     }   
    
pg_close($db);
?>