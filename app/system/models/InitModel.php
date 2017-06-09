<?php

namespace System\Models;

class InitModel extends \Vendor\DataBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    protected function mp(){
        echo 'metodo desde indexmodel';
    }
    
}
