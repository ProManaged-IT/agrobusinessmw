-- Community price review & selection (Phase 1: statistical gate + admin queue)
-- Adds a moderation lifecycle to crowdsourced_prices.
-- Safe/non-destructive: adds columns and grandfathers existing rows to 'approved'
-- so the current app display is unaffected.
--
-- Apply on production (cPanel) via phpMyAdmin or:
--   mysql -h localhost -u p601229_agro_admin -p p601229_AgroBusiness_MW < this_file.sql

ALTER TABLE crowdsourced_prices
    ADD COLUMN status ENUM('pending','approved','rejected','flagged')
        NOT NULL DEFAULT 'pending' AFTER verified,
    ADD COLUMN is_member  TINYINT(1)   NOT NULL DEFAULT 0   AFTER status,
    ADD COLUMN flag_reason VARCHAR(255) NULL                AFTER is_member,
    ADD COLUMN reviewed_by VARCHAR(50)  NULL                AFTER flag_reason,
    ADD COLUMN reviewed_at DATETIME     NULL                AFTER reviewed_by;

-- Grandfather the prices that existed before moderation was introduced.
UPDATE crowdsourced_prices SET status = 'approved' WHERE status = 'pending';

-- Helpful index for the aggregation and the admin review queue.
CREATE INDEX idx_cp_status_crop_district
    ON crowdsourced_prices (status, crop_id, district_id);
