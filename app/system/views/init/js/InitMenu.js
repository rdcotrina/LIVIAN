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
                
                buildButton: function(selfmenu){
                    $.each(selfmenu,function(i,v){
                        $(this).buttonsys({
                            data: v
                        });
                    });
                },
                /*
                 * Crea los subniveles del menu
                 * @param {type} id_menu
                 * @param {type} oSettings
                 * @returns {undefined}
                 */
                subItem: function(id_menu,oSettings,root){
                    let li = null, cont = [], selfmenu = [], name = null, rot = root, icon = null, sp = null;
                    $.each(oSettings.data, function (i, v) {
                        if(v.parent == id_menu){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                name = Tools.traslate(v.nmenu);
                                rot = `${root} / ${name}`;
                                
                                icon = (v.evt_ajax != 'not')?'fa fa-bars':'fa fa-folder-open';
                                sp = (v.evt_ajax != 'not')?'&nbsp;':'';
                                
                                li = `
                                <li id="li_${v.id_menu}">
                                    <a href="javascript:;" data-root="${rot}"><i class="${icon}" style="color:#f8ac59;"></i><div class="line-vertical"></div>&nbsp;${sp} <span class="text-menu-sm">${name}</span></a>`;
                                    if(v.evt_ajax == 'not'){
                                        li += `<ul id="mnu_${v.id_menu}"></ul>`;
                                    }
                                li += `
                                </li>`;
                                cont.push(v.id_menu);
                                $(`#mnu_${id_menu}`).append(li);
                                
                                if(v.evt_ajax != 'not'){
                                    
                                    $(`#li_${v.id_menu}`).find('a').data('a',v.alias);
                                    
                                    $(`#li_${v.id_menu}`).find('a').click(function(){
                                        eval(v.evt_ajax);
                                    });
                                    selfmenu = $.grep(oSettings.data, function (e) {
                                        return e.id_rolmenu == v.id_rolmenu && e.access == 1;
                                    });
                                    /*agregar botones del menu*/
                                    _private.buildButton(selfmenu);
                                }else{
                                    /*si no tiene evento ajax, entonces tine subniveles*/
                                    _private.subItem(v.id_menu,oSettings,rot);
                                }
                            }
                        }
                    });
                    
                },

                render: function (oSettings) {
                    var li = null, t = this, cont = [], selfmenu = [], name = null;
                    $.each(oSettings.data, function (i, v) {
                        /*nivel inicial sin evento, tiene subniveles*/
                        if(v.parent == 0 && v.evt_ajax == 'not'){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                name = Tools.traslate(v.nmenu);
                                li = `
                                <li>
                                    <a href="javascript:;" data-root="${name}"><i class="fa fa-folder-open" style="color:#f8ac59;"></i><div class="line-vertical"></div>&nbsp; <span class="text-menu-sm">${name}</span></a>
                                    <ul id="mnu_${v.id_menu}"></ul>
                                </li>`;
                                cont.push(v.id_menu);
                                
                                $(t).append(li);
                                _private.subItem(v.id_menu,oSettings,name);
                            }
                        }
                       
                        /*nivel inicial con evento, no tiene subniveles*/
                        if(v.parent == 0 && v.evt_ajax != 'not'){
                            if(JSON.stringify(cont).indexOf(v.id_menu) == -1){
                                name = Tools.traslate(v.nmenu);
                                li = `<li id="li_${v.id_menu}">
                                        <a href="javascript:;" data-root="${name}"><i class="fa fa-bars" style="color:#f8ac59;"></i><div class="line-vertical"></div>&nbsp;&nbsp; <span class="text-menu-sm">${name}</span></a>
                                    </li>`;
                                cont.push(v.id_menu);
                                
                                $(t).append(li);
                                
                                $(`#li_${v.id_menu}`).find('a').data('a',v.alias);
                                $(`#li_${v.id_menu}`).find('a').click(function(){
                                    eval(v.evt_ajax);
                                });
                                
                                selfmenu = $.grep(oSettings.data, function (e) {
                                    return e.id_rolmenu == v.id_rolmenu && e.access == 1;
                                });
                                /*agregar botones del menu*/
                                _private.buildButton(selfmenu);
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