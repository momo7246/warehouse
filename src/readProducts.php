<?php

$product1 = array(
    [
        'id' => 1,
        'name' => 'product1',
        'description' => 'description1',
        'price' => 2222,
        'owner' => 1
    ],
    [
        'id' => 2,
        'name' => 'product2',
        'description' => 'description2',
        'price' => 333,
        'owner' => 2
    ],
    [
        'id' => 3,
        'name' => 'product3',
        'description' => 'description3',
        'price' => 4444,
        'owner' => 1
    ],
    [
        'id' => 4,
        'name' => 'product4',
        'description' => 'description4',
        'price' => 2222,
        'owner' => 2
    ],
    [
        'id' => 5,
        'name' => 'product5',
        'description' => 'description5',
        'price' => 2222,
        'owner' => 1
    ],
    [
        'id' => 6,
        'name' => 'product6',
        'description' => 'description6',
        'price' => 2222,
        'owner' => 2
    ],
    [
        'id' => 7,
        'name' => 'product7',
        'description' => 'description7',
        'price' => 4444,
        'owner' => 2
    ]
);
//$product2 = array(
//    'id' => 2,
//    'name' => 'product2',
//    'description' => 'description2',
//    'price' => 3333,
//    'owner' => 2
//);

//$records = array_merge($product1, $product2);

echo '{"records":'.json_encode($product1).'}';
