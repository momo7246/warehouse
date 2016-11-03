<?php

class Type
{
	public $id;
	public $description;
		
	public function __construct(
		$id = null,
		$description = null
	) {
		$this->id = htmlspecialchars(strip_tags($id));
		$this->description = htmlspecialchars(strip_tags($description));
	}
	
	public function getType() {
	    return array(
		'id' => $this->id,
		'description' => $this->description
	    );
	}
}