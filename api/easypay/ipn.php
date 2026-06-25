<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../orders.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Methode non autorisee.'], 405);
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload)) {
    json_response(['ok' => false, 'message' => 'JSON invalide.'], 400);
}

$transaction = $payload['transaction'] ?? null;
$payment = $payload['payment'] ?? null;

if (!is_array($transaction) || !is_array($payment)) {
    json_response(['ok' => false, 'message' => 'Payload IPN incomplet.'], 422);
}

$orderRef = trim((string)($transaction['order_ref'] ?? ''));
$transactionReference = trim((string)($transaction['reference'] ?? ''));
$paymentReference = trim((string)($payment['reference'] ?? ''));
$status = strtoupper(trim((string)($payment['status'] ?? '')));
$channel = trim((string)($payment['channel'] ?? ''));

if ($orderRef === '' || $transactionReference === '' || $paymentReference === '' || $status === '') {
    json_response(['ok' => false, 'message' => 'Champs IPN obligatoires manquants.'], 422);
}

if (!in_array($status, ['SUCCESS', 'CANCELED', 'DECLINED'], true)) {
    json_response(['ok' => false, 'message' => 'Status IPN non reconnu.'], 422);
}

$record = [
    'received_at' => date('c'),
    'order_ref' => $orderRef,
    'transaction_reference' => $transactionReference,
    'payment_reference' => $paymentReference,
    'status' => $status,
    'channel' => $channel,
    'payload' => $payload,
];

$storagePath = __DIR__ . '/../storage/ipn-events.jsonl';
file_put_contents(
    $storagePath,
    json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX,
);

save_order_status($orderRef, [
    'status' => $status,
    'method' => $channel,
    'transaction_reference' => $transactionReference,
    'payment_reference' => $paymentReference,
    'message' => match ($status) {
        'SUCCESS' => 'Paiement reussi. Merci pour votre commande.',
        'CANCELED' => 'Paiement annule. Vous pouvez reprendre votre commande.',
        'DECLINED' => 'Paiement echoue ou refuse. Veuillez reessayer.',
        default => 'Statut de paiement mis a jour.',
    },
]);

json_response([
    'ok' => true,
    'message' => 'IPN recue.',
    'order_ref' => $orderRef,
    'status' => $status,
]);


