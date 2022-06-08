/**
* @name: 试题右侧选题卡
* @Author: xxjiushini
*/
<template>
    <div class="main-right">
        <slot name="downTime"></slot>
        <div
                class="btn test-num-btn"
                :class="[
                {'test-num-current': index === currentIdx},
                {'test-num-correct': testData[index].isSelect&&(isExam || (testData[index].questType === '2' && testData[index].selectOpt.sort().toString() === testData[index].rightAnswer) || (['1','3'].includes(testData[index].questType) && testData[index].selectOpt === testData[index].rightAnswer) || (testData[index].questType === '4' && testData[index].fillVal === testData[index].rightAnswer))},
                {'test-num-error': !isExam && testData[index].isSelect && ((testData[index].questType === '2' && testData[index].selectOpt.sort().toString() !== testData[index].rightAnswer) || (['1','3'].includes(testData[index].questType) && testData[index].selectOpt !== testData[index].rightAnswer) || (testData[index].questType === '4' && testData[index].fillVal !== testData[index].rightAnswer))}]"
                v-for="(item, index) in testLength"
                :key="index"
                @click="checkedTest(index)"
        >{{item}}</div>
    </div>
</template>

<script>
    export default {
        name: "testOptions",
        props: {
            currentIdx: {
                type: Number,
                required: true
            },
            testData: {
                type: Array,
                required: true,
                default: () => []
            },
            testLength: {
                type: Number,
                required: true
            },
            isExam: {
                type: Boolean,
                required: true
            },
        },

        methods: {
            //右侧选择题目
            checkedTest(idx) {
                this.$emit('handleCheckedTest',idx)
            },
        }
    }
</script>

<style scoped lang="scss">
    .main-right{
        width: 100%;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
        padding: .16rem 0 0 .16rem;
        display: flex;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        &::-webkit-scrollbar {
            display: none;
        }

        .count-time{
            display: flex;
            width: 1.6rem;
            height: .6rem;
            margin-right: .08rem;
            .icon-time{
                width: .2rem;
                height: .2rem;
                background: url("~@/assets/images/icon_clock.png") no-repeat;
                background-size: 100%;
                display: inline-block;
                vertical-align: middle;
                margin-right: .08rem;
            }
            .count-down{
                display: flex;
                color: #f29500;
            }
        }
        .test-num-btn{
            width: .68rem;
            height: .6rem;
            line-height: .6rem;
            border-radius: .12rem;
            background-color: #ffffff;
            border: 1px solid #dcdde0;
            text-align: center;
            font-size: .28rem;
            margin-right: .16rem;
            margin-bottom: .16rem;
            cursor: pointer;
            color: #666666;
        }

        /*当前选中的*/
        .test-num-current{
            border: 1px solid #f29500;
            color: #f29500;
        }

        /*答对*/
        .test-num-correct{
            border: 1px solid #68bf56;
            background-color: #68bf56;
            color: #ffffff;
        }

        /*答错*/
        .test-num-error{
            border: 1px solid #f2786b;
            background-color: #f2786b;
            color: #ffffff;
        }
    }
</style>
