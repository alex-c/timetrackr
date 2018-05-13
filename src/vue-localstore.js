const localForage = require('localForage');

var VueLocalStore = {

    install: function (Vue, options) {

        var localstore = localForage;
        if (options) {
            localstore = localForage.createInstance(options);
        }

        Vue.prototype.$localstore = localstore;

    }

}

export default VueLocalStore;
