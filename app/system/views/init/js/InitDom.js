"use strict";
class InitDom_ extends InitAjax_ {

    constructor() {
        super();
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

    logOut(){
        let t = this; 
        var p = super.logOut;
        
        Tools.notify().confirm({
            content: `<span class="MsgTitle"><i class="fa fa-sign-out" style="color:orange"></i> ${LANG.msn_logout} <span style="color:orange"><strong>ADMINISTRADOR CORE SOLUTION</strong></span> ?</span><p>${LANG.msn_seguridad_logout}</p>`,
            callbackSI: function(){
                p.call(t);
            }
        });
    }

}


