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

    formNewMenu(divmain) {
        super.send({
            context: this,
            root: `${this._root}formMenu.js`,
            dataType: 'html',
            fnServerParams:function(sData){
                sData.push({name: 'divmain', value: divmain});
            },
            fnCallback: function (obj) {
                $(`#${divmain}`).append(obj.data);
            }
        });
    }

}