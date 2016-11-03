<?php 

include('../domain/LocationDomain.php');

$domain = new LocationDomain();
$locations = $domain->getAll();

echo json_encode($locations);