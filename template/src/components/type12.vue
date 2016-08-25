<template>
    <div class="type12">
        <img v-if="likeData.like==1" :src="item.imgUrl[0]">
        <img v-else :src="item.imgUrl[1]" @click="like">

        <p>\{{likeData.count}}<b>+</b></p>

    </div>
</template>
<script type="text/babel">
    export default{
        data(){
            return {
                likeData: {}
            }
        },
        methods: {
            like(){
                this.$http.get('/api/activity/pointPraiseActivity.jsp', {
                    cmd: 2,
                    actid: this.activityId
                }).success(({ obj }) => {
                    this.likeData.like = '1'
                    this.likeData.count++
                })
            },
        },
        props: ['item', 'activityId'],
        ready(){
            this.$http.get('/api/activity/pointPraiseActivity.jsp', {
                cmd: 1,
                actid: this.activityId
            }).success(({ obj }) => {
                this.likeData = obj
            })
        },
    }

</script>

<style>
    .type12 {
        text-align: center;
        padding: 50px 0;
    }

    .type12 img {
        width: 88px;
    }

    .type12 p {
        line-height: 70px;
    }

    .type12 p b {
        color: #f00;
        margin-left: 10px;
    }
</style>
