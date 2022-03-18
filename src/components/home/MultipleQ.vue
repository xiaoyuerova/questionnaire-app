<template>
  <v-card
      elevation="2"
  >
    <v-subheader>
      {{ index + 1 }}.{{ question.question }}
      <span style="color: #5472ff">{{ questionType[typeKey] }}</span>
    </v-subheader>
    <v-row
        justify="center">
      <v-col
          cols="11"
          class="pl-5 pr-10"
      >
        <v-row style="height: 20px" class="ma-0"></v-row>
        <v-row class="ma-0">
          <v-col
              cols="12"
              class="pa-0"
              style="position: relative"
          >
            <template v-for="(option,index) in question.options">
              <div class="pr-4" style="position: absolute">
                <div ref="checkbox">
                  <v-checkbox
                      v-model="answersLocal[index]"
                      :label="option"
                      color="blue"
                      hide-details
                      @click="submitAnswer"
                      class="py-1"
                  ></v-checkbox>
                </div>
              </div>
              <v-progress-linear
                  v-if="question.reference"
                  v-model="percentage[index]"
                  background-color=rgba(0,0,255,0.05)
                  color="rgba(0,0,255,0.2)"
                  :height="progressHeight[index]"
                  class="ml-7 mb-1"
                  rounded
              >
                <div class="d-flex justify-end pr-2" style="width: 100%;">
                  <span style="font-size: 16px;line-height: 100%">{{ percentage[index] }}%</span>
                </div>
              </v-progress-linear>
            </template>
          </v-col>
        </v-row>
        <v-row style="height: 20px" class="ma-0"></v-row>
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
      questionType: ['（单选）', '（多选）'],
      progressHeight: []
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
    },
    resetProgressHeight() {
      const height = []
      for (let i = 0; i < this.$refs.checkbox.length; i++) {
        height[i] = this.$refs.checkbox[i].offsetHeight
      }
      this.progressHeight = height
    },
  },
  computed: {
    questionnaire() {
      return this.$store.state.questionnaire
    },
    question() {
      return this.$store.state.questions[this.index]
    },
    answer() {
      return this.$store.state.answers[this.index]
    },
    percentage() {
      let total = this.questionnaire.respondentsCount
      const length = this.referenceAnswer.length
      if (total === 0) {
        return new Array(length).fill(0)
      }
      const p = new Array(length)
      for (let i = 0; i < length; i++) {
        if (this.referenceAnswer[i] <= 0) {
          p[i] = 0
        } else {
          p[i] = Math.round(100 * this.referenceAnswer[i] / total)
        }
      }
      return p
    },
    referenceAnswer() {
      return this.$store.state.referenceAnswer[this.index]
    },
    typeKey() {
      return this.question.type
    }
  },
  mounted() {
    this.resetProgressHeight()
  },
}
</script>

<style scoped>
.v-input--checkbox {
  margin-top: 0;
}
</style>