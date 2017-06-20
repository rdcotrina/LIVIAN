<?php

namespace System\Controllers;

use \Vendor\Controller;

class MenuController extends \System\Models\MenuModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* se ejecuta el constructor del MODEL */
        $this->__cConstruct();  /* se ejecuta el constructor del CONTROLLER */
    }
    
    public function index() {}
    
    public function postNewMenu() {
        echo 90;
    }
    
}

