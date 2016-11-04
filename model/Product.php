<?php

class Product
{
	public $id;
	public $ccn;
	public $description;
	public $details;
	public $partNg;
	public $typeId;
	public $locationId;
	public $note;
	public $noteDetails;
	public $year;
	public $uslp;
	public $ndbp;
	public $other;
	public $userId;
		
	public function __construct(
		$id = null,
		$userId = null,
		$ccn = null,
		$description = null,
		$details = null,
		$partNg = null,
		$typeId = null,
		$locationId = null,
		$note = null,
		$noteDetails = null,
		$year = null,
		$uslp = null,
		$ndbp = null,
		$other = null
	) {
		$this->id = htmlspecialchars(strip_tags($id));
		$this->ccn = htmlspecialchars(strip_tags($ccn));
		$this->description = htmlspecialchars(strip_tags($description));
		$this->details = htmlspecialchars(strip_tags($details));
		$this->partNg = htmlspecialchars(strip_tags($partNg));
		$this->typeId = htmlspecialchars(strip_tags($typeId));
		$this->locationId = htmlspecialchars(strip_tags($locationId));
		$this->note = htmlspecialchars(strip_tags($note));
		$this->noteDetails = htmlspecialchars(strip_tags($noteDetails));
		$this->year = htmlspecialchars(strip_tags($year));
		$this->uslp = htmlspecialchars(strip_tags($uslp));
		$this->ndbp = htmlspecialchars(strip_tags($ndbp));
		$this->other = htmlspecialchars(strip_tags($other));
		$this->userId = htmlspecialchars(strip_tags($userId));
	}
	
	public function getProduct() {
	    return array(
		'id' => $this->id,
		'ccn' => $this->ccn,
		'description' => $this->description,
		'details' => $this->details,
		'part_ng' => $this->partNg,
		'type_id' => $this->typeId,
		'location_id' => $this->locationId,
		'note' => $this->note,
		'note_details' => $this->noteDetails,
		'year' => $this->year,
		'uslp' => $this->uslp,
		'ndbp' => $this->ndbp,
		'other' => $this->other,
		'user_id' => $this->userId
	    );
	}
}