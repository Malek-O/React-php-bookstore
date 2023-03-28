<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $js = "";
    require_once 'connection.php';
    require_once 'functions.php';

    // Retrieve data from POST request
    if (isset($_POST["submit"])) {
        $uid = $_POST["uid"];
        $email = $_POST["email"];
        $pwd = $_POST["pwd"];
        $pwdrepeat = $_POST["pwdrepeat"];

        if (empty($email) || empty($uid) || empty($pwd) || empty($pwdrepeat)) {
            $js = array("error" => "Please Fill the blanks");
            echo json_encode($js);
            exit();
        } elseif
        (invalidUid($uid) !== false) {
            $js = array("error" => "Please use proper username");
            echo json_encode($js);
            exit();
        } elseif (pwdMatch($pwd, $pwdrepeat) !== false) {
            $js = array("error" => "Check your password");
            echo json_encode($js);
            exit();
        } elseif (uidExists($conn, $uid, $email) !== false) {
            $js = array("error" => "Username taken");
            echo json_encode($js);
            exit();
        } else {
            createUser($conn, $email, $uid, $pwd);
            $js = ["message" => "Welcome aboared !", "code" => "200"];
            echo json_encode($js);
        }
    }
}
mysqli_close($conn);
