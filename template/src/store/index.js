import cookie from "../common/cookie.js";
import util from '../common/util'

var store = {};
store.isInApp = util.isInApp

store.goHome = function () {
    if (store.isInApp) {
        location.href = '/?appJson=' +
            encodeURIComponent(JSON.stringify({
                type: 100,
            }))
    } else {
        location.href = '/'
    }
}

store.goToLogin = function () {
    if (util.isInApp) {
        // 调用APP登录
        let appJson = {
            type: 440,
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    } else {
        window.location.href = `/login.html?sourceurl=${encodeURIComponent(window.location.href)}`
    }
}

export default store;