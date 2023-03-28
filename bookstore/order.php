<?php

require 'connection.php';

if (isset($_POST['id'])) {

    require_once 'connection.php';
    require_once 'functions.php';

    $id = $_POST["id"];
    $price = $_POST['price'];
    $status = $_POST['status'];

    order($conn, $id, $price, $status);

} else {
    $js = array("error" => "Somthing weccsdnt wrong");
    echo json_encode($js);
    exit();
}
