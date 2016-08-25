<template>
    <img @click="receive" :src="item.imgUrl">
</template>
<script type="text/babel">
    import util from '../common/util'
    import messBox from '../common/mess-box'
    export default{
        data(){
            return {}
        },
        methods: {
            receive(){
                this.$http.get('/api/coupon/grantCoupon.jsp', {
                    op: 1,
                    couponIds: JSON.stringify(this.item.content.split('@'))
                }).success(({ obj, errCode }) => {
                    if (errCode === 10000) {
                        util.goToLogin()
                        return
                    }
                    if (errCode === 0) {
                        messBox.tips('领取成功');
                    }
                })
            },
        },
        props: ['item'],
        ready(){

        },
    }

</script>

<style>

</style>
