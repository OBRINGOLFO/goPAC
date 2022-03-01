<?php
echo "<pre>";
    define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);
    define('PATH_ADD',              ROOT_DIR.'/add');
    define('PATH_RESPALDOS',        ROOT_DIR.'/respaldos');
    define('PATH_CACHE',            ROOT_DIR.'/temp/cache');


    $uid_empresa = '1C553458-28AF-4F99-AD83-095C0EFA3206';
    //Configurando valores de trabajo
    $source = PATH_RESPALDOS . "/" . $uid_empresa . "/" . "Bkp_158002F72BF5_2022-02-23T20.23.24.tar.gz";
    $add_folder = PATH_ADD.'/'.$uid_empresa;
    //Generando TOKEN para descomprimir
    //$token = openssl_random_pseudo_bytes(16);
    //$token = bin2hex($token);
    //Verificando existencia de ADD destino
    if(!file_exists($add_folder)){
        mkdir($add_folder);
    }

    //$tmp_folder = PATH_CACHE . "/" . $token;
    //Verificando existencia del directorio temporal
    //if(!file_exists($tmp_folder)){
    //    mkdir($tmp_folder);
    //}

    $xComprimido = new PharData($source);
    $xComprimido->extractTo($add_folder, null, true);
    $sql_folder = $add_folder."/database";
    echo "\n".$sql_folder;
    if(file_exists($sql_folder)){
        $archivos = array_diff(scandir($sql_folder), array('.', '..')); 
        foreach($archivos as $indice => $nombre){
            $extension = pathinfo($nombre, PATHINFO_EXTENSION);
            echo "\n".$extension;
            if($extension == 'sql'){
                echo "\nEncontrado: ". $nombre;
            }
        }
    }




















echo "\n\nterminado...";
/*
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
*/
  
echo "</pre>";
?>