"use strict";
(function ($) {

    let BTNSYSCTXT = [];    /*los botones con texto*/
    let BTNSYSSTXT = [];    /*los botones sin texto*/

    $.fn.extend({

        buttonsys: function (opt) {

            let defaults = {
                data: []
            };

            var options = $.extend(defaults, opt);
            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {

                createButton: function (oSettings) {
                    let v = oSettings.data;
                    let b = `<button id="BCTXT_${v.alias + v.alias_btn}" type="button" class="${v.css}"><i class="${v.icono}"></i> ${Tools.traslate(v.nboton)}</button>`;
                    BTNSYSCTXT.push({keymnu: v.alias, keybtn: v.alias_btn, btn: b});

                    b = `<button id="BSTXT_${v.alias + v.alias_btn}" type="button" class="${v.css}" title="${Tools.traslate(v.nboton)}"><i class="${v.icono}"></i></button>`;
                    BTNSYSSTXT.push({keymnu: v.alias, keybtn: v.alias_btn, btn: b});
                }

            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/

            return this.each(function () {

                var oSettings = options;

                let method = {

                    init: function () {
                        if (oSettings.data.length > 0) {
                            /*almacenando los botones*/
                            _private.createButton(oSettings);
                        } else {
                            /*devuelve boton requerido*/
                        }
                    }

                };

                method.init.call(this);


            });
        },

        getButtonsys: function (opt) {

            let defaults = {
                keymnu: null, /*alias del menu*/
                keybtn: [], /*alias de los botones*/
                notext: false               /*indica que se retornara el boton con sus descripcion*/,
                ajax: null, /*evento js que se aplicara al boton*/
                evts: ['click']             /*los tipos de events que se aplicara al boton*/
            };

            var options = $.extend(defaults, opt);
            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {

            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/


            var oSettings = options;

            if(typeof oSettings.keybtn === 'string'){           /*es una cadena, se requiere un boton*/
                
            }else if(typeof oSettings.keybtn === 'object'){     /*es un array []*/
                if(oSettings.keybtn.length === 1){  /*se requiere un boton*/
                    
                }else{                              /*se requiere varios botones*/
                    
                }
            }
            


        }

    });

})(jQuery);