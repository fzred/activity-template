<template>
    <ul class="take-prolist">
        <li v-for="item in list">
            <div class="item-wrap"><a :href="item.pid | takeProLink">
                <div class="thumbnail"><img
                        :src="item.logourl">
                </div>
                <p class="price-discount"><span>{{item.price | discount item.referance_price}}折</span>
                    ￥{{item.price | coverPrice}}
                </p>
                <dl class="details">
                    <dt class="title">{{item.name}}</dt>
                    <dd class="price"><label>￥ <strong>{{item.price | coverPrice}}</strong></label></dd>
                    <dd class="source">{{item.depotName}}</dd>
                </dl>
                <div class="display-flex commission">
                    <div>佣金{{item.commission | coverPrice}}元</div>
                    <div>立刻分享</div>
                </div>
            </a>
                <div v-if="false" class="seldout-cover hide"><span class="seldout"></span></div>
            </div>
        </li>
    </ul>
    <div class="not-list" v-if="list.length<1">
        <p>没有记录</p>
    </div>
</template>
<script>
    export default{
        props: ["list"],
    }
</script>


<style>

    .take-prolist {
        overflow: auto;
        background: #eee;;
    }

    .take-prolist a {
        color: #000;
        text-decoration: none;;
    }

    .take-prolist > li {
        float: left;
        width: 50%;
        list-style: none;
    }

    .take-prolist .item-wrap {
        padding: 4px;
        position: relative
    }

    .take-prolist a {
        display: block;
        width: 100%;
        background-color: #fff
    }

    .take-prolist .thumbnail img {
        display: block;
        width: 100%
    }

    .take-prolist .details {
        display: block;
        padding: 2px 6px;
        position: relative
    }

    .take-prolist .title {
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 40px;
        height: 80px;
        color: #777777;
        font-size:26px;
    }

    .take-prolist .price {
        background-color: #fff;
        padding-right: 6px;
        z-index: 98
    }

    .take-prolist .price label {
        font-size: .24rem
    }

    .take-prolist .price strong {
        font-size: .32rem
    }

    .take-prolist .source {
        font-size: .22rem;
        position: absolute;
        bottom: 8px;
        right: 4px;
        z-index: 97;
        color: #a0a0a0
    }

    .take-prolist .discount {
        background-color: #630;
        color: #fff;
        border-bottom-right-radius: 1pc;
        border-top-right-radius: 1pc;
        padding: 2px 6px;
        position: absolute;
        left: 4px;
        top: 16%;
        font-size: .22rem;
        font-style: normal
    }

    .take-prolist .seldout-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .35);
        pointer-events: none;
        z-index: 100
    }

    .take-prolist .price-discount {
        color: #ff0301;
        font-size: 22px;
    }

    .take-prolist .price-discount span {
        background: #000;
        color: #fff;
        padding: 0 4px;
    }

    .take-prolist .seldout-cover .seldout {
        width: 58px;
        height: 58px;
        background: url(http://m.allpyra.com/img/flowicon.png) -60px 0 no-repeat;
        background-size: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -29px 0 0 -29px
    }

    .take-prolist .commission {
        padding: 5px 0;
        box-sizing: border-box;
        background: #fe0000;
    }

    .take-prolist .commission > div {
        flex: 1;
        text-align: center;
        color: #fff;
        font-size:28px;
    }

    .take-prolist .commission > div:nth-child(1) {
        color: #fcf004;
        border-right: 2px solid #fff;
    }
</style>