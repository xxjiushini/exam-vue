/**
* @name: 试题区域组件
* @Author: xxjiushini
*/
<template>
    <div class="item-section">
        <p class="item-title">
            <span class="item-type">{{testData.questType | filterType}}</span>
            <span>{{currentIdx+1}}/{{testLength}}</span>
            <span v-html="title" ref="testTitle"></span>
        </p>
        <div class="item-body">
            <div v-if="testData.picturePath||testData.videoPath">
                <img :src="testData.picturePath" height="auto" width="100%" v-if="testData.picturePath">
                <video :src="testData.videoPath" height="auto" width="100%" v-if="testData.videoPath"></video>
            </div>
            <ul class="item-body-options">
                <li v-for="(item,index) in testData.itemList" :key="index" class="item-opt">
                    <label :for="'test'+currentIdx+'_'+index">
                        <input
                                :type="testData.questType === '2'?'checkbox':'radio'"
                                :id="'test'+currentIdx+'_'+index"
                                :name="'test'+currentIdx"
                                :value="item.value"
                                v-model="testData.selectOpt"
                                class="test-default test-default-icon"
                                :disabled="testData.questType === '2'?testData.selectOpt.includes(item.value):testData.selectOpt!==''"
                        >
                        <span>{{item.value}}、{{item.name}}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "testItem",
        props: {
            currentIdx: {
                type: Number,
                required: true
            },
            testData: {
                type: Object,
                required: true,
                default: () => {}
            },
            testLength: {
                type: Number,
                required: true
            },
        },
        filters: {
            filterType: function (val) {
                switch (val) {
                    case '1':val = '单';break;
                    case '2':val = '多';break;
                    case '3':val = '判';break;
                    default: val = '填'
                }
                return val
            }
        },

        data(){
            return {

            }
        },

        computed: {
            title: function () {
                if (this.testData.questType === '4') {
                    return this.testData.title.replace(new RegExp(" .", "gm"),"<input type='text' class='space-box'/>")
                } else {
                    return this.testData.title
                }
            }
        },

        watch: {
            currentIdx: function () {
                this.$nextTick(function () {
                    if (this.testData.questType === '4') {
                        let inputNode = document.getElementsByClassName('space-box');
                        inputNode[0].value = this.testData.fillVal;
                    }
                })
            },

            'testData.selectOpt': function (n,o) {
                this.clickInput(n)
            },
        },

        mounted() {
            this.$nextTick(function () {
                if (this.testData.questType === '4') {
                    let inputNode = document.getElementsByClassName('space-box');
                    inputNode[0].value = this.testData.fillVal;
                }
            })
            //给input添加改变事件和删除键盘事件
            let inputNode = document.getElementsByClassName('space-box');
            for (let i = 0;i < inputNode.length;i++) {
                inputNode[i].addEventListener('change', this.changeInput, false);
            }
        },

        methods: {
            //答题选中
            clickInput(value) {
                let currentData = this.testData;
                if (currentData.questType === '1' || currentData.questType === '3') {
                    currentData.isSelect = true;//禁用选择
                } else if (currentData.questType === '2') {
                    if (value.length) {
                        currentData.isSelect = true;
                    } else {
                        currentData.isSelect = false;
                    }
                }
                if (currentData.isSelect) {
                    clearInterval(currentData.timer);
                    currentData.timer = null;
                }
                this.$emit('handleClickInput',value)
            },

            //填空框改变事件
            changeInput(e) {
                let val = e.target.value;
                this.testData.fillVal = val
                if (val) {
                    this.testData.isSelect = true;
                } else{
                    this.testData.isSelect = false;
                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .item-section{
        /*解决内标签margintop失效错位问题*/
        &:before{
            content: "";
            display: table;
        }
    }
    .item-title{
        margin-top: .34rem;
        /deep/.space-box{
            width: 1.76rem;
            height: .44rem;
            background-color: #eeeeee;
            border: 1px solid #333333;
            margin-left: .04rem;
            margin-right: .04rem;
            font-size: .32rem;
            line-height: .5rem;
            border-radius: 0;
            text-align: center;
        }

        > .item-type{
            width: .36rem;
            height: .36rem;
            background-color: #f59700;
            border-radius: .06rem;
            color: #ffffff;
            font-size: .26rem;
            line-height: .36rem;
            text-align: center;
            margin-right: .14rem;
            display: inline-block;
        }
        span:nth-child(n+2) {
            font-size: .32rem;
            line-height: .3rem;
        }
        span:last-child {
            margin-left: .2rem;
        }
    }

    /*题目*/
    .item-body{
        margin-top: .3rem;
        margin-bottom: .32rem;
        border-bottom: 1px solid #dcdde0;

        > div{
            img{
                vertical-align: middle;
            }
            video{
                vertical-align: middle;
            }
            margin-bottom: .32rem;
        }

        .item-body-options{
            .item-opt{
                margin-bottom: .3rem;

                input, span{
                    cursor: pointer;
                    vertical-align: middle;
                }
                span{
                    margin-left: .26rem;
                    font-size: .32rem;
                }
            }
        }
    }
</style>
