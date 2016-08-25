<template>
    <ul class="type18">
        <li v-for="(index,item) in list" onclick="location.href='{{item.pid | b2cProLink}}'">
            <img :src="item.logourl" class="logo"></div>
            <div class="name line-clamp1">{{item.name}}</div>
            <div class="title line-clamp1">{{item.title}}</div>
            <div class="price">￥<span>{{item.price | coverPrice}}</span></div>
            <div class="buy-btn">立即购买</div>
        </li>
    </ul>
</template>

<style rel="stylesheet/scss" scoped>
    .type18 {
        padding-top: 30px;
        overflow: hidden;
        li {
            box-shadow: #eee 0px 0px 6px 3px;
            float: left;
            padding: 30px 20px;
            width: 345px;
            box-sizing: border-box;
            list-style: none;
            margin: 20px;
            text-align: center;
            &:nth-child(2n) {
                margin-left: 0;
            }

            .name {
                font-size: 24px;
            }
            .title {
                font-size: 22px;
                line-height: 40px;
                color: #999999;
            }
            .price {
                color: #af1c40;
                font-size: 24px;
                line-height: 50px;
                span {
                    font-size: 32px;
                }
            }
            .buy-btn {
                display: inline-block;
                padding: 10px 50px;
                margin-top: 20px;
                background: #000;
                color: #fff;
                border: 0;
                border-radius: 4px;
                font-size: 24px;
            }
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