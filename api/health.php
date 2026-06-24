<?php
require_once __DIR__ . '/config.php';

json_response([
    'ok' => true,
    'service' => 'zayane-api',
    'time' => date('c'),
]);
