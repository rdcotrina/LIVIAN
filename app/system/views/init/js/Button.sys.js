"use strict";
(function ($) {

    let BTNSYSCTXT = [];    /*los botones con texto*/
    let BTNSYSSTXT = [];    /*los botones sin texto*/

    $.fn.extend({

        buttonsys: function (opt) {

            let defaults = {
                data: [],
                notext: false               /*indica que se retornara el boton con sus descripcion*/,
                ajax: null,                 /*evento js que se aplicara al boton*/
                evts: ['click']             /*los tipos de events que se aplicara al boton*/
            };

            var options = $.extend(defaults, opt);
            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {

                createButton: function (oSettings) {
                    let v = oSettings.data;
                    let b = `<button id="BCTXT_${v.alias + v.alias_btn}" type="button" class="${v.css}"><i class="${v.icono}"></i> ${Tools.traslate(v.nboton)}</button>`;
                    BTNSYSCTXT.push({kkey: v.alias + v.alias_btn, btn: b});

                    b = `<button id="BSTXT_${v.alias + v.alias_btn}" type="button" class="${v.css}" title="${Tools.traslate(v.nboton)}"><i class="${v.icono}"></i></button>`;
                    BTNSYSSTXT.push({kkey: v.alias + v.alias_btn, btn: b});
                }

            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/

            return this.each(function () {

                var oSettings = options;

                let method = {

                    init: function () {
                        _private.createButton(oSettings);
                    }

                };

                method.init.call(this);


            });
        }

    });

})(jQuery);