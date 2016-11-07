<?php

class ManageEmail
{
	private $link;
	private $email;
	private $subject = 'Reset Password Confirmation';
	
	public function __construct($link, $email) {
		$this->link = $link;
		$this->email = $email;
	}

	public function sendEmail() {
		$emailContent = $this->getEmailContent();
		$headersArr = array(
				"MIME-Version: 1.0",
				"Content-type:text/html;charset=UTF-8",
				"From: alice_7246@hotmail.com",
				"X-Mailer: PHP/" . PHP_VERSION
		);
		$headers = implode("\r\n", $headersArr);
		$response = mail(
			    $this->email,
			    $this->subject,
			    $emailContent,
			    $headers
			);
		if($response) {
			return array('status' => true, 'message' => 'Send email');
		} else {
			return array('status' => false, 'message' => 'Error sending email');
		}
	}

	private function getEmailContent() {
		$format = file_get_contents("resource/email_template.html");
		$htmlContent = str_replace('$password_reset', $this->link, $format);

		return $htmlContent;
	}
}
