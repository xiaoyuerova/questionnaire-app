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
import RadioQ from "@/components/home/RadioQ";
import MultipleQ from "@/components/home/MultipleQ";
// import axios from "axios";
import apiUrl from "@/utils/api";
// axios默认配置
// axios.defaults.timeout = 10000;   // 超时时间
// axios.defaults.baseURL = apiUrl;  // 默认地址
import {commonAjax} from "@/assets/common/ajax";
import {Response} from "@/assets/common/dataType";

export default {
  name: "Questionnaire",
  components: {
    MultipleQ,
    RadioQ
  },
  data: () => ({
    alertText: ['提交成功！', '有必答题未作答', '提交失败！请稍后再次尝试'],
    alertType: ['success', 'warning', 'error'],
    key: 0,
    alertShow: false
  }),
  methods: {
    // 获取问卷的所有数据
    getQuestionnaire() {
      commonAjax('/questionnaires/get', {}, 'get').then((data) => {
        if (data.code === '0') {
          const questionnaire = data.msg.questionnaire
          const questions = data.msg.questions
          const answers = data.msg.answers
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
        }else {
        //  跳转提示页面
        }
      })
    },
    // 每隔5秒自动提交一次有所更改的答案
    submitAuto() {
      setInterval(() => {
        const answers = this.collectAnswers()
        if (answers.length > 0) {
          const params = new URLSearchParams()
          params.append('respondentId', this.respondentId)
          params.append('questionnaireId', this.questionnaireId)
          params.append('answers', JSON.stringify(answers))
          axios.post('/answers/submit', params).then((res) => {
          })
        }
      }, 5000)
    },
    // 点击提交按钮，表示完成问卷：提交更改过的答案；检查是否每一题都有回答，没有问题就认定为结束作答
    submitQuestionnaire() {
      const answers = this.collectAnswers()
      if (answers.length > 0) {
        console.log(this.respondentId)
        commonAjax('/answers/submit', {
          'respondentId': this.respondentId,
          'questionnaireId': this.questionnaireId,
          'answers': JSON.stringify(answers)
        }).then(() => {
          this.complete()
        })
      } else {
        this.complete()
      }
    },
    // 完成作答
    complete() {
      // 完成作答
      console.log('complete', this.respondentId)
      commonAjax('/respondents/complete', {
        'respondentId': this.respondentId,
        'complete': 'True'
      }).then((data) => {
        const code = data.code
        console.log('code', code)
        if (code === '0') {
          this.showAlert(0)
        } else if (code === '4004') {
          this.showAlert(1)
        } else {
          this.showAlert(2)
        }
      })
    },
    // 找出要提交的答案。（有所更改的答案）
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
    // 点击提交按钮后，给出反馈
    showAlert(key) {
      this.key = key
      this.alertShow = true
      setTimeout(() => {
        this.alertShow = false
      }, 5000)
    }
  },

  computed: {
    questionnaireId(){
      return this.$store.state.questionnaire.id
    },
    respondentId(){
      return this.$store.state.respondentId
    },
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
    // this.submitAuto()
  }
}
</script>

<style scoped>

</style>