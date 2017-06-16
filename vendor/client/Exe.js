"use strict";
class Exe_ {

    constructor() {
        /*aqui metodos privados*/
        this._includesArray = {};           /*almacena todos los script incluidos*/
        this._callback = null;              /*almacena el callback de cada require*/
        this._title = null;
        this._rooot = null;
        this._alias = null;
        
        this._esxtraxtFile = function(requires){
            let pos = requires.lastIndexOf('/') + 1;
            return requires.substr(pos);
        };

        /*
         * crea y agrega el script requerido
         */
        this._createScript = function (requires) {
            let obj = this;
            let callback = obj._callback;
            let scriptId = requires.replace(/\//g, "");             /*se quita los / */
            let myRand = parseInt(Math.random() * 999999999999999);
            let body = document.getElementsByTagName('body')[0];

            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'script_' + scriptId;
            script.async = 'async';
            script.src = requires + '.js?' + myRand;

            let onCallback = function () {
                if ($.isFunction(callback)) {
                    callback();
                }

//                let pos = requires.lastIndexOf('/') + 1;
//                let file = requires.substr(pos);
                let file = obj._esxtraxtFile(requires);

                /*despues que carga el ajax se debe ejecutar el DOM*/
                if (file.search('Ajax') > 0) {
                    let f = file.substr(0, file.length - 4) + 'Dom';
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
            setTimeout(function () {
                /*agrego obj como prototipo a Exe*/
                let sc = `
                    console.log('[${obj}] cargado.');
                    Exe_.prototype.${obj} = new ${obj}_(); 
                    console.log('[${obj}] instanciado.');
                    Exe.${obj}.main();
                    console.log('[Exe.${obj}.main()] ejecutado.');
                `;

                eval(sc);
            }, 400); /*se le da un tiempo de 400 milisegundos porque en mozilla generaba error con el Dom_.js*/
        };

        /*
         * Crea la ruta del js a incluir
         */
        this._root = function (namespace, cadena) {
            let module = namespace;
            let opcion = cadena;

            let dom = opcion + 'Dom';
            let ajax = opcion + 'Ajax';

            let folder = opcion.toLowerCase();         /*carpeta dentro de /views/ */

            let rootD = 'app/' + module + '/views/' + folder + '/js/' + dom;    /*ruta del Dom.js a incluir*/
            let rootA = 'app/' + module + '/views/' + folder + '/js/' + ajax;    /*ruta del Ajax.js a incluir*/

            return {rootDom: rootD, rootAjax: rootA};
        };

        /*
         * incluye un script desde una cadena:: config/lang/js/lang_ES
         */
        this._requireString = function (requires) {
            /*se verifica si ya se incluyo*/
            if(!this._includesArray[requires]){ /*EN DESARROLLO DEBE PERMITIR VOLER A CARGAR LOS JS---EN PRODUCCION SE DEBE ESCOMENTAR EL if{}*/
                this._includesArray[requires] = true; /*se registra como incluido*/
                this._createScript(requires);   /*se crea el include*/
            }else{
                let file = this._esxtraxtFile(requires);

                /*despues que carga el ajax se debe ejecutar el DOM*/
                if (file.search('Ajax') > 0) {
                    let obj = file.substr(0, file.length - 4) + 'Dom';
                    let sc = `
                        Exe.${obj}.main();
                        console.log('[Exe.${obj}.main()] ejecutado.');
                    `;

                    eval(sc);
                }
            }
        };

        this._requireArray = function (requires) {
            let obj = this;
            let root = '';

            if ($.isArray(requires)) {
                /*array: [{system: 'Init'}]*/
                requires.forEach((i, v) => {
                    $.each(i, function (a, b) {
                        root = obj._root(a, b);
                        obj._requireString(root.rootAjax);
                        setTimeout(function () {
                            obj._requireString(root.rootDom);
                        }, 50);
                    });
                });
            } else {
                /*array: {system: 'Init'}*/
                $.each(requires, function (a, b) {
                    root = obj._root(a, b);
                    obj._requireString(root.rootAjax);
                    setTimeout(function () {
                        obj._requireString(root.rootDom);
                    }, 50);
                });
            }
        };
    }

    require(requires, callback = null) {
        if ($.isFunction(callback)) {
            this._callback = callback;
        } else {
            this._title = $.trim($(callback).find('.text-menu-sm').html());
            this._rooot = $.trim($(callback).data('root'));
            this._alias = $.trim($(callback).data('a'));
        }

        switch (typeof requires) {
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
    
    getTitle(){
        return this._title;
    }
    
    getRoot(){
        return this._rooot;
    }
    
    getAlias(){
        return this._alias;
    }

}
const Exe = new Exe_();
