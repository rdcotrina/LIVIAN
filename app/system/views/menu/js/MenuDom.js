"use strict";

class MenuDom_ extends MenuAjax_ {

    constructor() {
        super();
        this._index = super.index;
        this._alias = Exe.getAlias();
        this._container = `#${this._alias}_CONTAINER`;
    }

    main() {
        Tools.addTab({
            context: this,
            id: this._alias,
            label: Exe.getTitle(),
            fnCallback: function(context) {
                
                $(context._container).html(Tools.breadcrumb(Exe.getRoot()));
                
                let btnr = $('<div />');
                btnr.attr('id',`toolbar_${context._alias}`);
                
                $(context._container).append(btnr);
                
                $.fn.getButtonsys({
                    keymnu: context._alias,
                    keybtn: [BTNSYS.GRB,BTNSYS.EDT]
                });
               
            }
        });
    }

}
