<?php

namespace System\Models;

class InitModel extends \Vendor\DataBase{
    
    protected $_form;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post(['txtUser','txtClave'])->decrypt;
    }
    
    protected function login($flag = '',$user = '', $pass = '') {      
        
        if(empty($flag)){
            $flag = $this->_form->_flag;
            $user = $this->_form->txtUser;
            $pass = $this->_form->txtClave.APP_PASS_KEY;
        }
        
        $query = "CALL sp_sisLogin (:flag,:usuario,:clave) ; ";
        $parms = [
            ':flag' => $flag,
            ':usuario' => $user,
            ':clave' => $pass		
        ];
        
        if($flag == 1){
            return $this->getRow($query, $parms);   /*devuelve un registro*/
        } else {
            return $this->getRows($query, $parms);  /*devuelve varios registros*/
        }
        
    }
    
}
