"use strict";
class MenuAjax_ extends Ajax_ {

    constructor() {
        super();
        this._controller = 'system/menu/';
        this._root = 'app/system/views/menu/';
        this._parent = 0;

//        this._fields = {
//            usuario: $('#txtUser'),
//            clave: $('#txtClave')
//        };
    }

    formNewMenu(btn, context, tk) {
        return super.send({
            token: tk,
            element: btn,
            context: this,
            root: `${this._root}formNewMenu.js`,
            dataAlias: context._alias,
            dataType: 'text',
            success: function (obj) {
                $('#cont-modal-sys').html(obj.data);
            },
            final: function (obj) {/*se ejecuta una vez que se cargo el HTML en success*/
                context.addButtonsFormNew();
            }
        });
    }

    postNewMenu(tk) {
        return super.send({
            flag: 1,
            token: tk,
            dataAlias: this._alias,
            element: `#BCTXT_${this._alias}GRB`,
            context: this,
            root: `${this._controller}postNewMenu`,
            form: `#${this._alias}formNewMenu`,
            dataType: 'json',
            serverParams: function (sData, obj) {
                sData.push({name: '_parent', value: obj.context._parent});
            }
        });
    }

    getData(tk) {
        return super.send({
            token: tk,
            dataAlias: this._alias,
            context: this,
            root: `${this._controller}getData`,
            dataType: 'json'
        });
    }
    
    delete(btn,tk){
        return super.send({
            flag: 3,
            token: tk,
            dataAlias: this._alias,
            element: btn,
            context: this,
            root: `${this._controller}delete`,
            dataType: 'json',
            serverParams: function (sData, obj) {
                sData.push({name: '_pkMenu', value: $(btn).parent().parent('ul').data('keymnu')});
            }
        });
    }

}