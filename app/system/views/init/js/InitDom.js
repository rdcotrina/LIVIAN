"use strict";
class InitDom_ extends InitAjax_ {

    constructor() {
        super();
    }

    main() {
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

    

}


