<?php

  if($_POST) {

    $name = $_POST['formData.name'];
    $email = $_POST['formData.email'];
    $subject = $_POST['formData.subject'];
    $message = $_POST['formData.message'];
    
    header("Access-Control-Allow-Origin: *");
    mail("pawel.kubis1989@gmail.com", $name, $email, $subject, $message);
  }


?>
