/**
 * mock数据
 * @name: mock
 * @Author: xxjiushini
 */
const Mock = require('mockjs');
import { getExamQuestionList, examStartAndFinish, success } from './json/getExamQuestionList'

//格式： Mock.mock( url, post/get , 返回的数据)；

Mock.mock('/onlineExam/getExamQuestionList', 'post', getExamQuestionList);//在线考试列表
Mock.mock('/onlineExam/submitExamQuestionRecord', 'post', success);//考试答题提交
Mock.mock('/onlineExam/examStartAndFinish', 'post', examStartAndFinish);//考试开始和结束
