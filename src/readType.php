<?php 

include_once '../domain/TypeDomain.php';
include_once '../config/Security.php';

$s = new Security();
$s->authenticate();

$domain = new TypeDomain();
$types = $domain->getAll();

echo json_encode($types);