module.exports = function (Vue) {
    Vue.directive('countdown', (() => {
        let curTime = new Date().getTime()
        setInterval(() => {
            curTime = new Date().getTime()
        }, 1000)

        function fix(i) {
            return i < 10 ? '0' + i : i;
        }

        return {
            params: ['fmt', 'curTime'],
            paramWatchers: {
                curTime() {
                    this.writeHtml()
                }
            },
            bind() {
                if (!curTime) {
                    this.curTime = new Date().getTime()
                }
                setInterval(() => {
                    this.curTime = new Date().getTime()
                }, 1000)
            },
            time: 0,
            writeHtml() {
                let fmt = this.fmt || 'hh:mm:ss'
                const time = this.time
                if (time < curTime) {
                    throw new Error('结束时间小于当前时间')
                }
                let remain = (time - curTime) / 1000,
                    h = parseInt(remain / 3600),
                    m = parseInt(remain / 60 % 60),
                    s = parseInt(remain % 60),
                    day = 0

                if (h >= 24) {
                    day = parseInt(h / 24)
                    h = h % 24
                }

                const fmtData = {
                    dd: fix(day),
                    hh: fix(h),
                    mm: fix(m),
                    ss: fix(s),
                }
                for (const k in fmtData) {
                    fmt = fmt.replace(new RegExp(k, 'g'), fmtData[k])
                }

                this.el.innerHTML = fmt
            },
            update(value) {
                this.time = value
                this.writeHtml()
            },
            unbind() {
            }
        }

    })())
}