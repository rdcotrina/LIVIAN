<?php

namespace System\Models;

class InitModel extends \Vendor\DataBase{
    
    protected $_form;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post(['txtUser','txtClave'])->decrypt;
    }
    
    protected function login() {      
        $query = "CALL sp_sisLogin (:flag,:usuario,:clave) ; ";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':usuario' => $this->_form->txtUser,
            ':clave' => $this->_form->txtClave.APP_PASS_KEY		
        ];

        return $this->getRow($query, $parms);
    }
    
}
