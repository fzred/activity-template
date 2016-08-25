<template>
    <ul class="prolist">
        <li v-for="item in list">
            <div class="item-wrap"><a :href="item.pid | b2cProLink">
                <div class="thumbnail"><img
                        :src="item.logourl">
                </div>
                <dl class="details">
                    <dt class="title">{{item.name}}</dt>
                    <dd class="price"><label>￥ <strong>{{item.price | coverPrice}}</strong></label></dd>
                    <dd class="source">{{item.depotName}}</dd>
                </dl>
            </a>
                <div class="discount">{{item.price | discount item.referance_price}}折</div>
                <div v-if="false" class="seldout-cover hide"><span class="seldout"></span></div>
            </div>
        </li>
    </ul>
    <div class="not-list" v-if="list.length<1">
        <p>没有记录</p>
    </div>
</template>
<script>
    export default{
        props: ["list"],
    }
</script>