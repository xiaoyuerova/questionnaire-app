export interface Response {
    'code': any,
    'msg': {
        [propName: string]: any;
    }
}

// export interface Question {
//     id: Number,
//     questionnaireId: Number,
//     questionNumber: Number,
//     type: Number,
//     model: Number,
//     question: String,
//     options: Array<boolean>,
//     optionsCount: Number,
//     reference: boolean
//     referenceAnswer: Array<Number>,
//     referenceText: String
// }
//
// export interface Questionnaire {
//     id: Number,
//     questionerId: Number,
//     name: String,
//     date: String,
//     time: String,
//     published: boolean,
//     respondentsCount: Number,
//     model: Number
// }

// export interface Answer{
//     id:Number,
//     respondentId:Number,
//     questionnaireId:Number,
//     questionId:Number,
//     reference:boolean,
//     referenceAnswer:String,
//     answer:String,
//     referenceTextAnswer:String,
//     textAnswer:String
// }

export class Answer {
    id?: Number=0
    respondentId?: Number=0
    questionnaireId?: Number=0
    questionId?: Number=0
    reference: boolean = false
    referenceAnswer = []
    answer = []
    referenceTextAnswer: String = ''
    textAnswer: String = ''
}

export class Question {
    id?: Number=0
    questionnaireId=0
    questionNumber=0
    type=0
    model=0
    question: String=''
    options: Array<boolean>=[]
    optionsCount: Number=0
    reference: boolean=false
    referenceAnswer: Array<Number>=[]
    referenceText: String=''
}

export class Questionnaire {
    id: Number=0
    questionerId: Number=0
    name: String='暂无问卷名'
    date: String=''
    time: String=''
    published: boolean=true
    respondentsCount: Number=0
    model: Number=0
}

export class QuestionBean {
    question=new Question()
    answer=new Answer()
    answerChange=false
    active=false
}
