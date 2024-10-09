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
            // Configurazione del server SMTP
            $mail->isSMTP();                                           // Imposta il server SMTP
            $mail->Host       = 'smtp.gfasulo.it';                     // Specifica il server SMTP
            $mail->SMTPAuth   = true;                                   // Abilita l'autenticazione SMTP
            $mail->Username   = 'gianpiero@gfasulo.it';               // Nome utente SMTP
            $mail->Password   = 'your-password';                        // Password SMTP
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Abilita la crittografia TLS
            $mail->Port       = 587;                                    // Porta SMTP (può essere 465 o 587)

            // Impostazioni email
            $mail->setFrom('gianpiero@gfasulo.it', 'GIANPIERO');      // Mittente
            $mail->addAddress('fgianpiero@gmail.com', 'Recipient Name'); // Destinatario
            $mail->addReplyTo('gianpiero@gfasulo.it', 'Informazioni');    // Email di risposta (facoltativa)

            // Contenuto dell'email
            $mail->isHTML(true);                                        // Imposta l'email come HTML
            $mail->Subject = 'Oggetto della tua email';
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
