"use strict";

class MenuDom_ extends MenuAjax_ {

    constructor() {
        super();
        this._alias = Exe.getAlias();                       /*alias que se agregara a cada ID y NAME del TAB*/
        this._container = `#${this._alias}_CONTAINER`;      /*<div> del TAB*/
        this._divmain = `main_${this._alias}`;              /*<div> principal del TAB que se encuenra dentro de _container*/
    }

    main() {
        Tools.addTab({
            context: this,
            id: this._alias,
            label: Exe.getTitle(),
            fnCallback: function (context) {
                /*agregando breadcrumb*/
                $(context._container).html(Tools.breadcrumb(Exe.getRoot()));

                /*id de div para los botones*/
                let idBtnra = `toolbar_${context._alias}`;

                /*div para los botones*/
                let btnr = $('<div />');
                btnr.attr('id', idBtnra);
                btnr.addClass('btn-group');
                btnr.css({
                    'margin-top': '10px'
                });

                /*se agrega el div para los botones*/
                $(context._container).append(btnr);

                /*cargando los botones*/
                $.fn.getButtonsys({
                    container: `#${idBtnra}`,
                    keymnu: context._alias,
                    btns: [
                        {keybtn: BTNSYS.NEW, evts: [{click: 'Exe.MenuDom.formNewMenu'}]}
                        //{keybtn: BTNSYS.EDT, evts: [{click: 'alert(99)'}]}
                    ]
                });

                /*<div> principal del TAB*/
                let dmain = $('<div />');
                dmain.attr('id', context._divmain);
                dmain.addClass('text-center');
                dmain.css({
                    'margin-top': '10px'
                });
                dmain.html(Tools.spinner().main);
                $(context._container).append(dmain);

                context.renderData();
            }
        });
    }

    formNewMenu(btn, tk) {
        super.formNewMenu(btn, this, tk).done(function () {
            $('#formNewMenu').modal('show');
            $('.tagsinput').tagsinput();
            setTimeout(function () {
                $('.bootstrap-tagsinput').addClass('col-lg-12');
            }, 100);
        });
    }

    addButtonsFormNew() {
        $.fn.getButtonsys({
            container: `#${this._alias}foot_btns`,
            keymnu: this._alias,
            btns: [{keybtn: BTNSYS.GRB, type: 'submit'}]
        });
    }

    postNewMenu(tk) {
        super.postNewMenu(tk).done(function (obj) {
            if (obj.result == 1) {
                Tools.notify().ok({
                    content: SYS_LANG_MSN.proccess_ok
                });
                this.renderData();
                Tools.closeModal(`#${this._alias}formNewMenu`);
            } else if (obj.result == 2) {
                Tools.notify().error({
                    content: SYS_LANG_MSN.mnu.nmenu_exist
                });
            }else if (obj.result == 3) {
                Tools.notify().error({
                    content: SYS_LANG_MSN.mnu.alias_exist
                });
            }else if (obj.result == 4) {
                Tools.notify().error({
                    content: SYS_LANG_MSN.mnu.ajax_exist
                });
            }
        });
    }

    renderData() {
        var data = super.getData(_tk_);

        Exe.require(`${localStorage.getItem('sys_root')}app/system/views/menu/libs/menuTree`)
                .done(function () {
                    data.done(function (rows) {
                        $(`#${this._divmain}`).menuTree({
                            alias: this._alias,
                            data: rows
                        });
                    });
                });

    }

}
