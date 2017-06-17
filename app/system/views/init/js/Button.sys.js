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

                    b = `<button id="BSTXT_${v.alias + v.alias_btn}" type="button" class="${v.css}" title="${Tools.traslate(v.nboton)}" data-style="expand-right"><i class="${v.icono}"></i></button>`;
                    BTNSYSSTXT.push({keymnu: v.alias, keybtn: v.alias_btn, btn: b});
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
        },

        getButtonsys: function (opt, callback = null) {

            let defaults = {
                keymnu: null, /*alias del menu*/
                btns: [], /*botones*/
                notext: false, /*indica que se retornara el boton con sus descripcion*/
                container: null
            };

            var options = $.extend(defaults, opt);
            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {

                render: function (oSettings) {
                    let data = (oSettings.notext) ? BTNSYSSTXT : BTNSYSCTXT;
                    let idbtn = (oSettings.notext) ? 'BSTXT_' : 'BCTXT_';
                    let typebtn = null;

                    /*recorrido de botones requeridos*/
                    $.each(oSettings.btns, function (i, v) {
                        typebtn = (v.type == undefined) ? 'button' : v.type;

                        /*recorrido de todos botones generados*/
                        $.each(data, function (ii, vv) {
                            if (oSettings.keymnu == vv.keymnu && v.keybtn == vv.keybtn) {
                                $(oSettings.container).append(vv.btn);

                                /*agregar type de boton*/
                                $(`#${idbtn}${oSettings.keymnu}${vv.keybtn}`).attr('type',typebtn);

                                /*recorrido de eventos*/
                                $.each(v.evts, function (a, b) {
                                    $.each(b, function (x, y) {
                                        eval(`
                                            $('#${idbtn}${oSettings.keymnu}${vv.keybtn}').${x}(function(){
                                                ${y}
                                            });
                                        `);
                                    });
                                });
                            }
                        });
                    });

                    if (typeof callback === 'function') {
                        callback();
                    }
                }

            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/

            var oSettings = options;

            _private.render(oSettings);

        }

    });

})(jQuery);