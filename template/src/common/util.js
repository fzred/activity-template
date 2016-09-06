import cookie from './cookie'
// ALLPYRA_TERMINAL
var isApp = !!cookie.get("BD-EGO_TERMINAL")
function goToLogin() {
    if (isApp) {
        // 调用APP登录
        let appJson = {
            type: 440,
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    } else {
        window.location.href = `/login.html?sourceurl=${encodeURIComponent(window.location.href)}`
    }
}

module.exports = { goToLogin, isApp }