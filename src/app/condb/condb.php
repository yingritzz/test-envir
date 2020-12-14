<?php
include './component/login/login.component.html';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$hostname_db = "localhost";
$database_db = "envir_service";
$username_db = "postgres";
$password_db = "wisar00t";
$port = "5434";

$db = pg_connect("host=$hostname_db user=$username_db password=$password_db dbname=$database_db port=$port") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'");


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

   
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT username , password 
    FROM admin
    WHERE username == '$username' AND password == '$password';";
    
        $result = pg_query( $sql);
        $coursesArray = array();
    
        while ($row = pg_fetch_assoc($result)) {
        $coursesArray[] = $row;
        }
        echo json_encode($coursesArray);
        if ($coursesArray.username == '$username' ){
        header('Location: http://stackoverflow.com');
        }
    }

else if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $sql = "INSERT INTO customer (cus_id,cus_fullname,cus_email,cus_phone,cus_date_add,cus_date_edit) 
    VALUES (19,'wisaroot','toeya@gmail.com',0849826721,'2020-12-14','2020-12-14')" ;
    
    $insert = pg_query($sql) ; 
    if($insert){
    $result_query = pg_query("SELECT * from customer where cus_fullname = 'wisaroot'  and cus_id = '13'") ; 
    $coursesArray = array();
    while ($row = pg_fetch_assoc($result_query)) {
        $coursesArray[] = $row;
        }
    echo json_encode($coursesArray);
    // $arr = pg_fetch_array($result_query);
    // echo json_encode($arr);
}

else{
echo  '{ "55555"}';
//insert":"false
}
}
?>
