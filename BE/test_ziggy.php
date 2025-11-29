<?php
require __DIR__ . '/vendor/autoload.php';

if (class_exists(\Tighten\Ziggy\Ziggy::class)) {
    echo "Ziggy found with Tighten namespace!";
} elseif (class_exists(\Tightenco\Ziggy\Ziggy::class)) {
    echo "Ziggy found with Tightenco namespace!";
} else {
    echo "Ziggy NOT found with either namespace!";
}
