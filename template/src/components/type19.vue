<template>
    <b2c-pro-list :list="proList"></b2c-pro-list>
</template>
<script type="text/babel">
    import util from '../common/util'
    import messBox from '../common/mess-box'
    export default{
        data(){
            return {
                proList: []
            }
        },
        methods: {},
        props: ['item'],
        ready(){
            this.$http.get("/api/product/getProductList.jsp", {
                actid: this.item.content,
                pageNo: 1,
                pageSize: 200,
            }).success(({ obj }) => {
                this.proList = obj.productList
            })
        },
    }
</script>

<style>

</style>
