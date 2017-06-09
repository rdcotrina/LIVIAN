<?php

define('DEFAULT_LAYOUT','default');
define('APP_COMPANY','LIVIAN');

require_once ROOT . 'config' . DS . 'loads' . DS . 'LoadVendor.php';
require_once ROOT . 'config' . DS . 'loads' . DS . 'LoadLibs.php';

use Vendor\Obj;

/*
 *  Clase que almacenara todos los namespaces
 */

class NP {

    private $_data = [];

    public function __set($name, $value) {
        $this->_data[$name] = $value;
    }

    public function __get($name) {
        if (isset($this->_data[$name])) {
            return $this->_data[$name]();
        } else {
            return false;
        }
    }

}


$NP = new NP();

/*
 * Agregando metodo para el namescpace VENDOR
 */
$NP->Vendor = function(){
    return Obj::run('Vendor');
};

/*funcion global que devuelve variable global que contiene la CLASE que retorna los OBJETOS por NAMESPACE*/
function Obj(){
    return $GLOBALS['NP'];
}



