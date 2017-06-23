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
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                </div>
                            </div>`;
                            $(that).append(cnt);
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