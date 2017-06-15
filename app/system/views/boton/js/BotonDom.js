"use strict";

class BotonDom_ extends InitAjax_ {

    constructor() {
        super();
    }

    main() {
        Tools.addTab({
            id: tabs.BTN,
            label: Exe.getTitle(),
            fnCallback: function() {
//                Exe.MenuView.index(Exe.getTitle());
            }
        });
    }

}
