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
            Obj()->Vendor->View->render('index', false);
        } else {
            Obj()->Vendor->View->render('login', false);
        }
    }
    
    public function postLogin() {
        $data = $this->login();
        
        if(count($data) > 1){
            Obj()->Vendor->Session->set('sys_isLogin',1);
            
            $data['id_usuario'] = Obj()->Vendor->Tools->encrypt($data['id_usuario']);
            $data['id_persona'] = Obj()->Vendor->Tools->encrypt($data['id_persona']);

            echo json_encode(['result'=>1,'data'=>$data]);
        }else{
            echo json_encode(['result'=>2,'data'=>[]]);
        }
    }

}
