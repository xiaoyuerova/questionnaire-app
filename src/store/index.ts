import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        questions: [],
        answers: []
    },
    mutations: {
        change(state, qs) {
            state.questions = qs
        },
        changeAnswer(state, {index, value}) {
            // for(let i =0;i<value.length;i++){
            //     if(value[i] === null){
            //         value[i] = false
            //     }
            // }
            // @ts-ignore
            state.answers[index] = value
        }
    },
    actions: {},
    modules: {}
})
