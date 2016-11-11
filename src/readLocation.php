<?php 

include_once '../domain/LocationDomain.php';
include_once '../config/Security.php';

$s = new Security();
$s->authenticate();

$domain = new LocationDomain();
$locations = $domain->getAll();

echo json_encode($locations);