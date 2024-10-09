<?php

namespace App\Http\Controllers;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Http\Request;

class MailController extends Controller
{
    //
    public function sendEmail()
    {

        // Crea una nuova istanza di PHPMailer
        $mail = new PHPMailer(true);  // 'true' attiva le eccezioni

        try {

            // Impostazioni email sono nel file .env
            $mail->isSMTP();
            $mail->Host       = env('PHPMAILER_HOST');
            $mail->SMTPAuth   = env('PHPMAILER_SMTPAUTH');
            $mail->Username   = env('PHPMAILER_USERNAME');
            $mail->Password   = env('PHPMAILER_PASSWORD');
            $mail->SMTPSecure = env('PHPMAILER_ENCRYPTION');
            $mail->Port       = env('PHPMAILER_PORT');
            $mail->setFrom(env('PHPMAILER_SENDFROM'), 'GIANPIERO');
            $mail->addReplyTo(env('PHPMAILER_REPLAYTO'), 'Informazioni');

            $mail->addAddress('fgianpiero@gmail.com', 'Recipient Name');

            // Contenuto dell'email
            $mail->isHTML(true);                                        // Imposta l'email come HTML
            $mail->Subject = 'Oggetto 22';
            $mail->Body    = 'Questo è il corpo del messaggio <b>in HTML</b>';
            $mail->AltBody = 'Questo è il corpo del messaggio in testo semplice';

            // Invia l'email
            $mail->send();
            return 'Email inviata con successo';
        } catch (Exception $e) {
            return "L'email non può essere inviata. Errore di PHPMailer: {$mail->ErrorInfo}";
        }
    }
}
