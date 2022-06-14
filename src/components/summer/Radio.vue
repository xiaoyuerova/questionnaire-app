<template>
  <v-row justify="center" class="container">
    <v-card>
      <v-row type="flex" justify="center" align="center" style="min-height: 760px">
        <v-col cols="9">
          <v-card-title>
            {{ questionBean.question.questionNumber }}.{{ questionBean.question.question }}
            <span style="color: #5472ff">（单选）</span>
          </v-card-title>
          <v-radio-group
              v-model="radio"
              column
          >
            <v-col
                v-for="(option,index) in questionBean.question.options"
                @click="click(index)"
            >
              <div :class="[radio===index?optionActive[0]:optionUnselected[0]]">
                <div :class="[radio===index?optionActive[1]:optionUnselected[1]]"></div>
                <p :class="[radio===index?optionActive[2]:optionUnselected[2]]">{{ option }}</p>
              </div>
            </v-col>
          </v-radio-group>
          <v-row justify="center" style="margin-top: 30px">
            <v-btn
                v-show="buttonShow"
                elevation="2"
                color="#5178EF"
                x-large
                @click="submit"
            >
              <span style="color: #FFFFFF;font-weight: normal; font-size: 24px">提交</span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>

import {QuestionBean, Questionnaire} from "@/assets/common/dataType";

export default {
  name: "Radio",
  props: {
    index: {
      type: Number,
      default: 0
    },
    questionBean: {
      type: QuestionBean,
      default: function () {
        return new QuestionBean()
      }
    },
    questionnaire: {
      type: Questionnaire,
      default: function () {
        return new Questionnaire()
      }
    },
    buttonShow:{
      type:Boolean,
      default: true
    }
  },
  data() {
    return {
      radio: '',
      oldRadio: '',
      progressHeight: [],
      optionActive: ['option-box','option-circle','option-text'],
      optionUnselected: ['option-box-unselected','option-circle-unselected','option-text-unselected']
    }
  },
  methods: {
    init() {
      if (this.questionBean.answer.answer.length === 0) {
        return
      }
      for (let i = 0; i < this.questionBean.answer.answer.length; i++) {
        if (this.questionBean.answer.answer[i]) {
          this.radio = i
          this.oldRadio = i
          break
        }
      }
    },
    click(index) {
      this.radio = index
      const answer = new Array(this.questionBean.question.optionsCount)
      for (let i = 0; i < this.questionBean.question.optionsCount; i++) {
        answer[i] = false
      }
      answer[this.radio] = true
      this.questionBean.answer.answer = answer
    },
    submit(){
      this.$store.commit('pointerAdd')
    }
  },
  computed: {
    // 记录答案是否被修改
    change: function () {
      return this.radio !== this.oldRadio
    },
    percentage() {
      let total = this.questionnaire.respondentsCount
      const referenceAnswer = this.questionBean.question.referenceAnswer
      const length = referenceAnswer.length
      if (total === 0) {
        return new Array(length).fill(0)
      }
      const p = new Array(length)
      for (let i = 0; i < length; i++) {
        if (referenceAnswer[i] === 0) {
          p[i] = 0
        } else {
          p[i] = Math.round(100 * referenceAnswer[i] / total)
        }
      }
      return p
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

.v-card {
  width: 100%;
  height: 100%;
  min-height: 760px;
  min-width: 600px;
  padding: 40px 60px;
  /*margin-top: 40px;*/
}

.container {
  height: 100%;
}

.option-box {
  position: relative;
  display: flex;
  height: 48px;
  border-radius: 10px;
  background: #5178EF;
  gap: 28px;
}

.option-box-unselected {
  position: relative;
  display: flex;
  height: 48px;
  border-radius: 10px;
  background: #F5F5F5;
  gap: 28px;
}

.option-circle {
  /* 矩形 2 */
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 9px solid #FFFFFF;
  margin-left: 28px;
  margin-top: -14px;
}

.option-circle-unselected {
  /* 矩形 2 */
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 3px solid #C1C1C1;
  margin-left: 28px;
  margin-top: -14px;
}

.option-text {
  line-height: 48px;
  margin-left: 88px;
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 0;
  color: #FFFFFF;
}

.option-text-unselected {
  line-height: 48px;
  margin-left: 88px;
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 0;
  color: #333333;
}

</style>