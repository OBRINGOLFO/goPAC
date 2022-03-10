<?php
echo "<pre>";

$cad = '$2y$10$ulvRCEqR5uBJbWGALzcFHOr2dq1cXswSsrcgflVG5Rgkq6ECfGk3C';
//--------------------------------
$cad_hex = bin2hex($cad);
echo "\nHEX: ".$cad_hex;
//--------------------------------
$cad_str = hex2bin($cad_hex);
echo "\nSTR: ".$cad_str;
  
echo "</pre>";
?>