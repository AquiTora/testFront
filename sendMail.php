<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('jojiDoji@gmail.com', 'Маша Светова');
$mail->addAddress('Kselivan98@gmail.com');
$mail->Subject = 'ё!';

$body = '<h1>Comming masage</h1>';

if(trim(!empty($_POST['email']))){
    $body.='<p><strong>email</strong> '.$_POST['email'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()){
    $message = 'Error';
}else{
    $message = 'Data sent';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>