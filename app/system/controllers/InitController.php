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
//        $this->import(['system' => 'Login']);
    }

    public function index() {
//        if (Obj()->Vendor->Session->get('sys_isLogin')) {
            Obj()->Vendor->View->render('index', false);
//        } else {
//            Obj()->Vendor->View->render('login', false);
//        }
    }

}
