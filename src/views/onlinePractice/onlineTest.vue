/**
* @name: 在线考试页面
* @Author: xiao jun
* @Date: 2020-09-10
* Copyright(c) 2015-2010 xiaojun.
*/
<template>
    <div>
        <main class="main-item" v-if="!startTestVisible&&testData.length > 0">
            <!--答题区-->
            <div class="main-left">
                <testItem
                        :currentIdx="currentIdx"
                        :testLength="testLength"
                        :testData="testData[currentIdx]"
                        :handleClickInput="handleClickInput"
                >
                </testItem>

                <div class="item-tools">
                    <div>
                        <button class="btn btn-prev" @click="currentIdx--" v-show="currentIdx != 0">上一题</button>
                        <button class="btn btn-next" @click="currentIdx++" v-show="currentIdx != testLength - 1" :class="{'margin-left-0': currentIdx == 0}">下一题</button>
                    </div>
                </div>
                <div class="done-div">
                    <button class="btn btn-done" @click="doneTestBtn(true)">交卷</button>
                </div>

                <div class="test-bottom">
                    <a href="javascript:void (0)" @click="showTestOpt">
                        题库
                    </a>
                    <div class="count-time">
                        <i class="icon-time"></i>
                        <ul class="count-down">
                            <li>{{ countDownTime.split(':')[0] }}</li>
                            <li>:</li>
                            <li>{{ countDownTime.split(':')[1] }}</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div style="height: 1rem;width: 100%;"></div>

            <van-popup v-model="testOptionsShow" position="bottom" :style="{ height: '70%' }">
                <!--题库区-->
                <testOptions
                        :currentIdx="currentIdx"
                        :testData="testData"
                        :testLength="testLength"
                        :isExam="true"
                        :handleCheckedTest="handleCheckedTest"
                >
                </testOptions>
            </van-popup>

        </main>

        <!--开始答题-->
        <el-dialog
                title=""
                :visible.sync="startTestVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="colseStartTest"
                top="25vh"
                center
                v-if="testData.length > 0">
            <div class="dialog-start-test">
                <p class="dl-dialog-title">根据相关通知，考试系统全面升级，在全真考试下，无法修改答案！</p>
                <div class="dl-dialog-body">
                    <p>试题数量：<span>{{testLength}}题</span></p>
                    <p>考试时间：<span>{{timeTotal}}分钟</span></p>
                    <p>合格标准：<span>满分{{totalGrade}}分，{{passGrade}}分及格</span></p>
                </div>
            </div>
            <span slot="footer">
                <button class="btn btn-prev" @click="$router.back(-1)">返回</button>
                <button class="btn btn-next" @click="startTestBtn()">开始考试</button>
            </span>
        </el-dialog>

        <!--交卷弹窗-->
        <el-dialog
                title=""
                :visible.sync="endTestVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="colseEndTest"
                top="25vh"
                center>
            <div class="dialog-end-test">
                <p>已经答题{{answerCount}}题，得分{{grade}}分，是否交卷？</p>
            </div>
            <span slot="footer">
                <button class="btn btn-prev" @click="endTestVisible = false">返回</button>
                <button class="btn btn-next" @click="confirmDoneTestBtn()">确认交卷</button>
            </span>
        </el-dialog>

        <!--通过弹窗-->
        <el-dialog
                title=""
                :visible.sync="passTestVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="colsePassTest"
                center>
            <div class="dialog-test-pass">
                <img src="@/assets/images/open_sltg.png" height="auto" width="100%"/>
                <div>
                    <p>分数：<span>{{grade}}分</span></p>
                    <p>用时：<span>{{testTime}}</span></p>
                </div>
            </div>
            <span slot="footer">
                <button class="btn btn-prev" @click="$router.push('/index')">返回</button>
            </span>
        </el-dialog>

        <!--未通过弹窗-->
        <el-dialog
                title=""
                :visible.sync="failTestVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="colsePassTest"
                center>
            <div class="dialog-test-pass">
                <img src="@/assets/images/open_bjg.png" height="auto" width="100%"/>
                <div>
                    <p>分数：<span>{{grade}}分</span></p>
                    <p>用时：<span>{{testTime}}</span></p>
                </div>
            </div>
            <span slot="footer">
                <button class="btn btn-prev" @click="$router.push('/index')">返回</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api/api';
    import testItem from './components/testItem';
    import testOptions from './components/testOptions';
    export default {
        name: "onlineTest",
        components: {testItem, testOptions},
        data() {
            return {
                currentIdx: 0,//当前选中题目序号
                testLength: 0,//题目总数
                testData: [],//试题列表
                //以上必须参数

                examId: '',//试卷ID
                countDownTime: '00:00',//考试时间
                timeTotal: 0,//总考试时间
                testTime: '',//用时
                testTimer: null,//计时器
                grade: 0,//得分
                totalGrade: 0,//总分
                passGrade: 0,//及格分
                testOptionsShow: false,//题目列表显示与隐藏

                startTestVisible: false,//开始考试弹窗隐藏显示
                endTestVisible: false,//结束考试弹窗隐藏显示
                passTestVisible: false,//通过考试弹窗隐藏显示
                failTestVisible: false,//未通过考试弹窗隐藏显示

            }
        },

        computed: {
            //答题数
            answerCount() {
                let newArr = this.testData.filter(value => {
                    return value.isSelect == true
                })
                return newArr.length
            },
        },

        created() {
            this.getTest()

        },

        mounted() {

        },

        methods: {
            //获取题目
            async getTest() {
                this.testData = [];
                let params = {
                    userId: "001",
                };
                let res = await api.getExamQuestionList(params);
                console.log(res);
                if (res.code != 1) return this.$toast(res.msg);
                this.startTestVisible = true;//开始考试弹窗
                let list = res.data.questionIdList;
                this.testLength = res.data.questNum;//题目数
                this.examId = res.data.examId;//试卷ID
                this.countDownTime = `${res.data.questLimitTime}:00`;//考试时间
                this.timeTotal = res.data.questLimitTime;//总考试时间
                this.totalGrade = res.data.totalPoints;//总分
                this.passGrade = res.data.passScore;//及格分
                let newList = list.map((value, key) => {
                    let temp = {
                        testTitle: value.title,
                        testId: value.questId,
                        questType: value.questType,//1：单选，2：多选，3：判断，4：填空
                        itemList: [
                            {
                                value:'0',
                                opt: 'A',
                                name: value.answer1Content,
                            },
                            {
                                value:'1',
                                opt: 'B',
                                name: value.answer2Content,
                            },
                            {
                                value:'2',
                                opt: 'C',
                                name: value.answer3Content,
                            },
                            {
                                value:'3',
                                opt: 'D',
                                name: value.answer4Content,
                            },
                            {
                                value:'4',
                                opt: 'E',
                                name: value.answer5Content,
                            },
                            {
                                value:'5',
                                opt: 'F',
                                name: value.answer6Content,
                            }
                        ],
                        picturePath: value.picturePath,//图片路径
                        videoPath: value.videoPath,//视频路径
                        isSelect: false,
                        correctIdx: null,//正确
                        selectOpt: [],//多选选择后数组
                        fillVal: '',//填空题
                        answerTime: 0,//答题时间
                        timer: setInterval(() => {
                            if (!this.startTestVisible && this.currentIdx == key) {
                                temp.answerTime ++
                            }
                        }, 1000)
                    };
                    let answerSize = 0;
                    temp.itemList.forEach((value1) => {
                        if (value1.name) {
                            answerSize ++
                        }
                    });
                    temp.itemList = temp.itemList.splice(0, answerSize);
                    return temp
                })
                this.testData = newList;
                console.log(this.testData);

            },

            //答题后方法
            handleClickInput() {
                console.log("答题后想做的事情");
            },

            showTestOpt() {
                this.testOptionsShow = true
            },

            //右侧选择题目
            handleCheckedTest(idx) {
                console.log("选择题目后做的事情");
            },

            //开始考试按钮
            startTestBtn() {
                this.startTestVisible = false;
                this.countTime()
            },

            //交卷按钮
            async doneTestBtn(hand) {
                let m = this.timeTotal - 1 - this.countDownTime.split(':')[0];
                let s = 60 - this.countDownTime.split(':')[1];
                if (s == 60) {
                    m = m + 1;
                    s = 0
                }
                if (m < 10) {
                    m = '0'+m
                }
                if (s < 10) {
                    s = '0'+s
                }
                this.testTime = `${m}:${s}`;

                let qList = this.testData.map(value => {
                    let temp = {
                        questId: value.testId,
                        questAnswer: value.correctIdx != null?value.itemList[value.correctIdx].name: '',
                        answerTime: value.answerTime,
                    };
                    if (value.questType != '4') {
                        value.selectOpt.forEach((value2, index2) => {
                            switch (value2 + '') {
                                case '0':value.selectOpt[index2] = 'A';break;
                                case '1':value.selectOpt[index2] = 'B';break;
                                case '2':value.selectOpt[index2] = 'C';break;
                                case '3':value.selectOpt[index2] = 'D';break;
                                case '4':value.selectOpt[index2] = 'E';break;
                                case '5':value.selectOpt[index2] = 'F';
                            }
                        });
                        temp.questAnswer = value.selectOpt.join('')
                    } else {
                        temp.questAnswer = value.fillVal
                    }
                    return temp
                })
                //1.先交卷给后台计算分值
                let params = {
                    userId: "001",
                    questList: qList,
                };
                console.log(params);
                let res = await api.submitExamQuestionRecord(params);
                if (res.code != 1) return this.$toast(res.msg);
                // 2.再请求后台返回分值和用时
                let params2 = {
                    userId: "001",
                };
                let res2 = await api.examStartAndFinish(params2);
                if (res.code != 1) return this.$toast(res.msg);
                this.grade = res2.data.examScore;//成绩
                //手动交卷or时间到了自动交卷
                if (hand) {
                    this.endTestVisible = true;
                }
            },

            //确认交卷按钮
            confirmDoneTestBtn() {
                this.endTestVisible = false;
                clearInterval(this.testTimer);
                this.testTimer = null;

                if (this.grade >= this.passGrade) {
                    this.passTestVisible = true
                } else {
                    this.failTestVisible = true
                }

            },

            //关闭开始考试弹窗事件
            colseStartTest() {
                this.$router.back(-1)
            },

            //关闭交卷弹窗事件
            colseEndTest() {
                this.endTestVisible = false
            },

            //关闭通过考试弹窗事件
            colsePassTest() {
                this.$router.push('/index')
            },

            // 考试倒计时
            countTime () {
                // 时间差
                let differTime = this.timeTotal * 60 * 1000;

                // 递归调用函数所以是延时器不是定时器
                this.testTimer = setInterval(function () {
                    differTime = differTime - 1000;
                    // 定义变量,h,m,s保存倒计时的时间
                    let m, s;
                    if (differTime > 0) {
                        m = Math.floor(differTime / 1000 / 60);
                        s = Math.floor(differTime / 1000 % 60);
                        m = m < 10 ? ('0' + m) : m;
                        s = s < 10 ? ('0' + s) : s;
                        this.countDownTime = `${m}:${s}`
                    } else {
                        m = '00';
                        s = '00';
                        this.countDownTime = `${m}:${s}`;
                        clearInterval(this.testTimer);
                        this.testTimer = null;
                        this.doneTestBtn(false);//自动交卷
                        this.confirmDoneTestBtn()
                    }
                    // console.log(this.countDownTime);
                }.bind(this), 1000);
                // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
                this.$once('hook:beforeDestroy', () => {
                    clearInterval(this.testTimer);
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .main-item{
        width: 6.56rem;
        margin: 0 auto;
        height: 100%;
    }

    /*答题区*/
    .main-left{
        overflow-y: auto;
        /*按钮区*/
        .item-tools{
            text-align: center;
        }

        .done-div{
            position: fixed;
            bottom: .12rem;
            left: 0;
            width: 100%;
            text-align: center;
            button{
                width: 6.56rem;
                height: .78rem;
            }
        }

    }

    .test-bottom{
        margin-top: .48rem;
        display: flex;
        justify-content: space-between;
        .count-time{
            display: flex;
            .icon-time{
                width: .36rem;
                height: .36rem;
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
    }

    /*答题开始弹窗*/
    .dialog-start-test{
        .dl-dialog-title{
            font-size: .28rem;
            line-height: .36rem;
            color: $orange1;
            text-indent: 2em;
        }
        .dl-dialog-body{
            margin-top: .22rem;
            padding: .32rem;
            background-color: #f5f7fa;
            border-radius: .06rem;
            p{
                color: #666666;
                line-height: .48rem;
                font-size: .26rem;
                > span{
                    color: #000000;
                }
            }
        }
    }

    /*答题结束弹窗*/
    .dialog-end-test{
        margin-bottom: .18rem;
        text-align: center;
        p {
            font-size: .32rem;
            line-height: .48rem;
            color: #000000;
        }
    }

    /*答题通过弹窗*/
    .dialog-test-pass{
        text-align: center;
        img{
            width: 100%;
            vertical-align: middle;
        }
        > div{
            display: flex;
            justify-content: center;
            margin-top: .24rem;
            p {
                font-size: .32rem;
                line-height: .48rem;
                color: #333333;
                &:nth-child(1){
                    > span{
                        color: #14d100;
                    }
                }
                &:nth-child(2) > span{
                    color: #f29500;
                }
            }
        }
    }
</style>
