import cookie from './cookie'
import wxTool from './wx.tool'

export function goToLogin() {
    if (isApp()) {
        // 调用APP登录
        let appJson = {
            type: 440,
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    } else {
        window.location.href = `/login.html?sourceurl=${encodeURIComponent(window.location.href)}`
    }
}

export function isApp() {
    return !!cookie.get("BD-EGO_TERMINAL")  //  ALLPYRA_TERMINAL
}

/*
 {
 link: undefined,
 title: undefined,
 desc: undefined,
 imgUrl: undefined,
 success: undefined,
 }
 */
export function setShare(option) {
    if (isApp()) {
        var appJson = {
            type: 601,
            obj: {
                content: option.link,
                title: option.title,
                desc: option.desc,
                image: option.imgUrl
            }
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    } else {
        wxTool.setShare({
            imgUrl: option.imgUrl,
            link: option.link,
            desc: option.desc,
            title: option.title,
            success: option.success
        })
    }
}

export function goHome() {
    if (isApp()) {
        location.href = '/?appJson=' +
            encodeURIComponent(JSON.stringify({
                type: 100,
            }))
    } else {
        location.href = '/'
    }
}
