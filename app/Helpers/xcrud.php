<?php
require_once(app_path(). '/../public/xcrud/xcrud.php');
if(!function_exists('Xcrud_get_instance')) {
    function Xcrud_get_instance($name = false){
        return Xcrud::get_instance($name);
    }
}
?>
