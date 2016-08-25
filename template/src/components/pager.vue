<template>

    <slot></slot>

    <div class="pager-btn" v-show="pages>1">
        <div class="inner">
            <button @click="prev" class="prev j-prev">&lt; 上一页</button>
            <span><i class="j-current-page">\{{pageNo}}</i> / <i class="j-total-page">\{{pages}}</i> 页</span>
            <button @click="next" class="next j-next">下一页 &gt;</button>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        props: {
            pageSize: {
                type: Number,
                default: ()=> 10,
            },
            pageNo: {
                type: Number,
                default: ()=> 1,
            },
            onData: null,
            dataInit: {
                type: Boolean,
                default: ()=> true,
            },
            model: Array,
        },
        data(){
            return {
                pages: 1
            }
        },
        methods: {
            getData(pageNo, go){
                if (go) {
                    let params = this.$route.params;
                    params.pageNo = pageNo;
                    this.$router.go({
                        name: this.$route.name,
                        params,
                    });
                    return;
                }


                var promise = this.onData({
                    pageNo: pageNo,
                    pageSize: this.pageSize
                });
                if (promise.then instanceof Function) {

                    promise.then(({ data :{ obj } })=> {
                        if (obj.pages) {
                            this.pages = obj.pages;
                        } else {
                            this.pages = parseInt(obj.totalNum % this.pageSize > 0 ? obj.totalNum / this.pageSize + 1 : obj.totalNum / this.pageSize);
                        }
                        this.model = obj.list || obj.productList || [];
                        this.pageNo = pageNo;
                    });

                } else {
                    this.$router.go(promise);
                }


            },
            prev(){
                if (this.pageNo === 1) return;
                this.getData(this.pageNo - 1, true);
            },
            next(){
                if (this.pageNo >= this.pages) return;
                this.getData(this.pageNo + 1, true);
            },
        },
        ready(){
            this.$on("loadPage", ()=> {
                this.getData(this.pageNo);
            })
        },
        attached(){
            if (this.dataInit) {
                setTimeout(()=> {
                    //this.getData(this.pageNo);
                })
            }


        },


    }
</script>

<style>

    .pager-btn {
        padding: 40px 0;
        text-align: center;
    }

    .pager-btn .inner {
        display: inline-block;
        font-size: 24px;
        text-align: center;
        overflow: hidden;
        *zoom: 1;
    }

    .pager-btn .inner button,
    .pager-btn .inner span {
        float: left;
        padding: 10px 20px;
        margin: 0 8px;
        border: 2px solid #ccc;
        background-color: #fff;
    }

    .pager-btn .inner button {
        color: #333;
        text-decoration: none;
        background-color: #efefef;
        padding: 10px 20px;
        font-size: 24px;
    }

    .pager-btn .inner span i {
        font-style: normal;
    }
</style>
