/**
 * 在线考试和练习api
 * @name: api
 * @Author: xxjiushini
 */
import {post, get} from './index.js'

export default {

    getExamQuestionList: data => post('/onlineExam/getExamQuestionList', data), // 考试题目列表
    submitExamQuestionRecord: data => post('/onlineExam/submitExamQuestionRecord', data), // 提交考试答题记录
    examStartAndFinish: data => post('/onlineExam/examStartAndFinish', data), // 考试开始和结束
}
