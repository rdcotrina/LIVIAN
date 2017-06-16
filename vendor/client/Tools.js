"use strict";
var counterTabsSys = 0;
class Tools_ {

    constructor() {
        this._tabs = $("#cont-general-tabs-sys").tabs();
        this._tabTemplate = `<li style='position:relative;border-radius: 3px 3px 0 0;-moz-border-radius: 3px 3px 0 0;-webkit-border-radius: 3px 3px 0 0;' id='#{idli}'> 
                                <span class='delete-tab' style='top:2px; left:2px;position:absolute;'>
                                    <button class='btn btn-xs font-xs btn-default hover-transparent'><i class='fa fa-times'></i></button>
                                </span>
                                <a href='#{href}'>&nbsp;&nbsp;&nbsp; #{label}</a>
                            </li>`;
    }

    addTab(obj) {
        /*verificar si tab existe*/
        if ($('#cont-general-tabs-sys').find('#' + obj.id + '_CONTAINER').length > 0) {
            $('#li-' + obj.id).remove();
            $('#cont-general-tabs-sys').find('#' + obj.id + '_CONTAINER').remove();
        }

        let li = $(this._tabTemplate.replace(/#\{href\}/g, "#" + obj.id + '_CONTAINER').replace(/#\{label\}/g, obj.label).replace(/#\{idli\}/g, 'li-' + obj.id));
        let tabContentHtml = (obj.content !== undefined) ? obj.content : '<h1><i class="fa fa-cog fa-spin"></i> Cargando...</h1>';
        
        this._tabs.find("#cont-tabs-sys").append(li);
        this._tabs.find('#cont-main-sys').append("<div id='" + obj.id + "_CONTAINER' class='tab-pane'><p>" + tabContentHtml + "</p></div>");
        this._tabs.tabs("refresh");
        
        if (obj.fnCallback !== undefined) {
            if(obj.context == undefined){ console.log('[context] no definido.'); }
            obj.fnCallback(obj.context);
        }

        $('#li-' + obj.id).find('a').click();
        
    }
    
    closeTabs() {
        let t = this;
        $("#cont-general-tabs-sys").on("click", 'span.delete-tab', function () {
            /*detecto id de tab dentro del contenedro del aplicativo*/
            let panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            t._tabs.tabs("refresh");
        });
    }

    /*
     * mensajes
     */
    notify() {
        let m = {
            ok: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#739E73",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-check shake animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            error: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#C46A69",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-warning shake animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            info: function (obj) {
                $.bigBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#3276B1",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-bell swing animated",
                    number: (obj.number !== undefined) ? obj.number : "1"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            warning: function (obj) {
                $.bigBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#C79121",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-shield fadeInLeft animated",
                    number: (obj.number !== undefined) ? obj.number : "1"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            msn: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#296191",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-bell swing animated"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            smallMsn: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#296191",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-thumbs-up bounce animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            confirm: function (obj) {
                $.SmartMessageBox({
                    title: `<b>${LANG.msn_sys}</b>`,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (obj.context == undefined) {
                        console.log('[context] no definido, puede causar errores para ejecucion de callback');
                    }
                    if (ButtonPressed === "Si") {
                        if (obj.callbackSI !== undefined) {
                            obj.callbackSI(obj.context); /*context es para enviar el scope de la clase en donde se ejecuta Tools*/
                        }
                    }
                    if (ButtonPressed === "No") {
                        if (obj.callbackNO !== undefined) {
                            obj.callbackNO(obj.context);
                        }
                    }
                });
            },
            alert: function (obj) {
                $.SmartMessageBox({
                    title: LANG.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[Aceptar]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Aceptar") {
                        if (obj.callback !== undefined) {
                            obj.callback();
                        }
                    }
                });
            }
        };
        return m;
    }

    /*
     * Quita el validate de jquery de un fronulario
     * @param {type} f
     * @returns {undefined}
     */
    removeValidate(f) {
        $(f).removeData("validator");
        $(f).find('.chosen-container').css('border', '0px');
    }

    /*para agregar eventos a elementos*/
    addEvent() {
        let ev = {
            click: function (obj) {
                $(obj.element).off('click');
                $(obj.element).on({
                    click: function () {
                        eval(obj.event);
                    }
                });
            },
            keypress: function (obj) {
                $(obj.element).off('keypress');
                $(obj.element).on({
                    keypress: function () {
                        eval(obj.event);
                    }
                });
            },
            keyup: function (obj) {
                $(obj.element).off('keyup');
                $(obj.element).on({
                    keypress: function () {
                        eval(obj.event);
                    }
                });
            },
            change: function (obj) {
                $(obj.element).off('change');
                $(obj.element).on({
                    keypress: function () {
                        eval(obj.event);
                    }
                });
            },
            date: function (obj) {
                $(obj.element).datetimepicker({
                    format: 'DD-MM-YYYY'
                });
                $(obj.element).mask('99-99-9999');
            },
            //Tools.setEvent.dateRange({ini: '#txt_fechaini', fin: '#txt_fechafin'});
            dateRange: function (obj) {
                $(obj.ini).datetimepicker({
                    format: 'DD-MM-YYYY'
                });
                $(obj.fin).datetimepicker({
                    useCurrent: false,
                    format: 'DD-MM-YYYY'//Important! See issue #1075
                });
                $(obj.ini).on("dp.change", function (e) {
                    $(obj.fin).data("DateTimePicker").minDate(e.date);
                });
                $(obj.fin).on("dp.change", function (e) {
                    $(obj.ini).data("DateTimePicker").maxDate(e.date);
                });


                $(obj.ini).mask('99-99-9999');
            },
            time: function (obj) {
                $(obj.element).clockpicker({
                    autoclose: true
                });
                $(obj.element).mask('99:99');
            }
        };
    }

    /*
     * 
     * @param {type} obj
     * @returns {undefined}
     * @uso 
     *       Tools.listBox({
     *           data: data,
     *           optionSelec: true,
     *           content: 'content',
     *           attr:{
     *               id: 'lst_element',
     *               name: 'lst_element'
     *           },
     *           dataView:{
     *               etiqueta: 'db_etiqueta',
     *               value: 'db_value'
     *           }
     *       });
     * 
     */
    createListBox(obj) {
        var data = obj.data,
                optionSelec = (obj.optionSelec === undefined) ? true : obj.optionSelec, /*para mostrar texto seleccionar*/
                content = obj.content, /*id deelemento donde se cargara <select>*/
                required = (obj.required === undefined) ? false : true,
                deffault = (obj.deffault !== undefined) ? obj.deffault : '', /*para seleccionar un registro por defecto*/
                fnCallback = (obj.fnCallback !== undefined) ? obj.fnCallback : '', /*funcion anonima*/
                dataView = obj.dataView, /*la data a setear en <select>*/
                attr = '', /*los atributos html del <select>*/
                chosen = (obj.chosen === undefined) ? true : obj.chosen,
                allWidth = (obj.allWidth === undefined) ? false : obj.allWidth,
                optionAll = (obj.optionAll === undefined) ? false : obj.optionAll;

        let iidd = '';
        if (obj.attr !== undefined && obj.attr !== '') {
            for (var i in obj.attr) {
                if (i == 'id') {
                    iidd = obj.attr[i];
                }
                attr += i + '="' + obj.attr[i] + '" ';
            }
        }
        let cb = '<select ' + attr + ' >';
        if (optionSelec) {
            cb += '<option value="">Seleccionar</option>';
        }
        if (optionAll) {
            cb += '<option value="ALL">Todos</option>';
        }
        let sel = '';
        let id = '';
        let value = '';
        let dataAttr = '';

        for (var i in data) {
            id = '';
            dataAttr = '';

            /*creando data-*/
            if (dataView.attr !== undefined) {
                if ($.isArray(dataView.attr)) {
                    for (var k in dataView.attr) {
                        dataAttr += 'data-' + dataView.attr[k] + '="' + eval('data[i].' + dataView.attr[k]) + '" ';
                    }
                } else {
                    dataAttr = 'data[i].' + dataView.attr;
                    dataAttr = 'data-' + dataView.attr + '="' + eval(dataAttr) + '" ';
                }
            }

            if ($.isArray(dataView.value)) {
                for (var j in dataView.value) {
                    id += eval('data[i].' + dataView.value[j]) + '-';
                }

                id = id.substring(0, id.length - 1);

            } else {
                id = 'data[i].' + dataView.value;
                id = eval(id);
            }

            value = '';
            if ($.isArray(dataView.etiqueta)) {
                for (var j in dataView.etiqueta) {
                    value += eval('data[i].' + dataView.etiqueta[j]) + ' - ';
                }

                value = value.substring(0, value.length - 2);

            } else {
                value = 'data[i].' + dataView.etiqueta;
                value = eval(value);
            }
            sel = '';
            if (deffault === id) {
                sel = ' selected = "selected" ';
            }
            cb += '<option value="' + id + '" ' + sel + ' ' + dataAttr + '>' + value + '</option>';
        }
        cb += '</select>';

        if (!chosen) {
            cb += '<i></i>';
        }

        if (required) {
            cb += '<div class="obligar"></div>';
        }

        if (content == 'return') {
            return cb;
        } else {
            $('#' + content).html(cb);
        }
        if (chosen) {
            $('#' + iidd).chosen();
        }
        if (fnCallback !== '') {
            fnCallback();
        }
        if (allWidth) {
            $('#' + iidd + '_chosen').css({width: '100%'});
        }
    }

    /*anular submit en en evento enter de elementos de un formulario*/
    noSubmit(form) {
        $(form).find('input:text').keypress(function (e) {
            if (e.keyCode === 13)
                return false;
        });
    }

    en(c) {
        return Aes.Ctr.post(c, 256);
    }

    de(c) {
        return Aes.Ctr.get(c, 256);
    }

    bajoString() {
        return String.fromCharCode(99, 110, 120, 116, 112, 70, 88, 78, 75, 72, 114, 100, 120, 67, 67, 108, 111, 107, 65, 90, 69, 87);
    }
    /*
     * Traduce todas las etiquetas del app
     * @param {type} root
     * @returns {undefined}
     */
    traslation(root) {
        var ln = window.navigator.language || navigator.browserLanguage;
        var lang = ln.split('-')[0].toUpperCase();

        Exe.require(`${root}config/18n/language_${lang}`, function () {

            var elems = document.querySelectorAll(".tr-language"), ev = '';
            for (var x = 0; x < elems.length; x++) {
                ev = `language_${lang}.labels[ '${elems[x].dataset.tr}' ]`;
                elems[x].innerHTML = eval(ev);
            }
            //los placeholders
            var elems = document.querySelectorAll(".tr-language-ph"), ev = '';
            for (var x = 0; x < elems.length; x++) {
                ev = `language_${lang}.labels[ '${elems[x].dataset.tr}' ]`;
                elems[x].placeholder = eval(ev);
            }

            LANG = eval(`language_${lang}.etiquet`); /*para los alertas*/
            localStorage.setItem('sys_lang', lang);
        });
    }
    /*
     * Traduce de idioma las etiquetas de el menu y los botones
     * @param {type} text
     * @returns {Tools_.traslate.t2}
     */
    traslate(text) {
        let lang = localStorage.getItem('sys_lang');
        let t1 = text.split(',');
        let t2 = null;
        let t3 = null;

        $.each(t1, function (i, v) {
            t2 = v.split('-');

            if (lang == t2[0]) {
                t3 = t2[1];
            }
        });

        return t3;
    }

    breadcrumb(data){
        let d = data.split('/');
        let b = `
        <ul class="lv-breadcrumb">
            <li><a href="javascript:;"><i class="fa fa-home"></i></a></li>`;
        $.each(d,function(i,v){
            b += `<li><a href="javascript:;">${v}</a></li>`;
        });
        b += `</ul>`;
        return b;
    }
    
}

const Tools = new Tools_();

/*agregar eventos a boton cerrar de TABS de cada opcion*/
Tools.closeTabs();
