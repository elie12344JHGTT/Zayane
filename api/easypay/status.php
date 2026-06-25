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

function normalize_payment_status(string $status, array $payload = []): array
{
    $rawStatus = strtoupper(trim($status));
    $payloadText = strtolower(json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    $looksLikeFailure = preg_match('/solde|insuffisant|insufficient|refus|declin|declined|failed|failure|echec|echoue|erreur/', $payloadText) === 1;
    $normalized = $rawStatus === 'CANCELED' && $looksLikeFailure ? 'DECLINED' : $rawStatus;

    $message = match ($normalized) {
        'SUCCESS' => 'Paiement reussi. Merci pour votre commande.',
        'CANCELED' => 'Paiement annule. Vous pouvez reprendre votre commande.',
        'DECLINED' => 'Paiement echoue ou refuse. Veuillez reessayer.',
        default => 'Statut de paiement en attente.',
    };

    return [$normalized, $rawStatus, $message];
}

function check_easypay_status(string $reference): ?array
{
    if ($reference === '') {
        return null;
    }

    $mode = config_value('EASYPAY_MODE', 'v2');
    $url = "https://www.e-com-easypay.com/$mode/payment/" . rawurlencode($reference) . '/checking-payment';
    $sslVerify = strtolower((string)config_value('EASYPAY_SSL_VERIFY', 'true')) !== 'false';

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{}',
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_SSL_VERIFYPEER => $sslVerify,
        CURLOPT_SSL_VERIFYHOST => $sslVerify ? 2 : 0,
    ]);

    $body = curl_exec($curl);
    $error = curl_error($curl);
    $httpStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($body === false || $error || $httpStatus === 404) {
        return null;
    }

    $decoded = json_decode((string)$body, true);
    if (!is_array($decoded)) {
        return null;
    }

    $payment = $decoded['payment'] ?? null;
    $transaction = $decoded['transaction'] ?? null;
    if (!is_array($payment) || !is_array($transaction)) {
        return null;
    }

    $paymentStatus = strtoupper(trim((string)($payment['status'] ?? '')));
    if (!in_array($paymentStatus, ['SUCCESS', 'CANCELED', 'DECLINED'], true)) {
        return null;
    }

    [$status, $rawStatus, $message] = normalize_payment_status($paymentStatus, $decoded);

    return [
        'status' => $status,
        'raw_status' => $rawStatus,
        'message' => $message,
        'method' => $payment['channel'] ?? null,
        'transaction_reference' => $transaction['reference'] ?? null,
        'payment_reference' => $payment['reference'] ?? null,
        'easypay_payload' => $decoded,
    ];
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

$reference = trim((string)($order['reference'] ?? ''));
$remoteStatus = check_easypay_status($reference);
if ($remoteStatus) {
    save_order_status($orderRef, $remoteStatus);
    $order = array_merge($order, $remoteStatus, [
        'order_ref' => $orderRef,
        'updated_at' => date('c'),
    ]);
}

json_response([
    'ok' => true,
    'order_ref' => $orderRef,
    'status' => $order['status'] ?? 'PENDING',
    'raw_status' => $order['raw_status'] ?? null,
    'message' => $order['message'] ?? 'Statut de paiement en attente.',
    'updated_at' => $order['updated_at'] ?? null,
]);
