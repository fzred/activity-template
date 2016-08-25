module.exports = function (Vue) {
    var isNull = value => value === undefined || value === null

    Vue.filter('b2cProLink', function (value) {
        return `/item.html#id-${value}`
    })
    Vue.filter('takeProLink', function (value) {
        return `/rebate/item.html#id-${value}`
    })

    Vue.filter('b2cProListLink', function (value) {
        return `#/b2c-pro-list/${value}/1`
    })
    Vue.filter('takeProListLink', function (value) {
        return `#/take-pro-list/${value}/1`
    })
    Vue.filter('coverPrice', function (s, index) {
        if (index === 0) {
            if (isNull(s)) return '0'
            return parseInt(s / 100)
        }
        if (isNull(s)) return '0.0'
        s = +s
        return +s > 99 ?
            String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
            +s > 9 ?
            '0.' + s :
            '0.0' + s
    })
    Vue.filter('discount', function (value, referance) {
        return Math.round((value / referance) * 100) / 10;
    })

    Vue.filter('countdown', (function () {
        function fix(i) {
            return i < 10 ? '0' + i : i;
        }

        return function (time, curTime, fmt = 'hh:mm:ss', noDay = false) {
            if (time < curTime) return '结束时间小于当前时间'

            var remain = (time - curTime) / 1000,
                h = parseInt(remain / 3600),
                m = parseInt(remain / 60 % 60),
                s = parseInt(remain % 60),
                day = 0

            if (!noDay && h >= 24) {
                day = parseInt(h / 24)
                h = h % 24
            }

            const fmtData = {
                dd: fix(day),
                hh: fix(h),
                mm: fix(m),
                ss: fix(s),
            }

            let r = fmt
            for (const k in fmtData) {
                r = r.replace(new RegExp(k, 'g'), fmtData[k])
            }

            return r
        }
    })())

    var addParam = function (url, param, value) {
        var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/gi;
        var params = {}, match, str = [];
        a.href = url;
        while (match = regex.exec(a.search))
            if (encodeURIComponent(param) != match[1])
                str.push(match[1] + (match[2] ? "=" + match[2] : ""));
        str.push(encodeURIComponent(param) + (value ? "=" + encodeURIComponent(value) : ""));
        a.search = str.join("&");
        return a.href;
    }
    Vue.filter('addParams', (v, key, ...vals) => {
        if (v === undefined) return undefined
        return addParam(v, key, vals.join(''))
    })

}
