<template>
  <v-app>
    <v-main>
      <v-container
          class="py-8 px-6"
          fluid
      >
        <v-row
            justify="center"
        >
          <v-col
              v-for="(question,index) in questions"
              :key="question"
              cols="10"
              >
            <radio-q v-if="question.type === 0" :question="question" :index="index" :answer="answers[index]"></radio-q>
            <multiple-q v-if="question.type === 0" :question="question" :index="index"></multiple-q>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
  }),
  methods: {
    getQuestionnaire() {
      console.log(this.$route.params)
      const questionnaireId = this.$route.params.qid
      console.log('questionnaireId', questionnaireId)
      axios.get('http://127.0.0.1:8010/questionnaires/get', {
        params: {
          'questionnaireId': questionnaireId
        }
      }).then((res) => {
        const data = json_to_obj(res.data.data.msg)
        console.log(data)
        this.$store.commit('change',data)
      })
    },
  },

  computed:{
    questions(){
      return this.$store.state.questions
    },
    answers(){
      return this.$store.state.answers
    }
  },

  mounted() {
    this.getQuestionnaire()
  }
}
</script>

<style scoped>

</style>