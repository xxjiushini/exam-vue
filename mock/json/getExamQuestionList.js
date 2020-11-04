//考试题目
import Mock from 'mockjs'

export const getExamQuestionList = () => {
    const template = {
        'code': '1',
        'msg': "成功",
        'data': {
            "examId":1,
            "examTitle":"试卷1",
            "questNum":100,
            "passScore": 90,
            "totalPoints": 100,
            "questLimitTime": 60,
            'questionIdList|25': [
                {
                    "questId|+1": 0,
                    "title": '中国的首都是____市',
                    "picturePath": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2320683392,2920340983&fm=26&gp=0.jpg",
                    "videoPath": "",
                    "questType": "1",
                    "isCollect": "0",
                    "note": '中国的首都是北京市。',
                    "answerSize": "4",
                    "answer1Content": '北京',
                    "answer2Content": '上海',
                    "answer3Content": '广州',
                    "answer4Content": '深圳',
                    "rightAnswer": 'A'

                },{
                    "questId|+1": 25,
                    "title": '中国的直辖市包括以下哪几个城市？',
                    "picturePath": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1062172043,1293830134&fm=26&gp=0.jpg",
                    "videoPath": "",
                    "questType": "2",
                    "isCollect": "0",
                    "note": '中国的直辖市有北京、上海、天津、重庆四个城市。',
                    "answerSize": "4",
                    "answer1Content": '北京',
                    "answer2Content": '上海',
                    "answer3Content": '广州',
                    "answer4Content": '深圳',
                    "rightAnswer": 'AB'

                },
                {
                    "questId|+1": 50,
                    "title": '中国的首都是北京市。',
                    "picturePath": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3603893631,209686407&fm=26&gp=0.jpg",
                    "videoPath": "",
                    "questType": "3",
                    "isCollect": "0",
                    "note": '中国的首都是北京市。',
                    "answerSize": "2",
                    "answer1Content": '正确',
                    "answer2Content": '错误',
                    "answer3Content": '',
                    "answer4Content": '',
                    "rightAnswer": 'A'

                },
                {
                    "questId|+1": 75,
                    "title": '中国的首都是  市。',
                    "picturePath": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2659576705,3666155568&fm=15&gp=0.jpg",
                    "videoPath": "",
                    "questType": "4",
                    "isCollect": "0",
                    "note": '中国的首都是北京市。',
                    "answerSize": "0",
                    "answer1Content": '',
                    "answer2Content": '',
                    "answer3Content": '',
                    "answer4Content": '',
                    "rightAnswer": '北京'

                }
            ]
        },
    }
    return Mock.mock(template)
}

export const examStartAndFinish = () => {
    const template = {
        'code': '1',
        'msg': "成功",
        'data': {
            "examStartTime": '@datetime("yyyy-MM-dd A HH:mm:ss")',
            "examScore": "90",
            "examCostTime": "2000"
        },
    }
    return Mock.mock(template)
}

export const success = () => {
    const template = {
        'code': '1',
        'msg': "成功",
    }
    return Mock.mock(template)
}
