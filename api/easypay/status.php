<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../orders.php';

apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['ok' => false, 'message' => 'Methode non autorisee.'], 405);
}

$orderRef = trim((string)($_GET['order_ref'] ?? ''));
if ($orderRef === '') {
    json_response(['ok' => false, 'message' => 'Reference commande manquante.'], 422);
}

$order = get_order_status($orderRef);
if (!$order) {
    json_response([
        'ok' => true,
        'order_ref' => $orderRef,
        'status' => 'UNKNOWN',
        'message' => 'Statut de paiement en attente.',
    ]);
}

json_response([
    'ok' => true,
    'order_ref' => $orderRef,
    'status' => $order['status'] ?? 'PENDING',
    'message' => $order['message'] ?? 'Statut de paiement en attente.',
    'updated_at' => $order['updated_at'] ?? null,
]);
