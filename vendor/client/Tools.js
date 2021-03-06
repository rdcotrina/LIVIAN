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
            if (obj.context == undefined) {
                console.log('[context] no definido.');
            }
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: (obj.title !== undefined) ? obj.title : SYS_LANG_MSN.msn_sys,
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
                    title: `<b>${SYS_LANG_MSN.msn_sys}</b>`,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (obj.context == undefined) {
                        console.log('[context] no definido, puede causar errores para ejecucion de callback');
                    }
                    if (ButtonPressed === "Si") {
                        if (obj.yes !== undefined) {
                            obj.yes(obj.context); /*context es para enviar el scope de la clase en donde se ejecuta Tools*/
                        }
                    }
                    if (ButtonPressed === "No") {
                        if (obj.not !== undefined) {
                            obj.not(obj.context);
                        }
                    }
                });
            },
            alert: function (obj) {
                $.SmartMessageBox({
                    title: SYS_LANG_MSN.msn_sys,
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
    /*
     * Traduce todas las etiquetas del app
     * @param {type} root
     * @returns {undefined}
     */
    traslation() {
        var ln = window.navigator.language || navigator.browserLanguage;
        var lang = ln.split('-')[0].toUpperCase();

        Exe.require(`${localStorage.getItem('sys_root')}config/18n/language_${lang}`, function () {

            var elems = document.querySelectorAll(".tr-language"), ev = '';
            for (var x = 0; x < elems.length; x++) {
                ev = `language_${lang}.labels[ '${elems[x].dataset.tr}' ]`;
                elems[x].innerHTML = eval(ev);
            }
            //los placeholders
            elems = document.querySelectorAll(".tr-language-ph"), ev = '';
            for (var x = 0; x < elems.length; x++) {
                ev = `language_${lang}.labels[ '${elems[x].dataset.trph}' ]`;
                elems[x].placeholder = eval(ev);
            }
            
            //los titles
            elems = document.querySelectorAll(".tr-language-title"), ev = '';
            for (var x = 0; x < elems.length; x++) {
                ev = `language_${lang}.labels[ '${elems[x].dataset.trtitle}' ]`;
                elems[x].title = eval(ev);
            }
            
            SYS_LANG_MSN = eval(`language_${lang}.msn`); /*para los alertas*/
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

    breadcrumb(data) {
        let d = data.split('/');
        let b = `
        <ul class="lv-breadcrumb">
            <li><a href="javascript:;"><i class="fa fa-home"></i></a></li>`;
        $.each(d, function (i, v) {
            b += `<li><a href="javascript:;">${v}</a></li>`;
        });
        b += `</ul>`;
        return b;
    }
    /*
     * Cierra y quita los modals del DOM
     * @param {type} obj
     * @returns {undefined}
     */
    closeModal(obj) {
        var search = obj.toString().indexOf('#'), id = '';
        if (search === -1) {/*cuando se cierra modal desde botones*/
            id = '#' + $(obj).parent().parent().parent().parent().attr('id');
        } else {/*cuando se cierra modal desde closeModal*/
            id = obj;
        }

        $(id).modal('hide');
        setTimeout(function () {
            $(id).remove();
            $(id + '_modalFormBoot').remove();
        }, 200);
        $(".modal").off("keypress");/*quitar evento que se agrega al momento de usar el TREE.php*/
    }
    /*
     * Agregar alias a HTML
     * @param {type} data
     * @param {type} alias
     * @returns {undefined}
     */
    addAliasData(data, alias) {
        let sc = null, idsc = null, nform = 0, c = null, ee = null;
        $(data).find('input,div,span,select,label,button,form,js').each(function (i, v) {
            if ($(v).attr('name') != undefined) {
                $(`#${v.id}`).attr('name', alias + $(v).attr('id'));
            }
            if ($(v).attr('id') != undefined) {
                $(`#${v.id}`).attr('id', alias + $(v).attr('id'));
            }
            if ($($(v).parent().prop('tagName')).attr('id') != undefined && nform == 0) {
                nform++;
                $(`#${$($(v).parent().prop('tagName')).attr('id')}`).attr('name', alias + $($(v).parent().prop('tagName')).attr('id'));
                $(`#${$($(v).parent().prop('tagName')).attr('id')}`).attr('id', alias + $($(v).parent().prop('tagName')).attr('id'));
            }
            if ($(v).prop('tagName') == 'JS') {
                idsc = alias + $(v).attr('id');
                sc = $(v).html();

                /*agregando ALIAS  <js>*/
                $(data).find('input,div,span,select,label,button,form').each(function (ii, vv) {
                    /*para id de <form>*/
                    if ($($(vv).parent().prop('tagName')).attr('id') != undefined) {
                        c = $(`#${$($(vv).parent().prop('tagName')).attr('id')}`).find('js').html();
                        var t = $($(vv).parent().prop('tagName')).attr('id').replace(alias, '');
                        ee = eval(`c.replace(/${t}/gi,'${alias}${t}')`);
                        $(`#${idsc}`).html(ee);
                    }
                    if ($(vv).attr('id') != undefined) {
                        c = $(`#${idsc}`).html();
                        ee = eval(`c.replace(/${vv.id}/gi,'${alias}${vv.id}')`);
                        ee = eval(`ee.replace(/__PK__/gi,${_sys_sg})`);
                        $(`#${idsc}`).html(ee);
                    }
                });
            }
        });
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).append(`<script>${$(`#${idsc}`).html()}</script>`);
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).find('js').remove();
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).find('script').remove();
    }

    getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
        //compatibility for firefox and chrome
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
            iceServers: []
        }),
                noop = function () {},
                localIPs = {},
                ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
                key;

        function iterateIP(ip) {
            if (!localIPs[ip])
                onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer().then(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0)
                    return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function (reason) {
            // An error occurred, so handle the failure to connect
        });

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))
                return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }
    
    spinner(){
        return {
            main: `
            <div class="sk-spinner sk-spinner-three-bounce">
                <div class="sk-bounce1"></div>
                <div class="sk-bounce2"></div>
                <div class="sk-bounce3"></div>
            </div>`
        };
    }

}

const Tools = new Tools_();

/*agregar eventos a boton cerrar de TABS de cada opcion*/
Tools.closeTabs();
