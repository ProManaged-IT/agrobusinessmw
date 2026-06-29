<?php
/**
 * Migration runner — idempotent, safe to run multiple times.
 * Usage: php run_migrations.php
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Load .env
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

$mysqli = new mysqli(
    $_ENV['DB_HOST'] ?? 'localhost',
    $_ENV['DB_USER'] ?? '',
    $_ENV['DB_PASS'] ?? '',
    $_ENV['DB_NAME'] ?? '',
    (int)($_ENV['DB_PORT'] ?? 3306)
);

if ($mysqli->connect_error) {
    echo "❌ DB connect failed: " . $mysqli->connect_error . "\n";
    exit(1);
}
$mysqli->set_charset('utf8mb4');
echo "✅ DB connected\n";

$migrations = [];

// ── Migration 001: crowdsourced_prices ──────────────────────────────────────
$migrations['001_crowdsourced_prices'] = "
CREATE TABLE IF NOT EXISTS `crowdsourced_prices` (
  `id`           int          NOT NULL AUTO_INCREMENT,
  `crop_id`      int          NOT NULL,
  `district_id`  int          DEFAULT NULL,
  `price_per_kg` decimal(10,2) NOT NULL,
  `unit`         varchar(20)  NOT NULL DEFAULT 'kg',
  `market_name`  varchar(200) DEFAULT NULL,
  `submitted_by` varchar(50)  NOT NULL DEFAULT 'anonymous',
  `channel`      enum('web','ussd') NOT NULL DEFAULT 'web',
  `created_at`   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_crop_id`     (`crop_id`),
  KEY `idx_district_id` (`district_id`),
  KEY `idx_created_at`  (`created_at`),
  CONSTRAINT `cp_crop_fk`     FOREIGN KEY (`crop_id`)     REFERENCES `crops`     (`id`),
  CONSTRAINT `cp_district_fk` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ── Run ─────────────────────────────────────────────────────────────────────
$errors = 0;
foreach ($migrations as $name => $sql) {
    if ($mysqli->query(trim($sql))) {
        echo "  ✅ $name — OK\n";
    } else {
        echo "  ❌ $name — " . $mysqli->error . "\n";
        $errors++;
    }
}

echo $errors === 0 ? "\nAll migrations applied.\n" : "\n$errors migration(s) failed.\n";
exit($errors > 0 ? 1 : 0);
