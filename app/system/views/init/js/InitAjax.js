"use strict";
class InitAjax_ extends Ajax_ {

    constructor() {
        super();
        this._controller = 'system/init/';

//        this._fields = {
//            usuario: $('#txtUser'),
//            clave: $('#txtClave')
//        };
    }

    postLogin() {
        super.send({
            flag: 1,
            element: '#btn_entrar',
            encrypt: true,
            root: this._controller + 'postLogin',
            form: '#formLogin',
            clear: false,
            fnCallback: function (data) {
                if (data.result == 1) {
                    Tools.notify().ok({
                        content: LANG.loginok
                    });
                } else if (data.result == 2) {
                    $("#main").effect('shake');
                    Tools.notify().error({
                        content: LANG.loginfail
                    });
                    
                }
            }
        });
    }
}

