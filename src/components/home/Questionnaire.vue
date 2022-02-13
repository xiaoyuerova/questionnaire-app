<template>
  <v-container
      class="py-8 px-6"
      fluid
  >
    <v-row
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          class="d-flex justify-center"
      >
        <h2>
          {{ this.questionnaire.name }}
        </h2>
      </v-col>
      <v-col
          v-for="(question,index) in questions"
          :key="index"
          cols="12"
          sm="8"
      >
        <radio-q v-if="question.type === 0" :index="index" ref="child"></radio-q>
        <multiple-q v-if="question.type === 1" :index="index" ref="child"></multiple-q>
      </v-col>
      <v-col
          cols="12"
          sm="8"
          class="d-flex justify-center pb-0"
      >
        <div
            style="width: 100%;height: 40px"
            class="d-flex justify-center">
          <v-alert
              v-model="alertShow"
              :type="alertType[key]"
              class="mb-0"
              dense
          >
            {{ alertText[key] }}
          </v-alert>
        </div>
      </v-col>
      <v-col
          cols="12"
          sm="8"
          class="d-flex justify-center"
      >
        <v-btn
            color="primary"
            @click="submitQuestionnaire"
            class="mb-10"
        >提交问卷
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import json_to_obj from "@/assets/common/common.ts"
import RadioQ from "@/components/home/RadioQ";
import MultipleQ from "@/components/home/MultipleQ";

export default {
  name: "Questionnaire",
  components: {
    MultipleQ,
    RadioQ
  },
  data: () => ({
    questionnaireId: '',
    respondentId: '',
    alertText: ['提交成功！', '提交失败！', '答案未修改，无需提交'],
    alertType: ['success', 'error', 'warning'],
    key:0,
    alertShow: false
  }),
  methods: {
    getQuestionnaire() {
      this.questionnaireId = this.$route.params.qid
      this.respondentId = this.$route.params.rid
      axios.get('http://127.0.0.1:8010/questionnaires/get', {
        params: {
          'respondentId': this.respondentId,
          'questionnaireId': this.questionnaireId
        }
      }).then((res) => {
        const questionnaire = res.data.data.msg.questionnaire
        const questions = res.data.data.msg.questions
        const answers = res.data.data.msg.answers
        this.$store.commit('setQuestionnaire', questionnaire)
        this.$store.commit('setQuestions', questions)
        if (answers) {
          this.$store.commit('setAnswers', answers)
          this.$nextTick(() => {
            for (let i = 0; i < this.questions.length; i++) {
              this.$refs.child[i].resetSavedAnswer()
            }
          });
        }
      })
    },
    submit() {
      setInterval(() => {
        const answers = this.collectAnswers()
        if (answers.length > 0) {
          const params = new URLSearchParams()
          params.append('respondentId', this.respondentId)
          params.append('questionnaireId', this.questionnaireId)
          params.append('answers', JSON.stringify(answers))
          axios.post('http://127.0.0.1:8010/answers/submit', params).then((res) => {
          })
        }
      }, 10000)
    },
    submitQuestionnaire() {
      const answers = this.collectAnswers()
      if (answers.length > 0) {
        const params = new URLSearchParams()
        params.append('respondentId', this.respondentId)
        params.append('questionnaireId', this.questionnaireId)
        params.append('answers', JSON.stringify(answers))
        axios.post('http://127.0.0.1:8010/answers/submit', params).then((res) => {
          const code = res.data.data.code
          console.log('code',code)
          if (code === '0'){
            this.showAlert(0)
          }else {
            this.showAlert(1)
          }
        })
      }else {
        this.showAlert(2)
      }
    },
    collectAnswers() {
      const answers = []
      for (let i = 0, l = this.answersChange.length; i < l; i++) {
        if (this.answersChange[i]) {
          const answer = {
            'questionId': this.questionIds[i],
            'reference': this.questions[i].reference,
            'referenceAnswer': this.questions[i].referenceAnswer,
            'answer': this.answers[i]
          }
          answers.push(answer)
        }
      }
      this.$store.commit('resetAnswersChange')
      return answers
    },
    showAlert(key){
      this.key = key
      this.alertShow = true
      setTimeout(()=>{
        this.alertShow = false
      },5000)
    }
  },

  computed: {
    questionnaire() {
      return this.$store.state.questionnaire
    },
    questions() {
      return this.$store.state.questions
    },
    answers() {
      return this.$store.state.answers
    },
    questionIds() {
      return this.$store.state.questionIds
    },
    answersChange() {
      return this.$store.state.answersChange
    }
  },

  created() {
    this.getQuestionnaire()
    this.submit()
  }
}
</script>

<style scoped>

</style>