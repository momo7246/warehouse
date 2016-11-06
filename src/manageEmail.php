<?php

class ManageEmail
{
	private $link;

	public function __construct($link) {
		$this->link = $link;
	}

	public function sendEmail() {
		$to = 'momo7246@gmail.com';
		$subject = 'test';
		$emailContent = $this->getEmailContent();
		$headers = array(
				"MIME-Version: 1.0",
				"Content-type:text/html;charset=UTF-8",
				"From: momo7246@gmail.com",
				"Reply-To: replyto@example.com",
				"X-Mailer: PHP/" . PHP_VERSION
		);
		$headers = implode("\r\n", $headers);
		if(mail($to,$subject,$htmlContent,$headers)) {
			return array('status' => true, 'message' => 'Send email');
		} else {
			return array('status' => false, 'message' => 'Error sending email');
		}
	}

	private function getEmailContent() {
		$htmlContent = file_get_contents("resource/email_template.html");
		$htmlContent = str_replace('$password_reset', $this->link, $htmlContent);

		return $htmlContent;
	}
}
