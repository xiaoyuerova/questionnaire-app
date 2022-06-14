<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row type="flex" justify="center" style="min-height: 80%;">
          <v-col
              cols="8"
              v-for="(questionBean,index) in questionBeans"
              :key="index"
              v-if="pointer === index"
          >
            <QuestionItem
                :index="index"
                :question-bean="questionBean"
                :questionnaire="questionnaire"
                >
            </QuestionItem>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import {Questionnaire, Question, Answer, QuestionBean} from "@/assets/common/dataType";
import {commonAjax} from "@/assets/common/ajax";
import Vue from "vue";
import Radio from "@/components/summer/Radio.vue";
import {matchQA, toQuestionnaire,questionSort} from "@/assets/common/common";
import QuestionItem from "../../components/summer/QuestionItem";
import {} from "jquery";


export default Vue.extend({
  name: "Home",
  components: {QuestionItem, Radio},
  props: {},
  data() {
    return {
      questionnaire: new Questionnaire(),
      questionBeans: [],
    }
  },
  methods: {
    // 获取问卷id
    setQuestionnaireId() {
      this.$store.commit('setQuestionnaireId', this.$route.params.qid)
    },
    // 获取问卷
    getQuestionnaire() {
      commonAjax('/questionnaires/summerget', {qid: this.questionnaireId}, 'get').then((data) => {
        console.log('home getQuestionnaire', data.msg)
        if (data.code === '0') {
          this.questionnaire = toQuestionnaire(data.msg.questionnaire)
          const questions = questionSort(data.msg.questions)
          const answers = data.msg.answers
          this.questionBeans = matchQA(questions, answers)
          console.log('this.questionBeans', this.questionBeans)
          this.$store.commit('setQuestionnaire', this.questionnaire)
          this.init()
        } else {
          this.loginVerify()
        }
      })
    },
    // 跳转登录界面
    loginVerify() {
      this.$router.push({
        name: 'summerLogin',
      })
    },
    // 接收服务器数据后的一系列初始化操作
    init() {
      if(this.questionBeans.length > 0){
        this.questionBeans[this.pointer].active = true
      }
    }
  },
  computed: {
    questionnaireId: function () {
      return this.$store.state.questionnaireId
    },
    pointer: function () {
      return this.$store.state.pointer
    }
  },
  mounted() {
    this.setQuestionnaireId()
    this.getQuestionnaire()
  },
  watch: {}
})
</script>

<style scoped>

</style>