<?php
echo "<pre>";
define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);
define('PATH_ADD',              ROOT_DIR.'/add');
define('PATH_RESPALDOS',        ROOT_DIR.'/respaldos');

    $nombre_respaldo = PATH_RESPALDOS . '/archivo1.tar';

    $add_path = PATH_ADD . '/5E0AC1A2-79A8-447C-93F5-158002F72BF5';
    $db_file = 'Bkp_158002F72BF5_2022-02-21T20.33.23.800Z.sql.gz';
    $db_path = PATH_RESPALDOS . '/5E0AC1A2-79A8-447C-93F5-158002F72BF5' . '/' . $db_file;

    $xIterador =  new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($add_path, FilesystemIterator::SKIP_DOTS)
      );    

    foreach ($xIterador as $file) {
        echo " ├ $file\n";
    }    
    
    $xComprimido = new PharData($nombre_respaldo);
    $xComprimido->buildFromIterator($xIterador, $add_path);
    $xComprimido->addFile($db_path, 'sql/'.$db_file);
    $xComprimido->compress(Phar::GZ);
    unlink($nombre_respaldo);

  
echo "</pre>";
?>