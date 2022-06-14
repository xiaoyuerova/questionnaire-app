<template>
  <div class="container">
    <Radio
        v-if="questionBean.question.type === 0"
        :index="index"
        :question-bean="questionBean"
        :questionnaire="questionnaire"
    >
    </Radio>
    <MultipleChoice
        v-if="questionBean.question.type === 1"
        :index="index"
        :question-bean="questionBean"
        :questionnaire="questionnaire"
    >
    </MultipleChoice>
  </div>
</template>

<script>
import Radio from "./Radio";
import {QuestionBean, Questionnaire} from "../../assets/common/dataType";
import MultipleChoice from "./multipleChoice";
export default {
  name: "QuestionItem",
  components: {MultipleChoice, Radio},
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
    }
  },
}
</script>

<style scoped>
.container{
  /*width: 100%;*/
  /*height: 100%;*/
}
</style>