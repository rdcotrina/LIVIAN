"use strict";
var httpR;
class Ajax_ {

    constructor() {

        this._sData = [];

        /*
         * gener parametros para enviar via AJAX
         */
        this._serialize = function () {
            let data = '';

            this._sData.forEach(elem => {
                data += elem.name + '=' + elem.value + '&';
            });

            this._sData = [];
            data = data.substring(0, data.length - 1);

            return data;
        };

        /*reset formulario*/
        this._clear = function (form) {
            if ($(form)[0] !== undefined) {
                $(form)[0].reset();
            }
            $('.chosen').val("").trigger("chosen:updated");
        };

        /*activa img loading*/
        this._processIn = function () {
            $('#process-general').fadeIn();
        };

        /*
         * desactiva img loading
         */
        this._processOut = function () {
            $('#process-general').fadeOut();
        };

        this._btnString = [];

        /*
         * desabilita boton y coloca imagen cargando
         */
        this._processObjetoIn = function (el) {
            /*guardo texto de boton*/
            this._btnString.push({
                objeto: el,
                xhtml: $(el).html()
            });
            $(el).html('<i class="fa fa-gear fa-lg fa-spin"></i>');
            $(el).attr('disabled', true);
        };

        /*
         * activa boton y devuelve su icono y texto
         */
        this._processObjetoOut = function (el) {
            let txt = '', xobj = '';
            for (let i in this._btnString) {
                if (el === this._btnString[i].objeto) {
                    xobj = this._btnString[i].objeto;
                    txt = this._btnString[i].xhtml;
                    $(xobj).html(txt);
                    $(xobj).attr('disabled', false);
                    break;
                }
            }
        };

    }

    /*
     * enviando via AJAX
     */
    send(obj) {
        let myRand = parseInt(Math.random() * 999999999999999);
        this._sData.push({name: '_keypassw', value: myRand});

        /*se activa boton loading en boton*/
        if (obj.element !== undefined) {
            this._processObjetoIn(obj.element);
        }
        /*se activa gif loadinf*/
        if (obj.gifProcess !== undefined && obj.gifProcess !== false) {
            this._processIn();
        }

        let typeData = (obj.dataType !== undefined) ? obj.dataType : 'json';
        let clear = (obj.clear === undefined) ? true : obj.clear;
        let clearEvnts = (obj.clearEvnts !== undefined) ? obj.clearEvnts : [];
        let encrypt = (obj.encrypt === undefined) ? false : obj.encrypt;
        let abort = (obj.abort === undefined) ? false : obj.abort;
        let context = (obj.context === undefined) ? '[context] no definido' : obj.context;

        if (obj.flag !== undefined) {
            this._sData.push({name: '_flag', value: obj.flag});
        }
        if (obj.fnServerParams !== undefined) {
            obj.fnServerParams(this._sData);
        }

        /*serializacion de datos*/
        let datos = this._serialize();
        datos += (obj.form !== undefined) ? '&' + $(obj.form).serialize(encrypt) : '';

        let ttis = this;

        return $.ajax({
            type: "POST",
            data: datos,
            url: obj.root,
            dataType: typeData,
            beforeSend: function (data2) {
                if (obj.abort) {
                    if (httpR) {
                        httpR.abort();
                    }
                    httpR = data2;
                }
            },
            success: function (data) {
                let er = 1; /*parametro para detectar si SERVER devuelve ERROR*/

                /*validar error del SP*/
                if (typeData === 'json' && data.length > 0 || data.error !== undefined) {
                    /*no es un array, servidor devuelve cadena, y el unico q devuelve cadena es el ERROR del SP*/
                    if (data instanceof Object === false || data.error !== undefined) {
                        let msn = data;
                        if (data.error !== undefined) {
                            msn = data.error;
                        }
                        Tools.notify().error({
                            content: msn
                        });
                        er = 0;
                    }
                }

                /*oculta img cargando de boton*/
                if (obj.element !== undefined) {
                    ttis._processObjetoOut(obj.element);//respuesta de servidor finalizada
                }

                if (obj.fnCallback !== undefined) {//si existe callback
                    let callBback = obj.fnCallback;
                    callBback({data: data,context: context});
                }

                /*se optiene parametro DUPLICADO*/
                let d = (data.length > 1) ? data[0].duplicado : data.duplicado;

                /*limpia el formulario*/
                if (clear && parseInt(d) !== 1 && er && obj.form !== undefined) {
                    ttis._clear(obj.form);
                }
                /*se desactiva gif loading*/
                if (obj.gifProcess !== undefined && obj.gifProcess !== false) {
                    ttis._processOut();//respuesta de servidor finalizada
                }

                /*limpiando eventos de FORM*/
                if (clearEvnts.length > 0 && $.isArray(clearEvnts)) {
                    $.each(clearEvnts, function (index, value) {
                        let ev = "\
                        Tools.removeAttr()." + value + "({\n\
                            container: '#" + $(data).attr("id") + "',\n\
                            typeElement: 'a, button, select, input, div, span, li'\n\
                        });";
                        eval(ev);
                    });
                }
            }
        });

    }

    /*
     * Deshabilita boton 
     */
    disableBtn(element) {
        this._processObjetoIn(element);
    }
    /*
     * habilita boton 
     */
    activeBtn(element) {
        this._processObjetoOut(element);
    }
    
}
