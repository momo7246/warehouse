<?php 

include('../domain/TypeDomain.php');

$domain = new TypeDomain();
$types = $domain->getAll();

echo json_encode($types);