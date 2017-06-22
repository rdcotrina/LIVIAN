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

    formNewMenu(btn, context, tk) {
        super.send({
            token: tk,
            element: btn,
            context: this,
            root: `${this._root}formNewMenu.js`,
            dataAlias: context._alias,
            dataType: 'text',
            serverParams: function (sData) {
                sData.push({name: 'divmain', value: context._divmain});
            },
            success: function (obj) {
                $(`#${context._divmain}`).append(obj.data);
                $('#formNewMenu').modal('show');
            },
            final: function(obj){/*se ejecuta una vez que se cargo el HTML en success*/
                Exe.MenuDom.addButtonsFormNew();
            }
        });
    }
    
    postNewMenu(tk){
        super.send({
            token: tk,
            dataAlias: this._alias,
            element: `#BCTXT_${this._alias}GRB`,
            context: this,
            root: `${this._controller}postNewMenu`,
            form: `#${this._alias}formNewMenu`,
            dataType: 'json',
            success: function (obj) {
                $(`#${this._alias}formNewMenu`).modal('hide');
            },
            final: function(obj){
                //Exe.MenuDom.addButtonsFormNew();
            }
        });
    }
    
    getData(tk){
        return super.send({
            token: tk,
            dataAlias: this._alias,
            context: this,
            root: `${this._controller}getData`,
            dataType: 'json'
        });
    }

}