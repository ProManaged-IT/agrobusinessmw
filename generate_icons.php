<?php
/**
 * Generates all required PNG icons for the AgroBusiness PWA.
 * Run once: php generate_icons.php
 */

function draw_agro_icon(int $sz): GdImage {
    $img = imagecreatetruecolor($sz, $sz);
    imagealphablending($img, false);
    imagesavealpha($img, true);

    // Transparent fill first
    $transparent = imagecolorallocatealpha($img, 0, 0, 0, 127);
    imagefill($img, 0, 0, $transparent);
    imagealphablending($img, true);

    $green = imagecolorallocate($img, 22, 163, 74);
    $white = imagecolorallocate($img, 255, 255, 255);

    // ── Rounded-square background ──────────────────────────────────────────────
    $r = (int)($sz * 0.188); // corner radius ~96/512
    imagefilledrectangle($img, $r, 0, $sz - $r, $sz, $green);
    imagefilledrectangle($img, 0, $r, $sz, $sz - $r, $green);
    imagefilledellipse($img, $r,      $r,      $r * 2, $r * 2, $green);
    imagefilledellipse($img, $sz - $r, $r,      $r * 2, $r * 2, $green);
    imagefilledellipse($img, $r,      $sz - $r, $r * 2, $r * 2, $green);
    imagefilledellipse($img, $sz - $r, $sz - $r, $r * 2, $r * 2, $green);

    $cx = $sz / 2;

    // ── Stem ──────────────────────────────────────────────────────────────────
    $sw   = max(3, (int)($sz * 0.063));  // stem width
    $sTop = (int)($sz * 0.332);
    $sBot = (int)($sz * 0.773);
    imagefilledrectangle($img, (int)($cx - $sw / 2), $sTop,
                               (int)($cx + $sw / 2), $sBot, $white);

    // ── Wheat ear (central + two side grains) ─────────────────────────────────
    $gW = (int)($sz * 0.102);  $gH = (int)($sz * 0.156);  // centre grain
    $eW = (int)($sz * 0.078);  $eH = (int)($sz * 0.117);  // side grain
    $gy  = (int)($sz * 0.289);

    // centre
    imagefilledellipse($img, (int)$cx, $gy, $gW, $gH, $white);
    // left
    imagefilledellipse($img, (int)($cx - $sz * 0.078), (int)($sz * 0.328),
                             $eW, $eH, $white);
    // right
    imagefilledellipse($img, (int)($cx + $sz * 0.078), (int)($sz * 0.328),
                             $eW, $eH, $white);
    // lower-left
    imagefilledellipse($img, (int)($cx - $sz * 0.094), (int)($sz * 0.387),
                             $eW, $eH, $white);
    // lower-right
    imagefilledellipse($img, (int)($cx + $sz * 0.094), (int)($sz * 0.387),
                             $eW, $eH, $white);

    // ── Left leaf ─────────────────────────────────────────────────────────────
    $lp = [
        (int)$cx,              (int)($sz * 0.574),
        (int)($cx - $sz*0.16), (int)($sz * 0.496),
        (int)($cx - $sz*0.32), (int)($sz * 0.543),
        (int)($cx - $sz*0.32), (int)($sz * 0.625),
        (int)($cx - $sz*0.16), (int)($sz * 0.625),
    ];
    imagefilledpolygon($img, $lp, 5, $white);

    // ── Right leaf ────────────────────────────────────────────────────────────
    $rp = [
        (int)$cx,              (int)($sz * 0.488),
        (int)($cx + $sz*0.16), (int)($sz * 0.410),
        (int)($cx + $sz*0.32), (int)($sz * 0.457),
        (int)($cx + $sz*0.32), (int)($sz * 0.543),
        (int)($cx + $sz*0.16), (int)($sz * 0.535),
    ];
    imagefilledpolygon($img, $rp, 5, $white);

    // ── Roots (only at ≥48px) ─────────────────────────────────────────────────
    if ($sz >= 48) {
        $rw  = max(2, (int)($sz * 0.043));
        $ry0 = (int)($sz * 0.773);
        $ry1 = (int)($sz * 0.859);
        $lx0 = (int)($cx - $sz * 0.043);
        $lx1 = (int)($cx - $sz * 0.176);
        $rox0 = (int)($cx + $sz * 0.043);
        $rox1 = (int)($cx + $sz * 0.176);

        imagefilledpolygon($img, [
            $lx0,        $ry0,
            $lx0 - $rw,  $ry0,
            $lx1 - $rw,  $ry1,
            $lx1,        $ry1,
        ], 4, $white);

        imagefilledpolygon($img, [
            $rox0,       $ry0,
            $rox0 + $rw, $ry0,
            $rox1 + $rw, $ry1,
            $rox1,       $ry1,
        ], 4, $white);
    }

    return $img;
}

$outDir = __DIR__ . '/assets/icons';
if (!is_dir($outDir)) mkdir($outDir, 0755, true);

$sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

foreach ($sizes as $sz) {
    $img  = draw_agro_icon($sz);
    $file = "$outDir/icon-{$sz}x{$sz}.png";
    imagepng($img, $file, 9);
    imagedestroy($img);
    echo "  ✅ icon-{$sz}x{$sz}.png\n";
}

// Named aliases expected by index.html
copy("$outDir/icon-32x32.png",  "$outDir/favicon-32x32.png");
copy("$outDir/icon-16x16.png",  "$outDir/favicon-16x16.png");
copy("$outDir/icon-192x192.png", "$outDir/icon-192.png");

// Shortcut icons (use 96px base, just copy)
copy("$outDir/icon-96x96.png", "$outDir/weather-96x96.png");
copy("$outDir/icon-96x96.png", "$outDir/prices-96x96.png");
copy("$outDir/icon-96x96.png", "$outDir/sellers-96x96.png");
copy("$outDir/icon-96x96.png", "$outDir/buyers-96x96.png");

// favicon.ico — embed the 32x32 PNG (simple approach: just copy .png as .ico)
// Browsers accept PNG-encoded .ico files
copy("$outDir/icon-32x32.png", "$outDir/favicon.ico");

echo "\nAll icons generated.\n";
