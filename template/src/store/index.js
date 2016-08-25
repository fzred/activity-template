import cookie from "../common/cookie.js";

var store = {};
store.showLayer = false;
store.uesr = {nickname: undefined};
store.isInApp = (function () {
    return !!cookie.get("BD-EGO_TERMINAL");
})();
export default store;