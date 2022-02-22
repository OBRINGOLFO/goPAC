<?php
echo "<pre>";
define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);
define('PATH_ADD',              ROOT_DIR.'/add');
define('PATH_RESPALDOS',        ROOT_DIR.'/respaldos');

    $archive_name = PATH_RESPALDOS . '/archivo1.tar';

    $add_path = PATH_ADD . '/5E0AC1A2-79A8-447C-93F5-158002F72BF5';
    $db_file = 'Bkp_158002F72BF5_2022-02-21T20.33.23.800Z.sql.gz';
    $db_path = PATH_RESPALDOS . '/5E0AC1A2-79A8-447C-93F5-158002F72BF5' . '/' . $db_file;


    //Procesando el ADD
    $ficheros = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($add_path));
    $rel_string = '';
    foreach ($ficheros as $f) {
        echo "\nProcesando: ".$f->getPath();
        if ( !$f->isDir() ) {
            $dir_NAMES = explode("/", $f->getPath());
            $dir_ADD = array_search("add", $dir_NAMES);
            echo "add encontrado en posicion: ".$dir_ADD;
            if($dir_ADD){
                echo "\n\nMostrando dir_NAMES\n"; print_r($dir_NAMES);

                $rel_path = array_slice($dir_NAMES, $dir_ADD+2, count($dir_NAMES));
                echo "\n\nMostrando rel_path\n"; print_r($rel_path);
                foreach ($rel_path as $rel_key => $rel_val) {
                    //echo "** | ". $rel_path ." -> ". $rel_key ." => ". $rel_val;
                    $rel_string += "/" . $rel_path[0];
                }
                echo $rel_string . "\n";
                $dir_NAME = (string) end($dir_NAMES);
                //echo $dir_NAME." / ".$f->getFilename()."\n";    
            }
        }else{
            //echo "Directorio detectado: " . f->getFilename();
        }
    }


//    $archive = new PharData($archive_name);
//    $archive->buildFromDirectory($add_path);
//    $archive->addFile($db_path, 'sql/'.$db_file);
//    $archive->compress(Phar::GZ);
//    unlink($archive_name);



echo "</pre>";
?>