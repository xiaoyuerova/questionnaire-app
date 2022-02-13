<template>
  <v-card
  elevation="2"
  >
    <v-subheader>
      {{ index + 1 }}.{{ question.question }}
      <span style="color: #5472ff">{{questionType[typeKey]}}</span>
    </v-subheader>
    <v-row
        justify="center">
      <v-col
          cols="11"
      >
        <v-radio-group
            v-model="answerLocal"
            column
            class="pl-5 pr-10"
        >
          <template v-for="(option,index) in question.options">
            <v-progress-linear
                v-if="question.reference"
                v-model="percentage[index]"
                background-color=rgba(0,0,255,0.05)
                color="rgba(0,0,255,0.2)"
                height="24"
                class="ml-7"
                rounded
            >
              <div class="d-flex justify-end" style="width: 100%;">
                <span style="font-size: 16px;line-height: 100%">{{ referenceAnswer[index] }} 人</span>
              </div>
            </v-progress-linear>
            <v-radio
                :label=option
                color="blue"
                :value=index
                @click="submitAnswer"
                class="mt-n6"
            >
            </v-radio>
          </template>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "RadioQ",
  props: ['index'],
  data() {
    return {
      answerLocal: '',
      questionType: ['（单选）', '（多选）']
    }
  },
  computed: {
    question(){
      return this.$store.state.questions[this.index]
    },
    answer() {
      for (let i = 0; i < this.$store.state.answers[this.index].length; i++) {
        if (this.$store.state.answers[this.index][i]) {
          return i
        }
      }
      return -99
    },
    percentage() {
      let total = 0
      const length = this.referenceAnswer.length
      for (let i = 0; i < length; i++) {
        total += this.referenceAnswer[i]
      }
      const p = new Array(length)
      for (let i = 0; i < length; i++) {
        p[i] = 100 * this.referenceAnswer[i] / total
      }
      return p
    },
    referenceAnswer() {
      return this.$store.state.referenceAnswer[this.index]
    },
    typeKey(){
      return this.question.type
    }
  },
  methods: {
    submitAnswer() {
      const answer = new Array(this.question.optionsCount)
      for (let i = 0; i < this.question.optionsCount; i++) {
        answer[i] = false
      }
      answer[this.answerLocal] = true
      this.$store.commit('changeAnswer', {'index': this.index, 'value': answer})
    },
    resetSavedAnswer() {
      if (this.answer !== -99) {
        this.answerLocal = this.answer
      }
    }
  },
}
</script>

<style scoped>

</style>