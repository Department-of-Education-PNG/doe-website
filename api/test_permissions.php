<?php
$target = '../uploads/gallery/test_write.txt';
if (file_put_contents($target, 'test')) {
    echo "SUCCESS: Wrote to $target";
    unlink($target);
} else {
    echo "FAILURE: Could not write to $target";
    $error = error_get_last();
    echo "\nError: " . $error['message'];
}
