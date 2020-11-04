/**
* @name: 试题右侧选题卡
* @Author: xiao jun
* @Date: 2020-09-10
* Copyright(c) 2015-2010 xiaojun.
*/
<template>
    <div class="main-right">
        <slot name="downTime"></slot>
        <div
                class="btn test-num-btn"
                :class="[{'test-num-current': index == currentIdx}, {'test-num-correct': ((testData[index].isSelect && testData[index].questType == 2 && testData[index].selectOpt.toString() == testData[index].correct) || (testData[index].isSelect && testData[index].questType == 4 && testData[index].fillVal == testData[index].correct) || (testData[index].isSelect && testData[index].errIdx == null)) || (isExam && testData[index].isSelect)}, {'test-num-error': !isExam && ((testData[index].isSelect && testData[index].questType == 2 && testData[index].selectOpt.toString() != testData[index].correct) || (testData[index].isSelect && testData[index].questType == 4 && testData[index].fillVal != testData[index].correct) || (testData[index].isSelect && testData[index].errIdx != null))}]"
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
            currentIdx: Number,
            testData: Array,
            testLength: Number,
            isExam: Boolean,
            handleCheckedTest: Function
        },

        methods: {
            //右侧选择题目
            checkedTest(idx) {
                let _this = this,$parent;
                _this.currentIdx = idx;
                _this.testOptionsShow = false;
                this.handleCheckedTest(idx)
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
