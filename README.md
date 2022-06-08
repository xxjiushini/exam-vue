# exam-vue-h5

### 基于vue2.x开发的在线考试移动端项目，主要题型包括单选题、多选题、判断题和填空题，答题后可以自动跳转到下一题，题库可以选择到指定题目处，练习状态绿色代表答对，红色代表答错。


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##示例
onlineTest为示例组件，位置：src/views/onlinePractice
mock文件夹为mock数据

#testItem组件API
参数 | 类型 | 必传 | 说明
:--- | :--- | :--- | :---
currentIdx | Number | true | 当前题目下标，从0开始
testLength | Number | true | 题目总数
testData | Object | true | 题目对象
handleClickInput | Function | false | 答题后想做的事情
#testOptions组件API
参数 | 类型 | 必传 | 说明
:--- | :--- | :--- | :---
currentIdx | Number | true | 当前题目下标，从0开始
testLength | Number | true | 题目总数
testData | Object | true | 题目数组
isExam | Boolean | false | 是否考试,默认为true，false为练习状态
handleCheckedTest | Function | false | 选择题目后做的事情


