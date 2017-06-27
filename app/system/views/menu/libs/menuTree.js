"use strict";
(function ($) {

    $.fn.extend({

        menuTree: function (opt) {

            let defaults = {
                data: []
            };

            var options = $.extend(defaults, opt);

            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {

                childrens: function (oSettings, idMenu) {
                    var t = {'data': [
                            {
                                'text': 'xxx'
                            },
                            {
                                'text': 'Resources',
                                'children': [
                                    {
                                        'text': 'css',
                                        'children': [
                                            {
                                                'text': 'animate.css'
                                            },
                                            {
                                                'text': 'bootstrap.css'
                                            },
                                            {
                                                'text': 'main.css'
                                            },
                                            {
                                                'text': 'style.css'
                                            }
                                        ]
                                    },
                                    {
                                        'text': 'js',
                                        'children': [
                                            {
                                                'text': 'bootstrap.js'
                                            },
                                            {
                                                'text': 'inspinia.min.js'
                                            },
                                            {
                                                'text': 'jquery.min.js'
                                            },
                                            {
                                                'text': 'jsTree.min.js'
                                            },
                                            {
                                                'text': 'custom.min.js'
                                            }
                                        ]
                                    },
                                    {
                                        'text': 'html',
                                        'children': [
                                            {
                                                'text': 'layout.html'
                                            },
                                            {
                                                'text': 'navigation.html'
                                            },
                                            {
                                                'text': 'navbar.html'
                                            },
                                            {
                                                'text': 'footer.html'
                                            },
                                            {
                                                'text': 'sidebar.html'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                    let childrens = '';
                    $.each(oSettings.data, function (i, v) {
                        if (idMenu == v.parent) {
                            childrens += `{`;
                            if(v.evt_ajax != 'not'){
                                childrens += `  icon: false,`;
                            };
                            childrens += `  text: '${v.nmenu}'`;
                            if(v.evt_ajax == 'not'){
                                childrens += `,  children: [${_private.childrens(oSettings, v.id_menu)}]`;
                            }
                            childrens += `},`;
                        }
                    });
                    childrens = childrens.substr(0,childrens.length - 1);
                    return childrens;
                },

                render: function (oSettings) {
                    let cnt = null, that = this;
                    $(that).html('');
                    $.each(oSettings.data, function (i, v) {
                        if (v.parent == 0) {
                            cnt = `
                            <div class="col-lg-4">
                                <div class="panel panel-warning">
                                    <div class="panel-heading">
                                        <i class="fa fa-dedent"></i> ${v.nmenu}
                                    </div>
                                    <div class="panel-body">
                                        <div id="mnu_${i}" class="text-left">${Tools.spinner().main}</div>
                                    </div>
                                </div>
                            </div>`;
                            $(that).append(cnt);

                            $(`#mnu_${i}`).jstree({
                                core: {
                                    data: eval(`[${_private.childrens(oSettings, v.id_menu)}]`)
                                }
                            });
                        }
                    });

                    $(that).append('<div class="clearfix"></div>');
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