/**
* @name: 首页
* @Author: xxjiushini
*/
<template>
    <router-link to="/onlineTest">去考试</router-link>
</template>

<script>
    export default {
        name: "index",
    }
</script>

<style scoped lang="scss">
    a{
        display: inline-block;
        width: 4rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #ff6410;
        text-align: center;
        font-size: .6rem;
        color: #ffffff;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: .2rem;
    }
</style>
