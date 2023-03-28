<?php

function emptyInputSginIp($name, $email, $username, $pwd, $rpwd)
{
    $result = "";
    if (empty($name) || empty($email) || empty($username) || empty($pwd) || empty($rpwd)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidUid($username)
{
    $result = "";
    if (!preg_match('/^[a-zA-Z0-9]+$/', $username)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function pwdMatch($pwd, $rpwd)
{
    $result = "";
    if ($pwd !== $rpwd) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function uidExists($con, $username, $email)
{

    $result = "";
    $sql = "select * from users where u_name = ? OR u_email = ?;";
    // create a prepared statment
    $stmt = mysqli_stmt_init($con);
    // prepare the prepared statment
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        $result = false;
        return $result;
        exit();
    } else {
        // Bind parameters to placeholder
        mysqli_stmt_bind_param($stmt, "ss", $username, $email); // if we have multiple ???? just add more ssss
        // Run paramenters inside the database
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
        if ($row = mysqli_fetch_assoc($res)) {
            $result = $row;
            return $result;
        } else {
            $result = false;
            return $result;
        }
    }
    mysqli_stmt_close($stmt);
}

function createUser($con, $email, $username, $pwd)
{
    $sql = "insert into users (u_name, u_email, u_pwd) values(?,?,?);";
    $stmt = mysqli_stmt_init($con);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        // try to put error massage
        exit();
    }

    // hashing the password
    $hashedPassword = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashedPassword);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}

function emptyInputLogin($username, $pwd)
{
    $result = "";
    if (empty($username) || empty($pwd)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($con, $username, $pwd)
{

    $uidExists = uidExists($con, $username, $username);

    if (!$uidExists) {
        $js = array("error" => "Username/email not found");
        echo json_encode($js);
        exit();
    }

    $pwsHashed = $uidExists['u_pwd'];
    $dehshing = password_verify($pwd, $pwsHashed);

    if (!$dehshing) {
        $js = array("error" => "Check your password");
        echo json_encode($js);
        exit();
    } else {
        session_start();
        $_SESSION["id"] = $uidExists['u_id'];
        $_SESSION["name"] = $uidExists['u_name'];
        $_SESSION["email"] = $uidExists['u_email'];
        $_SESSION["val"] = $uidExists['isAdmin'];
        $js = array("message" => "Loged in successfully", "data" => $_SESSION);
        echo json_encode($js);
        exit();
    }
}

function order($conn, $id, $price, $status)
{
    $sql = "insert into orders (o_price, o_status, u_id) values(?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo json_encode(["error" => "somthin went wrong"]);
        exit();
    }
    mysqli_stmt_bind_param($stmt, "sss", $price, $status, $id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    $sql = "SELECT * FROM orders";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    $data = array();
    if ($resultCheck > 0) {
        // Convert data into JSON format
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
    mysqli_close($conn);

}
