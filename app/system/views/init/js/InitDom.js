"use strict";

class InitDom_ extends InitAjax_ {

    constructor() {
        super();
        this._logOut = super.logOut;
    }

    main() {}

    postLogin() {
        let t = this;
        var p = super.postLogin;

        $("#formLogin").validate({
            // Rules for form validation
            rules: {
                txtUser: {
                    required: true,
                    minlength: 3
                },
                txtClave: {
                    required: true,
                    minlength: 3
                }
            },
            // No cambie el código de abajo
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function () {
                p.call(t);
            }
        });
    }

    logOut(tk) {
        Tools.notify().confirm({
            context: this,
            content: `<span class="MsgTitle"><i class="fa fa-sign-out" style="color:orange"></i> ${SYS_LANG_MSN.msn_logout} <span style="color:orange"><strong>ADMINISTRADOR CORE SOLUTION</strong></span> ?</span><p>${SYS_LANG_MSN.msn_seguridad_logout}</p>`,
            callbackSI: function (context) {
                context._logOut(tk);
            }
        });
    }

}


