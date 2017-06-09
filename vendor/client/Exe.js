"use strict"
class Exe_ {
    
    constructor() {
        /*aqui metodos privados*/
        this._includesArray = {};           /*almacena todos los script incluidos*/
        this._callback = null;              /*almacena el callback de cada require*/
        
        /*
         * crea y agrega el script requerido
         */
        this._createScript = function(requires){
            let obj      = this;
            let callback = obj._callback;
            let scriptId = requires.replace(/\//g, "");             /*se quita los / */
            let myRand   = parseInt(Math.random() * 999999999999999);
            let body     = document.getElementsByTagName('body')[0];
            
            let script   = document.createElement('script');
            script.type  = 'text/javascript';
            script.id    = 'script_' + scriptId;
            script.async = 'async';
            script.src   = requires + '.js?' + myRand;
           
            let onCallback = function () {
                if ($.isFunction(callback)) {
                    callback();
                }

                let pos  = requires.lastIndexOf('/') + 1;
                let file = requires.substr(pos);
                
                /*despues que carga el modelo se debe ejecutar el Controller*/
                if (file.search('Model') > 0) {
                    let f = file.substr(0, file.length - 5)+'Controller';                               
                    obj._builtPrototype(f);
                }
            };
            
            script.onload = onCallback;

            body.appendChild(script);
            
            /*elimina script incluido del HTML*/
            $('#script_' + scriptId).remove();
        
            this._callback = null; /*se limpia callback*/
        };
        
        this._builtPrototype = function (obj) {
            setTimeout(function(){
                /*agrego obj como prototipo a Exe*/
                let sc  = 'Exe_.prototype.' + obj + ' = new ' + obj + '_();';

                eval(sc);
            },100);
        };
    
        /*
         * Crea la ruta del js a incluir
         */
        this._root = function(namespace,cadena){
           // let lnfile = (cadena.search('Controller') > 0)?4:5; /*Controller == 10   Model == 5*/
            let module = namespace;
            let opcion = cadena;
            
            let Controller   = opcion+'Controller';
            let model  = opcion+'Model';
          
            let folder = opcion.toLowerCase();         /*carpeta dentro de /views/ */
            
            let rootV   = 'app/'+module+'/views/'+folder+'/js/'+Controller;    /*ruta del Controller.js a incluir*/
            let rootM   = 'app/'+module+'/views/'+folder+'/js/'+model;    /*ruta del Model.js a incluir*/
            
            return {rootView:rootV,rootModel:rootM};
        };
        
        /*
         * incluye un script desde una cadena:: config/lang/js/lang_ES
         */
        this._requireString = function(requires){
            /*se verifica si ya se incluyo*/
            if(!this._includesArray[requires]){
                this._includesArray[requires] = true; /*se registra como incluido*/
                this._createScript(requires);   /*se crea el include*/
            }
        };
        
        this._requireArray = function(requires){
            let obj  = this;
            let root = '';
            
            if($.isArray(requires)){
                /*array: [{sistema: 'LoginView'}]*/
                requires.forEach((i,v)=>{
                    $.each(i,function(a,b){
                        root = obj._root(a,b);
                        obj._requireString(root.rootModel);
                        setTimeout(function(){
                            obj._requireString(root.rootView);
                        },50);
                    });
                });
            }else{
                /*array: {sistema: 'main::LoginView'}*/
                $.each(requires,function(a,b){
                    root = obj._root(a,b);
                    obj._requireString(root.rootModel);
                    setTimeout(function(){
                        obj._requireString(root.rootView);
                    },50);
                });
            }
        };
    }
    
    require(requires,callback = null){
        this._callback = callback;
        switch(typeof requires){
            case 'string':
                /*se incluye js desde un string*/
                this._requireString(requires);
                break;
            case 'object':
                /*se incluye js desde un array*/
                this._requireArray(requires);
                break;
        }
    }
    
}
const Exe = new Exe_();
