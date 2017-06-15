"use strict";
(function ($) {

    $.fn.extend({

        initMenu: function (opt) {

            let defaults = {
                data: []
            };

            var options = $.extend(defaults, opt);

            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {
                
                traslation: function(text){
                    let lang = localStorage.getItem('sys_lang');
                    let t1 = text.split(',');
                    let t2 = null;
                    let t3 = null;
                    
                    $.each(t1,function(i,v){
                        t2 = v.split('-');
                        
                        if(lang == t2[0]){
                            t3 = t2[1];
                        }
                    });
                    
                    return t3;
                },
                
                subItem: function(id_menu,oSettings){
                    let li = null, cont = [];
                    $.each(oSettings.data, function (i, v) {
                        if(v.parent == id_menu){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                li = `
                                <li id="li_${v.id_menu}">
                                    <a href="javascript:;">${_private.traslation(v.nmenu)}</a>`;
                                    if(v.evt_ajax == 'not'){
                                        li += `<ul id="mnu_${v.id_menu}"></ul>`;
                                    }
                                li += `
                                </li>`;
                                cont.push(v.id_menu);
                                $(`#mnu_${id_menu}`).append(li);
                                
                                if(v.evt_ajax != 'not'){
                                    $(`#li_${v.id_menu}`).find('a').click(function(){
                                        eval(v.evt_ajax);
                                    });
                                }else{
                                    /*si no tiene evento ajax, entonces tine subniveles*/
                                    _private.subItem(v.id_menu,oSettings);
                                }
                            }
                        }
                    });
                    
                },

                render: function (oSettings) {
                    var li = null, t = this, cont = [];
                    $.each(oSettings.data, function (i, v) {
                        /*nivel inicial sin evento, tiene subniveles*/
                        if(v.parent == 0 && v.evt_ajax == 'not'){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                li = `
                                <li>
                                    <a href="javascript:;">${_private.traslation(v.nmenu)}</a>
                                    <ul id="mnu_${v.id_menu}"></ul>
                                </li>`;
                                cont.push(v.id_menu);
                                
                                $(t).append(li);
                                _private.subItem(v.id_menu,oSettings);
                            }
                        }
                       
                        /*nivel inicial con evento, no tiene subniveles*/
                        if(v.parent == 0 && v.evt_ajax != 'not'){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                li = `<li id="li_${v.id_menu}">
                                        <a href="javascript:;">${_private.traslation(v.nmenu)}</a>
                                    </li>`;
                                cont.push(v.id_menu);
                                
                                $(t).append(li);
                                
                                $(`#li_${v.id_menu}`).find('a').click(function(){
                                    eval(v.evt_ajax);
                                });
                            }
                        }
                    });
                    
                }

            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/

            return this.each(function () {

                var oSettings = options;

                let method = {

                    init: function () {

                        _private.render.call(this, oSettings);

                    }

                };

                method.init.call(this);


            });

        }

    });

})(jQuery);