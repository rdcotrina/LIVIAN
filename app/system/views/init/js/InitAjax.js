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
        _sys_sg = 1;
        super.send({
            token: 1,
            flag: 1,
            element: '#btn_entrar',
            encrypt: true,
            root: this._controller + 'postLogin',
            form: '#formLogin',
            dataAlias: false,
            clear: false,
            serverParams: function(sData){
                sData.push({name: '_ipLocal', value: localStorage.getItem('sys_idLocal')});
            },
            success: function (obj) {
                if (obj.data.result == 1) {
                    localStorage.setItem('__',parseInt(Math.random() * 999999999999999));
                    Tools.notify().ok({
                        content: SYS_LANG_MSN.loginok
                    });
                    location.reload(true);
                } else if (obj.data.result == 2) {
                    $("#main").effect('shake');
                    Tools.notify().error({
                        content: SYS_LANG_MSN.loginfail
                    });
                }
            }
        });
    }
    
    logOut(tk){
        super.send({
            token: tk,
            flag: 1,
            element: '#btn_entrar',
            encrypt: true,
            dataAlias: false,
            root: this._controller + 'logOut',
            clear: false,
            success: function (obj) {
                location.reload(true);
                localStorage.clear();
            }
        });
    }
    
}

