<template>
    <img v-if="num===1" src="../imgs/rank/medals_1.png">
    <img v-if="num===2" src="../imgs/rank/medals_2.png">
    <img v-if="num===3" src="../imgs/rank/medals_3.png">
    <img v-if="num===4" src="../imgs/rank/medals_4.png">
    <img v-if="num===5" src="../imgs/rank/medals_5.png">
    <img v-if="num===6" src="../imgs/rank/medals_6.png">
    <img v-if="num===7" src="../imgs/rank/medals_7.png">
    <img v-if="num===8" src="../imgs/rank/medals_8.png">
    <img v-if="num===9" src="../imgs/rank/medals_9.png">
    <img v-if="num===10" src="../imgs/rank/medals_10.png">
</template>
<style rel="stylesheet/scss" scoped>
    img {
        width: 48px;
    }
</style>
<script>
    export default{
        data(){
            return {}
        },
        props: {
            num: Number
        },
        route: {
            data(){

            }
        },
    }
</script>
