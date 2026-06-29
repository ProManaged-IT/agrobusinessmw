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
    $_ENV['DB_HOST'] ?? '',
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
  `price_per_bag` decimal(12,2) DEFAULT NULL,
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

// ── Migration 002: onboarding_applications ──────────────────────────────────
$migrations['002_onboarding_applications'] = "
CREATE TABLE IF NOT EXISTS `onboarding_applications` (
  `id`                int          NOT NULL AUTO_INCREMENT,
  `application_ref`   varchar(30)  NOT NULL,
  `user_type`         enum('farmer','seller','buyer') NOT NULL,
  `full_name`         varchar(200) NOT NULL,
  `phone_number`      varchar(50)  NOT NULL,
  `email`             varchar(200) DEFAULT NULL,
  `national_id`       varchar(100) DEFAULT NULL,
  `district_id`       int          DEFAULT NULL,
  `village`           varchar(200) DEFAULT NULL,
  `crops_of_interest` text         DEFAULT NULL,
  `business_name`     varchar(200) DEFAULT NULL,
  `channel`           enum('web','ussd') NOT NULL DEFAULT 'web',
  `status`            enum('pending','approved','denied') NOT NULL DEFAULT 'pending',
  `admin_notes`       text         DEFAULT NULL,
  `denial_reason`     text         DEFAULT NULL,
  `created_at`        timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at`       datetime     DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ref` (`application_ref`),
  KEY `idx_status`  (`status`),
  KEY `idx_phone`   (`phone_number`),
  CONSTRAINT `oa_district_fk` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ── Migration 003: crowdsourced_prices_bag_column ─────────────────────────────
$migrations['003_crowdsourced_prices_bag_column'] = "
ALTER TABLE crowdsourced_prices ADD COLUMN price_per_bag decimal(12,2) DEFAULT NULL;
";

// ── Run ─────────────────────────────────────────────────────────────────────
$errors = 0;
foreach ($migrations as $name => $sql) {
    $sql = trim($sql);
    if ($sql === '') {
        echo "  ⏭ $name — skipped (empty migration)\n";
        continue;
    }

    if ($mysqli->query($sql)) {
        echo "  ✅ $name — OK\n";
        continue;
    }

    $error = $mysqli->error;
    if (strpos($error, 'Duplicate column name') !== false || strpos($error, 'already exists') !== false) {
        echo "  ⚠️ $name — already applied\n";
        continue;
    }

    echo "  ❌ $name — " . $error . "\n";
    $errors++;
}

echo $errors === 0 ? "\nAll migrations applied.\n" : "\n$errors migration(s) failed.\n";
exit($errors > 0 ? 1 : 0);
