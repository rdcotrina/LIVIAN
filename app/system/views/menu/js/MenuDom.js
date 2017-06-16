"use strict";

class MenuDom_ extends MenuAjax_ {

    constructor() {
        super();
        this._index = super.index;
        this._alias = Exe.getAlias();
        this._container = `#${this._alias}_CONTAINER`;
        this._divmain = `main_${this._alias}`;
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
                        {keybtn: BTNSYS.NEW, evts: [{click: 'Exe.MenuDom.formNewMenu();'}]}
                        //{keybtn: BTNSYS.EDT, evts: [{click: 'alert(99)'}]}
                    ]
                });

                let dmain = $('<div />');
                dmain.attr('id', context._divmain);
                $(context._container).append(dmain);
            }
        });
    }

    formNewMenu() {
        super.formNewMenu(this._divmain);
    }
}
