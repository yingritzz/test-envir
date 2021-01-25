<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$hostname_db = "34.87.23.134";
$database_db = "envir_service";
$username_db = "postgres";
$password_db = "eyJuYW1lIjoibWFwZWRpYSJ9";
$port = "5432";

$db = pg_connect("host=$hostname_db user=$username_db password=$password_db dbname=$database_db port=$port") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'");
date_default_timezone_set("Asia/Bangkok");

//////////////////////////////////////////////////

if ( $_GET["type"] == 'count_point' ) {
  
    $sql = "SELECT a.pv_th , a.pv_code , count_modis , count_viirs
    from point_viirs a 
    full join point_modis b on a.pv_code = b.pv_code
    where a.pv_th is not null
    order by count_viirs desc;";
    
        $result = pg_query( $sql);
        $coursesArray = array();
    
        while ($row = pg_fetch_assoc($result)) {
        $coursesArray[] = $row;
        }
        echo json_encode($coursesArray);
}


  

?>
