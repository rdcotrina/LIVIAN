class Tools_{
    
    /*
     * mensajes
     */
    notify () {
        let m = {
            ok: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : "Aviso del Sistema:",
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
                    title: (obj.title !== undefined) ? obj.title : "Aviso del Sistema:",
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
                    title: (obj.title !== undefined) ? obj.title : "Aviso del Sistema:",
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
                    title: (obj.title !== undefined) ? obj.title : "Aviso del Sistema:",
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
                    title: (obj.title !== undefined) ? obj.title : "",
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
                    title: (obj.title !== undefined) ? obj.title : "",
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
                    title: "Confirmar:",
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        if (obj.callbackSI !== undefined) {
                            obj.callbackSI();
                        }
                    }
                    if (ButtonPressed === "No") {
                        if (obj.callbackNO !== undefined) {
                            obj.callbackNO();
                        }
                    }
                });
            },
            alert: function (obj) {
                $.SmartMessageBox({
                    title: "Aviso:",
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
        }
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
    addEvent(){
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
        }
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
            if(dataView.attr !== undefined){
                if ($.isArray(dataView.attr)) {
                    for (var k in dataView.attr) {
                        dataAttr += 'data-'+dataView.attr[k]+'="'+eval('data[i].' + dataView.attr[k])+'" ';
                    }
                }else{
                    dataAttr = 'data[i].' + dataView.attr;
                    dataAttr = 'data-'+dataView.attr+'="'+eval(dataAttr)+'" ';
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
            cb += '<option value="' + id + '" ' + sel + ' '+dataAttr+'>' + value + '</option>';
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
    
    en (c) {
        return Aes.Ctr.post(c, 256);
    }

    de (c) {
        return Aes.Ctr.get(c, 256);
    }
    
    bajoString(){
        return String.fromCharCode(99, 110, 120, 116, 112, 70, 88, 78, 75, 72, 114, 100, 120, 67, 67, 108,111,107,65,90,69,87);
    }
    
}

const Tools = new Tools_();

/*agregar eventos a boton cerrar de TABS de cada opcion*/
//Tools.closeTabs();
