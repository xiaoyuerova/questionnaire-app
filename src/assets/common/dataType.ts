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
    id?: Number = 0
    respondentId?: Number = 0
    questionnaireId?: Number = 0
    questionId?: Number = 0
    reference: boolean = false
    referenceAnswer = []
    answer = []
    referenceTextAnswer: String = ''
    textAnswer: String = ''
}

export class Question {
    id?: Number = 0
    questionnaireId = 0
    questionNumber = 0
    type = 0
    model = 0
    question: String = ''
    options: Array<boolean> = []
    optionsCount: Number = 0
    reference: boolean = false
    referenceAnswer: Array<Number> = []
    referenceText: String = ''
}

export class Questionnaire {
    id: Number = 0
    questionerId: Number = 0
    name: String = '暂无问卷名'
    date: String = ''
    time: String = ''
    published: boolean = true
    respondentsCount: Number = 0
    model: Number = 0
}

export class QuestionBean {
    question = new Question()
    answer = new Answer()
    answerChange = false
    active = false
}

export class Recording {
    events:Array<any> = []
    startTime = -1
    htmlCopy = ""
    height:number | undefined=1
    width:number | undefined=1
}

class Event {
    type = ''
    x=0
    y=0
    time=Date.now()
}

export class Paper {
    Uid: String = ''
    Title: String = ''
    Author: String = ''
    Abstract: String = ''
    Title_CN: String = ''
    Abstract_CN: String = ''
    Link: String = ''
    Meeting: String = ''
    Complete: boolean = false
    Locked: boolean = false
    Select1: boolean = false
    Select2: boolean = false
}

// export interface Paper {
//     uid: String;
//     Title: String;
//     Author: String;
//     Abstract: String;
//     Title_CN: String;
//     Abstract_CN: String;
//     Link: String;
//     Meeting: String;
//     Complete: boolean;
//     Locked: boolean;
//     Select1: boolean;
//     Select2: boolean;
// }


// special app
export class SpecialUser {
    id: Number | undefined
    WjId: Number = 0
    Number: Number = 0
    Data: String = ''
    Time: String = ''
    SubmitIp: String = ''
    UseTime: Number = 0
    Agent: String = ''
    Answer: Array<Number> = []
}
