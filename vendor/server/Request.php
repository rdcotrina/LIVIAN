<?php

namespace Vendor;

use stdClass;

class Request {

    private $_module;
    private $_controller;
    private $_method;
    private $_args;

    public function __construct() {
        if (isset($_GET['ruta'])) {
            $url = $_GET['ruta'];
            $url = array_filter(explode('/', $url));

            $this->_module = strtolower(array_shift($url));         #el nombre de la carpeta de los modulos deben estar en minusculas
            $this->_controller = array_shift($url);
            $this->_method = array_shift($url);
            $this->_args = $url;
        }

        if (!$this->_module) {
            $this->_module = DEFAULT_MODULE;
        }

        if (!$this->_controller) {
            $this->_controller = DEFAULT_CONTROLLER;
        }

        if (!$this->_method) {
            $this->_method = DEFAULT_METHOD;
        }

        if (!$this->_args) {
            $this->_args = [];
        }
    }

    public function getModule() {
        return $this->_module;
    }

    public function getController() {
        return $this->_controller;
    }

    public function getMethod() {
        return $this->_method;
    }

    public function getArgs() {
        return $this->_args;
    }

}
