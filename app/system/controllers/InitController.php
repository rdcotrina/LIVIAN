<?php

namespace System\Controllers;

use \Vendor\Controller;

class InitController extends \System\Models\InitModel {

    use Controller {
        Controller::__construct as private __cConstruct;
    }

    public function __construct() {
        parent::__construct();  /* se ejecuta el constructor del MODEL */
        $this->__cConstruct();  /* se ejecuta el constructor del CONTROLLER */
    }

    public function index() {
        if (Obj()->Vendor->Session->get('sys_isLogin')) {
            /* obteniendo roles de usuario */
            $this->_getRolesUser();

            /* obteniendo el menu del usuario */
            $this->_getMenuUser();

            Obj()->Vendor->View->render('index', false);
        } else {
            Obj()->Vendor->View->render('login', false);
        }
    }

    public function postLogin() {
        $data = $this->login();

        if (count($data) > 1) {
            /*
             * Sessiones para el sistema
             */
            Obj()->Vendor->Session->set('sys_isLogin', 1);
            Obj()->Vendor->Session->set('sys_nameUser', $data['nombre_completo']);
            Obj()->Vendor->Session->set('sys_idUsuario', $data['id_usuario']);
            Obj()->Vendor->Session->set('sys_idPersona', $data['id_persona']);
            Obj()->Vendor->Session->set('sys_navegador', $_SERVER['HTTP_USER_AGENT']);
            Obj()->Vendor->Session->set('sys_ipPublica', $_SERVER['REMOTE_ADDR']);
            Obj()->Vendor->Session->set('sys_ipLocal', $this->_form->_ipLocal);
            Obj()->Vendor->Session->set('sys_hostName', gethostbyaddr($_SERVER['REMOTE_ADDR']));

            /* servira para javascript */
            Obj()->Vendor->Session->set('sys_idUsuarioEncrypt', Obj()->Vendor->Tools->encrypt($data['id_usuario']));
            Obj()->Vendor->Session->set('sys_idPersonaEncrypt', Obj()->Vendor->Tools->encrypt($data['id_persona']));

            /* grabando ultimo acceso al sistema */
            $this->login(3, $data['id_usuario']);

            echo json_encode(['result' => 1, 'data' => $data]);
        } else {
            echo json_encode(['result' => 2, 'data' => []]);
        }
    }

    public function logOut() {
        Obj()->Vendor->Session->destroy();
        echo json_encode(['result' => 1]);
    }

    private function _getMenuUser() {
        $data = $this->login(4, Obj()->Vendor->Session->get('sys_defaultIdRol'));
        Obj()->Vendor->Session->set('sys_menuUser', $data);
    }

    private function _getRolesUser() {
        /* obteniendo los roles y cargando rol por defecto */
        $dataRol = $this->login(2, Obj()->Vendor->Session->get('sys_idUsuario'));

        Obj()->Vendor->Session->set('sys_roles', $dataRol);
        Obj()->Vendor->Session->set('sys_defaultIdRol', $dataRol[0]['id_rol']);
        Obj()->Vendor->Session->set('sys_defaultNameRol', $dataRol[0]['nrol']);
    }

}
