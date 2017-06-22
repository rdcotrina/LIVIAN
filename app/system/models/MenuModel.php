<?php

namespace System\Models;

class MenuModel extends \Vendor\DataBase {

    protected $_form;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
    }

    protected function mantenimiento() {

        if (empty($flag)) {
            $flag = $this->_form->_flag;
            $user = $this->_form->txtUser;
            $pass = $this->_form->txtClave . APP_PASS_KEY;
        }

        $query = "CALL sp_mnuMantenimiento (:flag,:usuario,:clave) ; ";
        $parms = [
            ':flag' => $flag,
            ':usuario' => $user,
            ':clave' => $pass
        ];

        if ($flag == 1) {
            return $this->getRow($query, $parms);   /* devuelve un registro */
        } else {
            return $this->getRows($query, $parms);  /* devuelve varios registros */
        }
    }

    protected function dataMenu() {

        $query = "
        SELECT 
            m.id_menu,
            m.parent,
            m.nmenu,
            m.alias,
            m.evt_ajax,
            m.activo
        FROM app_menu m
        WHERE m.eliminado = '0'
        ORDER BY m.orden;";
        
        $parms = [];

        return $this->getRows($query, $parms);  /* devuelve varios registros */
    }

}
