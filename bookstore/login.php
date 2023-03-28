<?php
if (isset($_POST['submit'])) {

    require_once 'connection.php';
    require_once 'functions.php';

    $uid = $_POST["uid"];
    $pwd = $_POST['pwd'];

    if (emptyInputLogin($uid, $pwd) !== false) {
        $js = array("error" => "Please Fill the blanks");
        echo json_encode($js);
        exit();
    }

    loginUser($conn, $uid, $pwd);

} else {
    $js = array("error" => "Somthing weccsdnt wrong");
    echo json_encode($js);
    exit();
}
