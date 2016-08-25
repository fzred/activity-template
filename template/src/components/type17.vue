<template>
    <ul class="type17">
        <li v-for="(index,item) in list">
            <div class="info display-flex" :class="{reverse:index%2}" onclick="location.href='\{{item.pid | b2cProLink}}'">
                <div class="img display-flex">
                    <img :src="item.logourl" class="logo"></div>
                <div>
                    <div class="brand">\{{item.brandname}} \{{item.brandename}}</div>

                    <div class="title">\{{item.name}}</div>

                    <div class="desc">\{{item.descword}}</div>

                    <div class="price">￥\{{item.price | coverPrice}}</div>

                    <div class="buy-btn">立即购买</div>

                </div>
            </div>
        </li>
    </ul>
</template>

<style rel="stylesheet/scss" scoped>
    .type17 {
        padding-top: 30px;
        li {
            list-style: none;
            padding: 30px 20px;
        }
        .info {
            &.reverse {
                flex-direction: row-reverse;
            }
            > :nth-child(2) {
                flex: 1;
                padding: 0 20px;
            }
            .img {
                align-items: center;
                width: 260px;
                position: relative;
                background: url(../imgs/type17/border.png);
                background-size: 100% 100%;
                padding: 6px;
                .logo {
                    width: 100%;
                }
            }
            .brand {
                font-size: 40px;
                font-weight: bold;
                border-bottom: 1px dashed #666; /*no*/
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
            .title {
                font-size: 30px;
                line-height: 40px;
            }
            .discount {
                font-size: 28px;
                background: #000;
                color: #fff;
                display: inline-block;
                padding: 8px 30px;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                margin-top: 20px;
            }
            .price {
                font-size: 36px;
                color: #af1c40;
            }
            .buy-btn {
                display: inline-block;
                padding: 8px 30px;
                margin-top: 20px;
                background: #c9bc9c;
                color: #fff;
                border: 0;
                border-radius: 4px;
            }
        }
        .desc {
            color: #999;
            font-size: 24px;
            line-height: 34px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            margin: 20px 0;
        }

    }
</style>
<script type="text/babel">
    export default{
        data(){
            return {
                list: []
            }
        },
        props: ["actid"],
        methods: {
            getData(){
                this.$http.get("/api/product/getProductList.jsp", {
                    actid: this.actid,
                    pageNo: 1,
                    pageSize: 200,
                }).success(({ obj }) => {
                    this.list = obj.productList
                })

            }
        },
        ready(){
            this.getData()
            this.$watch('actid', v => {
                this.getData()
            })
        }
    }
</script>