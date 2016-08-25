<template>
    <div class="type16">

        <div class="display-flex pro-item" :class="{ over: curTime > actInfo.actEndtime }">

            <div v-if="curTime > actInfo.actEndtime" class="display-flex">
                <p>已结束</p>
            </div>
            <div v-if="curTime < actInfo.actEndtime && curTime > actInfo.actBegintime" class="display-flex underway">
                <div>
                    <p>进行中</p>
                    <span>{{actInfo.actEndtime | countdown curTime 'hh' true}}</span><i class="iconfont">&#xe60b;</i>
                    <span>{{actInfo.actEndtime | countdown curTime 'mm' true}}</span><i class="iconfont">&#xe60b;</i>
                    <span>{{actInfo.actEndtime | countdown curTime 'ss' true}}</span>
                </div>
            </div>
            <div v-if="curTime < actInfo.actBegintime" class="display-flex immediately">
                <div>
                    <p>即将开售</p>
                    <span>{{actInfo.actBegintime | countdown curTime 'hh' true}}</span><i class="iconfont">&#xe60b;</i>
                    <span>{{actInfo.actBegintime | countdown curTime 'mm' true}}</span><i class="iconfont">&#xe60b;</i>
                    <span>{{actInfo.actBegintime | countdown curTime 'ss' true}}</span>
                </div>
            </div>

            <div class="display-flex" onclick="location.href='{{actInfo.pid | b2cProLink}}'">
                <img :src="actInfo.pLogo">
                <div class="display-flex">
                    <p>{{ actInfo.pName }}</p>
                    <div class="price display-flex">
                        <span>限时价:<b>￥{{ actInfo.actPrice | coverPrice 0 }}</b></span>
                        <span>市场价:￥{{ actInfo.referPrice | coverPrice 0 }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="curTime > actInfo.actEndtime" class="disable-layer"></div>
    </div>
</template>
<script type="text/babel">
    import util from '../common/util'
    import messBox from '../common/mess-box'
    export default{
        data(){
            return {
                curTime: new Date().getTime(),
                actInfo: null
            }
        },
        methods: {
            getData() {
                this.$http.get('/api/activity/queryHomeRotationActivity.jsp', {
                    op: 5,
                    actid: this.item.content
                }).success(({ obj }) => {
                    /*
                     obj: {
                     "actInfo": {
                     "actBegintime": 1468252800000,
                     "pName": "汉高施华蔻Theramed站立式牙膏 蓝色防蛀 100ml",
                     "pLogo": "http://st.bd-ego.com/data/static/op/p/1510211522070039/logo4.jpg",
                     "pid": "1510211522070039",
                     "actEndtime": 1468372800000,
                     "actPrice": 3000,
                     "referPrice": 4200
                     },
                     "title": "限时抢购"
                     }
                     */
                    this.actInfo = obj.actInfo

                })
            }
        },
        props: ['item'],
        ready(){
            setInterval(() => {
                this.curTime = new Date().getTime()
            }, 1000)
            this.getData()
            document.body.style.background = '#f80063'
        },
    }
</script>
<style>
    body {
    }
</style>
<style rel="stylesheet/scss" scoped>
    .type16 {
        font-size: 30px;
        padding: 0 20px;
        position: relative;
        .disable-layer {
            position: absolute;
            top: 0;
            left: 20px;
            width: 710px;
            height: 100%;
            background: rgba(0, 0, 0, .2);
            pointer-events: none;
        }
        .pro-item {
            margin: 10px 0;
            background: #fff;
            &.over {
                color: #999;
                .price {
                    > *:nth-child(1) {
                        color: #999 !important;
                    }
                }
            }
            > * {
                align-items: center;
                &:nth-child(1) {
                    width: 230px;
                    box-sizing: border-box;
                    > div {
                        font-size: 0;
                        .iconfont, span {
                            font-size: 30px;
                        }
                        p {
                            width: 100%;
                            text-align: center;
                        }
                    }
                }
                &.underway:nth-child(1) {
                    color: #de345b;
                    > div {
                        width: 100%;
                        text-align: center;
                        font-size: 0;
                    }
                    p {
                        text-align: center;
                        font-weight: bold;
                        font-size: 30px;
                        margin-bottom: 18px;
                    }
                    span {
                        background: #de345b;
                        color: #fff;
                        display: inline-block;
                        line-height: 52px;
                        width: 52px;
                        text-align: center;
                        border-radius: 4px;
                    }
                }

                &.immediately:nth-child(1) {
                    color: #0a1926;
                    > div {
                        width: 100%;
                        text-align: center;
                    }
                    p {
                        text-align: center;
                        font-weight: bold;
                        font-size: 30px;
                        margin-bottom: 18px;
                    }
                    span {
                        background: #0a1926;
                        color: #ced1d4;
                        display: inline-block;
                        line-height: 52px;
                        width: 52px;
                        text-align: center;
                        border-radius: 4px;
                    }
                }

                &:nth-child(2) {
                    flex: 1;
                    padding: 20px 0;
                    align-items: flex-start;
                    img {
                        width: 140px;
                        height: 140px;
                        border: 1px solid #e5e5e5; /*no*/
                    }
                    > * {
                        &:nth-child(2) {
                            flex: 1;
                            padding: 0 20px;
                            flex-direction: column;
                            height: 140px;
                            p {
                                font-size: 24px;
                                flex: 1;
                                line-height: 30px;
                            }
                            .price {
                                margin-bottom: 20px;
                                > * {
                                    line-height: 30px;
                                }
                                > *:nth-child(1) {
                                    flex: 1;
                                    color: #af1c40;
                                    font-size: 22px;
                                    b {
                                        font-size: 28px;
                                    }
                                }
                                > *:nth-child(2) {
                                    color: #b0b0b0;
                                    text-decoration: line-through;
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>
