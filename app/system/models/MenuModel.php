<?php

namespace System\Models;

class MenuModel extends \Vendor\DataBase {

    protected $_form;
    
    private $_usurio;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();

        $this->_usurio = Obj()->Vendor->Session->get('sys_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('sys_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('sys_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('sys_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('sys_hostName');
    }

    protected function mantenimiento() {
        
        $query = "CALL sp_mnuMantenimiento (:flag,:key,:parent,:nmenu,:alias,:js,:activo,:usuario,:ipPublica,:ipLocal,:navegador,:hostname) ; ";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':key' => (isset($this->_form->_pkMenu))?$this->_form->_pkMenu:'',
            ':parent' => $this->_form->_parent,
            ':nmenu' => $this->_form->MNUtxt_descripcion,
            ':alias' => $this->_form->MNUtxt_alias,
            ':js' => $this->_form->MNUtxt_ajax,
            ':activo' => $this->_form->MNUchk_activo,
            ':usuario' => $this->_usurio,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
       
        return $this->getRow($query, $parms);   /* devuelve un registro */
    }

}
