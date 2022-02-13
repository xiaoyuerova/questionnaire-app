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
          cols="11">
        <v-row style="height: 20px"></v-row>
        <v-row>
          <v-col
              cols="12"
          >
            <div
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
                <v-checkbox
                    v-model="answersLocal[index]"
                    :label="option"
                    color="blue"
                    style="height: 32px;margin: 0;padding: 0"
                    hide-details
                    @click="submitAnswer"
                    class="mt-n6"
                ></v-checkbox>
              </template>
            </div>
          </v-col>
        </v-row>
        <v-row style="height: 20px"></v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "MultipleQ",
  props: ['index'],
  data() {
    return {
      answersLocal: [],
      questionType: ['（单选）', '（多选）']
    }
  },
  methods: {
    submitAnswer() {
      const answer = new Array(this.question.optionsCount)
      for (let i = 0; i < this.question.optionsCount; i++) {
        answer[i] = !!this.answersLocal[i];
      }
      this.$store.commit('changeAnswer', {'index': this.index, 'value': answer})
    },
    resetSavedAnswer() {
      this.answersLocal = this.answer
    }
  },
  computed: {
    question(){
      return this.$store.state.questions[this.index]
    },
    answer() {
      return this.$store.state.answers[this.index]
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
  }
}
</script>

<style scoped>

</style>