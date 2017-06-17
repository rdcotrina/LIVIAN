"use strict";
class MenuAjax_ extends Ajax_ {

    constructor() {
        super();
        this._controller = 'system/menu/';
        this._root = 'app/system/views/menu/';

//        this._fields = {
//            usuario: $('#txtUser'),
//            clave: $('#txtClave')
//        };
    }

    formNewMenu(btn, context) {
        super.send({
            element: btn,
            context: this,
            root: `${this._root}formMenu.js`,
            dataAlias: context._alias,
            dataType: 'text',
            fnServerParams: function (sData) {
                sData.push({name: 'divmain', value: context._divmain});
            },
            fnCallback: function (obj) {
                $(`#${context._divmain}`).append(obj.data);
                Exe.MenuDom.addButtonsFormNew();
            }
        });
    }

}