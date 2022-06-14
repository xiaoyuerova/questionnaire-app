import {Answer, Question, QuestionBean, Questionnaire} from "@/assets/common/dataType";

export function json_to_obj(arr:Array<string>){
    /**
     * json对象解析
     * @param arr 对象的json字符串列表
     * @return 对象列表
     */
    const data = []
    for (let i = 0; i < arr.length; i++) {
        data.push(JSON.parse(arr[i]))
    }
    return data
}

export function matchQA(questions: Array<Question>, answers: Array<Answer>) {
    const questionBeans:Array<QuestionBean> = []
    for (let i = 0; i < questions.length; i++) {
        const questionBean = new QuestionBean()
        questionBean.question = questions[i]
        for (let j = 0; j < answers.length; j++) {
            if (answers[j].questionId == questions[i].id) {
                questionBean.answer = answers[j]
            }
        }
        questionBeans.push(questionBean)
    }
    return questionBeans
}

export function toQuestionnaire(q:object) {
    const questionnaire = new Questionnaire()
    for(let key in q){
        // @ts-ignore
        questionnaire[key] = q[key]
    }
    return questionnaire
}

export function questionSort(questions: Array<Question>){
    const ret = new Array<Question>(questions.length)
    for(let i=0;i<questions.length;i++){
        const index = questions[i].questionNumber - 1
        ret[index] = questions[i]
    }
    return ret
}