<?php

define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);
define('PATH_ADD',              ROOT_DIR.'/add');
define('PATH_RESPALDOS',        ROOT_DIR.'/respaldos');

    $archive_name = PATH_RESPALDOS . '/archivo1.tar';
    $dir_path = PATH_ADD . '/5E0AC1A2-79A8-447C-93F5-158002F72BF5';

    $archive = new PharData($archive_name);
    $archive->buildFromDirectory($dir_path);
    $archive->compress(Phar::GZ);
    unlink($archive_name);

?>