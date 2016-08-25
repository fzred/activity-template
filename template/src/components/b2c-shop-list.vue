<template>
    <pager :on-data="getData" :page-no="pageNo" :model.sync="list">
        <b2c-pro-list :list="list"></b2c-pro-list>
    </pager>
</template>
<script type="es6">
    export default{
        data(){
            return {
                actid: undefined,
                list: [],
                pageNo: 1,
            }
        },
        methods: {
            initPage(){
                this.actid = this.$route.params.id;
                this.pageNo = parseInt(this.$route.params.pageNo || 1);
            },
            getData({ pageNo, pageSize }){
                return this.$http.get("/api/product/getProductList.jsp", {
                    actid: this.actid,
                    pageNo: pageNo,
                    pageSize: pageSize,
                });
            },
        },
        route: {
            data: function (transition) {
                this.initPage();
                setTimeout(()=> {
                    this.$broadcast("loadPage");
                }, 100);
            }
        },
        attached(){
            //this.initPage();
        }
    }
</script>