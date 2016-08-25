<template>
    <ajaxloading></ajaxloading>
    <div id="wrapper" :class="{overflowHidden:store.showLayer,isInApp:store.isInApp}">
        <!-- main view -->
        <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in">
        </router-view>
    </div>
</template>
<script type="es6">
    import store from '../store'
    export default{
        data(){
            return {
                store: store,
            }
        },
        ready(){
        }
    }
</script>
<style>
.isInApp .gohome{
    display: none;
}
</style>