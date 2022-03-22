import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        questionnaire: '',
        questions: Array<object>(),
        questionIds: Array<number>(),
        answers: Array<Array<boolean>>(),
        answersChange: Array<boolean>(),
        referenceAnswer: Array<Array<number>>(),
    },
    mutations: {
        setQuestionnaire(state, questionnaire){
            state.questionnaire = questionnaire
        },
        setQuestions(state, qs) {
            // 以问题的题号作为questions，questionIds，answers，answersChange数组的下标
            const length = qs.length
            const tempQuestions = new Array<object>(length)
            const tempQuestionIds = new Array(length)
            const tempAnswers = new Array<Array<boolean>>(length)
            const tempAnswersChange = new Array<boolean>(length)
            const tempReferenceAnswer = Array<Array<number>>(length)
            for (let i = 0; i < length; i++) {
                const index = qs[i].questionNumber - 1
                tempQuestions[index] = qs[i]
                tempQuestionIds[index] = qs[i].id
                tempAnswers[index] = new Array<boolean>(qs[i].optionsCount)
                tempAnswersChange[index] = false
                tempReferenceAnswer[index] = eval(qs[i].referenceAnswer)
            }
            state.questions = tempQuestions
            state.questionIds = tempQuestionIds
            state.answers = tempAnswers
            state.answersChange = tempAnswersChange
            state.referenceAnswer = tempReferenceAnswer
        },
        setAnswers(state, as) {
            for (let i = 0; i < as.length; i++) {
                const answerObj = as[i]
                for (let j = 0; j < state.questionIds.length; j++) {
                    const questionObj = state.questions[j]
                    // @ts-ignore
                    if (answerObj.questionId === questionObj.id) {
                        state.answers[j] = eval(answerObj.answer)
                    }
                }
            }
        },
        changeAnswer(state, {index, value}) {
            // @ts-ignore
            state.answers[index] = value
            state.answersChange[index] = true
        },
        resetAnswersChange(state) {
            for (let i = 0; i < state.answersChange.length; i++) {
                state.answersChange[i] = false
            }
        }
    },
    actions: {},
    modules: {}
})
