/**
 * Created by lred on 2016/4/15.
 */
$.fn.simpleLottery = function (opts) {
    opts = $.extend({
        className: 'current',
        duration: 80,
        decreasingDuration: 8,
        animateTo: 1,
        turnsNumbe: 4,
        stepCallBack: false,
        callback: false
    }, opts);

    var $list = this,
        listLength = $list.length;

    if (listLength <= 1) return false;

    $list.removeClass(opts.className);

    var duration = opts.duration,
        initIndex = 0,
        initTurns = 1,
        isLastTurn = false,
        isLastIndex = false;

    function animateTo(index) {
        if (opts.stepCallBack) {
            opts.stepCallBack(initIndex)
        } else {
            $list.eq(initIndex).addClass(opts.className);
            $list.eq(initIndex - 1).removeClass(opts.className);
        }

        isLastTurn = (initTurns === opts.turnsNumbe);

        if ((isLastTurn) && (initIndex === index)) {
            // 结束
            setTimeout(function () {
                opts.callback && opts.callback.call();
            }, 1000);
        } else {
            // 继续
            isLastIndex = initIndex === listLength - 1;
            initTurns = isLastIndex ? (initTurns + 1) : initTurns;
            initIndex = isLastIndex ? 0 : initIndex + 1;

            // duration = isLastTurn ? (duration + opts.decreasingDuration) : duration;
            duration += opts.decreasingDuration;

            setTimeout(function () {
                animateTo(index);
            }, duration);
        }
    }

    animateTo(opts.animateTo);
    return this;
};
module.exports = {};