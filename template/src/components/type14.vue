<template>
    <ul class="type14">
        <li v-for="(index,item) in list">
            <div class="info display-flex" onclick="location.href='\{{item.pid | b2cProLink}}'">
                <div class="img display-flex">
                    <img v-if="index===0" src="../imgs/type14/p_01.png" class="tag">
                    <img v-if="index===1" src="../imgs/type14/p_02.png" class="tag">
                    <img v-if="index===2" src="../imgs/type14/p_03.png" class="tag">
                    <img v-if="index>=3" src="../imgs/type14/p_04.png" class="tag">
                    <img :src="item.logourl" class="logo"></div>
                <div>
                    <div class="brand">\{{item.brandname}} \{{item.brandename}}</div>

                    <div class="title">\{{item.name}}</div>

                    <div class="discount">\{{item.price | discount item.referance_price}}折</div>

                    <div class="price">￥\{{item.price | coverPrice}}</div>

                    <div class="buy-btn">立即购买</div>

                </div>
            </div>

            <div class="desc">\{{item.descword}}</div>
            <div class="banner-img">
                <img src="../imgs/type14/p_07.png">
            </div>
        </li>
    </ul>
</template>

<style rel="stylesheet/scss" scoped>
    .type14 {
        padding-top: 30px;
        li {
            list-style: none;
            padding: 30px 20px;
        }
        .info {
            > :nth-child(2) {
                flex: 1;
            }
            .img {
                align-items: center;
                width: 260px;
                border: 1px solid #e5e5e5; /*no*/
                box-shadow: #a5a0a0 0px 0px 6px 3px;
                margin-right: 30px;
                position: relative;
                .logo {
                    width: 100%;
                }
                .tag {
                    position: absolute;
                    top: -60px;
                    left: -10px;
                    width: 120px;
                }
            }
            .brand {
                font-size: 30px;
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
                border: 1px solid #000; /*no*/
                display: inline-block;
                padding: 8px 30px;
                margin-top: 20px;
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