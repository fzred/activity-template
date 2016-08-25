import cookie from './cookie'
var isApp = !!cookie.get("ALLPYRA_TERMINAL")
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