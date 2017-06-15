"use strict";

class MenuDom_ extends InitAjax_ {

    constructor() {
        super();
        //        this._logOut = super.logOut;
    }

    main() {
        Tools.addTab({
            id: tabs.MNU,
            label: Exe.getTitle(),
            fnCallback: function() {alert(Exe.getRoot())
//                Exe.MenuView.index(Exe.getTitle());
            }
        });
    }

}
