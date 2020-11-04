/**
* @name: 试题区域组件
* @Author: xiao jun
* @Date: 2020-09-10
* Copyright(c) 2015-2010 xiaojun.
*/
<template>
    <div class="item-section">
        <p class="item-title">
            <span class="item-type">{{testData.questType | filterType}}</span>
            <span>{{currentIdx+1}}/{{testLength}}</span>
            <span v-html="title" ref="testTitle"></span>
        </p>
        <div class="item-body">
            <div v-show="testData.picturePath != ''||testData.videoPath != ''">
                <img :src="testData.picturePath" height="auto" width="100%" v-show="testData.picturePath">
                <video :src="testData.videoPath" height="auto" width="100%" v-show="testData.videoPath"></video>
            </div>
            <ul class="item-body-options">
                <li v-for="(item,index) in testData.itemList" :key="index" class="item-opt">
                    <label :for="'test'+currentIdx+'_'+index">
                        <input
                                :type="testData.questType == 2?'checkbox':'radio'"
                                :name="'test'+currentIdx"
                                :id="'test'+currentIdx+'_'+index"
                                :value="item.value"
                                @click="clickInput(index)"
                                class="test-default test-default-icon"
                                :class="{'test-select-icon': index == testData.correctIdx || testData.selectOpt.indexOf(index) > -1}"
                                :disabled="testData.isSelect"
                        >
                        <span>{{item.opt}}、{{item.name}}</span>
                    </label>
                </li>
            </ul>
            <div style="text-align: right" v-show="testData.questType == 2&&testData.selectOpt.length > 0 || testData.questType == 4">
                <button class="btn btn-prev" @click="checkDone" v-show="!testData.isSelect">{{testData.questType == 2&&testData.selectOpt.length > 0?'选好了':'填好了'}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "testItem",
        props: {
            currentIdx: Number,
            testLength: Number,
            testData: Object,
            handleClickInput: Function
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
                if (this.testData.questType == '4') {
                    return this.testData.testTitle.replace(new RegExp(" ", "gm"),"<input type='text' class='space-box'/>")
                } else {
                    return this.testData.testTitle
                }
            }
        },

        watch: {
            currentIdx: function () {
                //给input解除改变事件和删除键盘事件
                let inputNode = document.getElementsByClassName('space-box');
                for (let i = 0;i < inputNode.length;i++) {
                    inputNode[i].removeEventListener('change', this.changeInput, false);
                    inputNode[i].removeEventListener('keydown', this.keydownInput, false)
                }
                this.$nextTick(function () {
                    //如果已经填好了就禁止输入，并赋值
                    if (this.testData.questType == 4) {
                        let children = this.$refs.testTitle.childNodes;
                        let i = 0;
                        children.forEach(value => {
                            if(value.nodeName == 'INPUT'){
                                if (this.testData.isSelect) {
                                    value.setAttribute('disabled', 'disabled');
                                }
                                value.value = this.testData.fillVal[i]?this.testData.fillVal[i]:'';
                                i++;
                            }
                        });
                    }
                    //给input添加改变事件和删除键盘事件
                    let inputNode = document.getElementsByClassName('space-box');
                    for (let i = 0;i < inputNode.length;i++) {
                        inputNode[i].addEventListener('change', this.changeInput, false);
                        inputNode[i].addEventListener('keydown', this.keydownInput, false)
                    }
                })
            }
        },

        mounted() {
            //给input添加改变事件和删除键盘事件
            let inputNode = document.getElementsByClassName('space-box');
            for (let i = 0;i < inputNode.length;i++) {
                inputNode[i].addEventListener('change', this.changeInput, false);
                inputNode[i].addEventListener('keydown', this.keydownInput, false)
            }
        },

        methods: {
            //答题选中
            clickInput(idx) {
                let _this = this.$parent;
                let currentData = _this.testData[_this.currentIdx];
                if (currentData.questType == 1 || currentData.questType == 3) {
                    currentData.isSelect = true;//禁用选择
                    currentData.selectOpt.push(idx);
                    currentData.correctIdx = idx;
                    if (_this.currentIdx != _this.testLength - 1) {
                        setTimeout(function () {
                            if (_this.currentIdx != _this.testLength - 1) {
                                _this.currentIdx ++
                            }
                        }.bind(this),500)
                    }
                } else if (currentData.questType == 2) {
                    if (idx.toString()) {
                        currentData.selectOpt.push(idx);
                        currentData.selectOpt.sort()
                    }
                }
                if (currentData.isSelect) {
                    clearInterval(currentData.timer);
                    currentData.timer = null;
                    if (currentData.questType == 2||currentData.questType == 4) {
                        if (_this.currentIdx != _this.testLength - 1) {
                            _this.currentIdx ++
                        }
                    }
                }
                this.handleClickInput()
            },

            //填空框改变事件
            changeInput(e) {
                let val = e.target.value;
                if (!val) return;
                let inputList = document.getElementsByClassName('space-box');
                let valArr = val.split('');
                let idx;
                for (let i = 0; i < inputList.length; i++) {
                    if (inputList[i].value == val) {
                        idx = i
                    }
                }
                for (let i = 0; i < inputList.length; i++) {
                    if (i > idx && valArr[i - idx]) {
                        inputList[i].value = valArr[i - idx];
                        inputList[i].focus()
                    }
                }
                e.target.value = val[0];
            },

            //填空框删除事件
            keydownInput(e) {
                let theEvent = e || window.event;
                let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                let val = e.target.value;
                if (code == 8) {//backspace按键
                    if (!val&&e.target.previousElementSibling) {
                        e.target.previousElementSibling.focus()
                    }
                }
            },

            //选好了
            checkDone() {
                if (this.testData.questType == 4) {
                    let children = this.$refs.testTitle.childNodes;
                    let val ='';
                    children.forEach(value => {
                        if(value.nodeName == 'INPUT'){
                            value.setAttribute('disabled', 'disabled');
                            val += value.value
                        }
                    });
                    console.log(val);
                    this.testData.fillVal = val
                }
                this.testData.isSelect = true;
                this.clickInput('')
            }

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
            width: .44rem;
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
