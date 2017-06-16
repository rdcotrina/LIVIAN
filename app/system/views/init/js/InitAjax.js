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
            fnCallback: function (obj) {
                if (obj.data.result == 1) {
                    Tools.notify().ok({
                        content: LANG.loginok
                    });
                    location.reload(true);
                } else if (obj.data.result == 2) {
                    $("#main").effect('shake');
                    Tools.notify().error({
                        content: LANG.loginfail
                    });
                }
            }
        });
    }
    
    logOut(){
        super.send({
            flag: 1,
            element: '#btn_entrar',
            encrypt: true,
            root: this._controller + 'logOut',
            clear: false,
            fnCallback: function (obj) {
                location.reload(true);
                localStorage.clear();
            }
        });
    }
    
}

