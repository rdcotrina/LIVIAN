<form class="modal inmodal fade in" id="formNewMenu" name="formNewMenu">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title tr-language" data-tr="title_nmenu"></h4>
            </div>
            <div class="modal-body form-horizontal">

                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="descripcion"></label>
                    <div class="col-lg-10">
                        <input type="text" class="form-control tagsinput" id="txt_descripcion" name="txt_descripcion" /> 
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="alias"></label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" id="txt_alias" name="txt_alias" data-toggle="tooltip" data-placement="right" title="Este alias se utilizará como prefijo para todos los elementos que serán contenidos en esta menú. Se permiten 10 caracteres como máximo."/>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="ajax"></label>
                    <div class="col-lg-10">
                        <input type="text" class="form-control" id="txt_ajax" name="txt_ajax" /> 
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-10">
                        <div class="i-checks">
                            <label> 
                                <input type="checkbox" id="chk_activo" name="chk_activo" checked value="1"/>
                                <i></i> <span class="tr-language" data-tr="chk_activo"></span> 
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <span id="foot_btns"></span>
                <button type="button" class="btn btn-warning lv-close" data-dismiss="modal"><i class="fa fa-close"></i> <span class="tr-language" data-tr="btn_close"></span></button>
            </div>
        </div>
    </div>
    <js id="js_formNewMenu">
        $("#formNewMenu").validate({
            ignore: [],
            rules: {
                txt_descripcion: {
                    required: true,
                    minlength: 3
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function () {
                Exe.MenuDom.postNewMenu(__PK__);
            }
        });
    </js>
</form>
