<template>
    <div class="banner-img">
        <template v-for="item in moduleList">
            <a type="1" v-if="item.type==1"
               :href="item.content || undefined"><img :src="item.imgUrl"></a>


            <a v-if="item.type==2" :href="item.content | b2cProListLink"><img :src="item.imgUrl"></a>
            <a v-if="item.type==3" :href="item.content | takeProListLink"><img :src="item.imgUrl"></a>


            <a v-if="item.type==4" :href="item.content | b2cProLink"><img :src="item.imgUrl"></a>
            <a v-if="item.type==5" :href="item.content | takeProLink"><img :src="item.imgUrl"></a>

            <pager v-if="item.type==6" :on-data="getData" :page-no="pageNo" :model.sync="proList">
                <b2c-pro-list :list="proList"></b2c-pro-list>
            </pager>

            <pager v-if="item.type==7" :on-data="getData" :page-no="pageNo" :model.sync="proList">
                <take-pro-list :list="proList"></take-pro-list>
            </pager>

            <div type="8" v-if="item.type==8" class="display-flex type8and9">
                <a :href="item.content[0] | b2cProLink"><img :src="item.imgUrl[0]"></a>
                <a :href="item.content[1] | b2cProLink"><img :src="item.imgUrl[1]"></a>
            </div>

            <div v-if="item.type==9" class="display-flex type8and9">
                <a :href="item.content[0] | takeProLink"><img :src="item.imgUrl[0]"></a>
                <a :href="item.content[1] | takeProLink"><img :src="item.imgUrl[1]"></a>
            </div>

            <div v-if="item.type==10" class="display-flex type8and9">
                <a :href="item.content[0] | b2cProListLink"><img :src="item.imgUrl[0]"></a>
                <a :href="item.content[1] | b2cProListLink"><img :src="item.imgUrl[1]"></a>
            </div>

            <div v-if="item.type==11" class="display-flex type8and9">
                <a :href="item.content[0] | takeProListLink"><img :src="item.imgUrl[0]"></a>
                <a :href="item.content[1] | takeProListLink"><img :src="item.imgUrl[1]"></a>
            </div>

            <type12 v-if="item.type==12" :item="item" :activity-id="activityId"></type12>

            <div v-if="item.type==13" class="display-flex type8and9">
                <a :href="item.content[0]"><img :src="item.imgUrl[0]"></a>
                <a :href="item.content[1]"><img :src="item.imgUrl[1]"></a>
            </div>

            <type14 v-if="item.type==14" :actid="item.content"></type14>
            <type15 v-if="item.type==15" :item="item"></type15>
            <type16 v-if="item.type==16" :item="item"></type16>
            <type17 v-if="item.type==17" :actid="item.content"></type17>
            <type18 v-if="item.type==18" :actid="item.content"></type18>
            <type19 v-if="item.type==19" :item="item"></type19>
            <type20 v-if="item.type==20" :item="item"></type20>

        </template>

    </div>
</template>
<script type="text/babel">
    import wxTool from '../common/wx.tool.js'
    import type12 from './type12.vue'
    import type14 from './type14.vue'
    import type15 from './type15.vue'
    import type16 from './type16-limit-time.vue'
    import type17 from './type17.vue'
    import type18 from './type18.vue'
    import type19 from './type19.vue'
    import type20 from './type20.vue'
    export default{
        data(){
            return {
                activityId: 0,
                proList: [],
                moduleList: [],
                proListId: undefined,
                pageNo: 1,
                scrollTop: 0,
            }
        },
        components: {
            type12, type14, type16, type15, type17, type18, type19, type20
        },
        props: [
            'activityId',
            'pprd1', // pprd第一段
            'pprd2', // pprd第二段开始位置
            'pprd3'  // pprd第一段
        ],
        methods: {
            initPage(){
                this.pageNo = parseInt(this.$route.params.pageNo || 1);
                if (this.pageNo > 1) {
                    setTimeout(o=> {
                        window.scrollTo(0, document.querySelector('.prolist').offsetTop)
                    }, 100)
                }
                setTimeout(()=> {
                    this.$broadcast("loadPage");
                })
            },
            getData({ pageNo, pageSize }){
                return this.$http.get("/api/product/getProductList.jsp", {
                    actid: this.proListId,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            },
        },
        ready(){
            this.$http.get('/api/activity/queryHomeRotationActivity.jsp', {
                op: 4,
                actid: this.activityId,
            }).then(({ data :{ obj } })=> {

                let list = this.moduleList = obj.list
                for (let i = 0, item; i < list.length; i++) {
                    item = list[i]
                    if (item.type === 6 || item.type === 7) {
                        this.proListId = item.content
                        this.initPage()
                    } else if ([8, 9, 10, 11, 13].indexOf(item.type) !== -1) {
                        item.content = item.content.split('@')
                        item.imgUrl = item.imgUrl.split('@')
                    } else if (item.type === 12) {
                        // 点赞
                        item.imgUrl = item.imgUrl.split('@')
                    }
                }
            })
        },
    }
</script>