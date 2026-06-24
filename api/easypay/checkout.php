<?php
require_once __DIR__ . '/../config.php';

apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Methode non autorisee.'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    json_response(['ok' => false, 'message' => 'JSON invalide.'], 400);
}

$customer = $input['customer'] ?? [];
$checkout = $input['checkout'] ?? [];
$cart = $input['cart'] ?? [];

$name = trim((string)($customer['name'] ?? ''));
$email = trim((string)($customer['email'] ?? ''));
$phone = trim((string)($customer['phone'] ?? ''));
$currency = strtoupper(trim((string)($checkout['currency'] ?? 'USD')));
$method = trim((string)($checkout['method'] ?? 'online'));

if ($name === '' || $phone === '' || !in_array($currency, ['USD', 'CDF'], true) || !in_array($method, ['online', 'mobile-money'], true)) {
    json_response(['ok' => false, 'message' => 'Informations de paiement incompletes.'], 422);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['ok' => false, 'message' => 'Adresse email invalide.'], 422);
}

if (!is_array($cart) || count($cart) === 0) {
    json_response(['ok' => false, 'message' => 'Le panier est vide.'], 422);
}

$totalUsd = 0.0;
$orderLines = [];
foreach ($cart as $item) {
    $nameLine = trim((string)($item['name'] ?? 'Article'));
    $price = (float)($item['price'] ?? 0);
    $quantity = max(0, (int)($item['quantity'] ?? 0));
    if ($price <= 0 || $quantity <= 0) {
        continue;
    }
    $totalUsd += $price * $quantity;
    $orderLines[] = $quantity . 'x ' . $nameLine;
}

if ($totalUsd <= 0) {
    json_response(['ok' => false, 'message' => 'Montant invalide.'], 422);
}

$rate = (float)config_value('USD_TO_CDF', '2850');
$amount = $currency === 'CDF' ? round($totalUsd * $rate) : round($totalUsd, 2);
$orderRef = 'RZ-' . date('YmdHis') . '-' . random_int(1000, 9999);
$description = 'Commande R.Zayane: ' . implode(', ', array_slice($orderLines, 0, 6));
if (count($orderLines) > 6) {
    $description .= '...';
}

$mode = require_config('EASYPAY_MODE');
$cid = require_config('EASYPAY_CID');
$token = require_config('EASYPAY_TOKEN');
$baseUrl = rtrim((string)config_value('APP_BASE_URL', 'http://127.0.0.1:5173'), '/');

function easypay_post(string $url, array $payload): array
{
    $sslVerify = strtolower((string)config_value('EASYPAY_SSL_VERIFY', 'true')) !== 'false';
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_SSL_VERIFYPEER => $sslVerify,
        CURLOPT_SSL_VERIFYHOST => $sslVerify ? 2 : 0,
    ]);

    $body = curl_exec($curl);
    $error = curl_error($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($body === false || $error) {
        return ['ok' => false, 'http_status' => $status, 'message' => $error ?: 'Erreur reseau EasyPay.'];
    }

    $decoded = json_decode($body, true);
    if (!is_array($decoded)) {
        return ['ok' => false, 'http_status' => $status, 'message' => 'Reponse EasyPay illisible.', 'raw' => $body];
    }

    return ['ok' => true, 'http_status' => $status, 'body' => $decoded];
}

$query = http_build_query(['cid' => $cid, 'token' => $token]);

if ($method === 'mobile-money') {
    $digits = preg_replace('/\D+/', '', $phone);
    if (str_starts_with($digits, '243')) {
        $digits = substr($digits, 3);
    }
    $digits = ltrim($digits, '0');

    if (strlen($digits) < 8) {
        json_response(['ok' => false, 'message' => 'Numero Mobile Money invalide.'], 422);
    }

    $url = "https://www.e-com-easypay.com/$mode/mobile-money/payment?$query";
    $payload = [
        'order_ref' => $orderRef,
        'amount' => $amount,
        'currency' => $currency,
        'description' => $description,
        'customer_name' => $name,
        'customer_phone' => $digits,
        'customer_email' => $email,
    ];

    $response = easypay_post($url, $payload);
    if (!$response['ok']) {
        json_response(['ok' => false, 'message' => $response['message']], 502);
    }

    $body = $response['body'];
    json_response([
        'ok' => (int)($body['code'] ?? 0) === 1,
        'method' => 'mobile-money',
        'order_ref' => $orderRef,
        'reference' => $body['reference'] ?? null,
        'message' => $body['message'] ?? 'Paiement Mobile Money initialise.',
        'amount' => $amount,
        'currency' => $currency,
    ], (int)($body['code'] ?? 0) === 1 ? 200 : 422);
}

$url = "https://www.e-com-easypay.com/$mode/payment/initialization?$query";
$payload = [
    'order_ref' => $orderRef,
    'amount' => $amount,
    'currency' => $currency,
    'description' => $description,
    'success_url' => $baseUrl . '/?payment=success&order_ref=' . rawurlencode($orderRef),
    'error_url' => $baseUrl . '/?payment=error&order_ref=' . rawurlencode($orderRef),
    'cancel_url' => $baseUrl . '/?payment=cancel&order_ref=' . rawurlencode($orderRef),
    'language' => 'FR',
    'channels' => [
        ['channel' => 'CREDIT CARD'],
        ['channel' => 'MOBILE MONEY'],
    ],
    'customer_name' => $name,
    'customer_email' => $email,
];

$response = easypay_post($url, $payload);
if (!$response['ok']) {
    json_response(['ok' => false, 'message' => $response['message']], 502);
}

$body = $response['body'];
$reference = $body['reference'] ?? null;
$ok = (int)($body['code'] ?? 0) === 1 && $reference;

json_response([
    'ok' => $ok,
    'method' => 'online',
    'order_ref' => $orderRef,
    'reference' => $reference,
    'redirect_url' => $ok ? "https://www.e-com-easypay.com/$mode/payment/initialization?reference=" . rawurlencode($reference) : null,
    'message' => $body['message'] ?? ($ok ? 'Transaction initialisee.' : 'Transaction non initialisee.'),
    'amount' => $amount,
    'currency' => $currency,
], $ok ? 200 : 422);

