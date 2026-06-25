<?php

function orders_storage_path(): string
{
    return __DIR__ . '/storage/orders.json';
}

function read_orders(): array
{
    $path = orders_storage_path();
    if (!is_file($path)) {
        return [];
    }

    $content = file_get_contents($path);
    $orders = json_decode($content ?: '{}', true);
    return is_array($orders) ? $orders : [];
}

function write_orders(array $orders): void
{
    $path = orders_storage_path();
    $directory = dirname($path);
    if (!is_dir($directory)) {
        mkdir($directory, 0775, true);
    }

    file_put_contents($path, json_encode($orders, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

function save_order_status(string $orderRef, array $data): void
{
    if ($orderRef === '') {
        return;
    }

    $orders = read_orders();
    $current = $orders[$orderRef] ?? [];
    $orders[$orderRef] = array_merge($current, $data, [
        'order_ref' => $orderRef,
        'updated_at' => date('c'),
    ]);
    write_orders($orders);
}

function get_order_status(string $orderRef): ?array
{
    $orders = read_orders();
    return $orders[$orderRef] ?? null;
}
