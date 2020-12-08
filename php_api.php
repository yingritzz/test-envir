<?php


$hostname_db = "localhost";
$database_db = "xxxxxxxxx";
$username_db = "postgres";
$password_db = "xxxxxxxxx";

$db = pg_connect("host=$hostname_db user=$username_db password=$password_db dbname=$database_db") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'");



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
