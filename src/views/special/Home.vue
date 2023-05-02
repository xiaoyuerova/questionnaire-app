<template>
<v-row justify="center">
  <v-col
      cols="11"
      class="d-flex justify-center"
  >
    <h2>
      {{ questionnaire.name }}
    </h2>
  </v-col>
  <v-col
      v-for="(item, index) in questionnaire.items"
      :key="index"
      cols="11"
  >
    <v-card>
      <v-card-title>
        {{ index + 1 }}. {{ item }}
      </v-card-title>
        <v-radio-group
            v-model="questionnaire.answers[index]"
            class="ml-8"
        >
          <v-radio
              v-for="n in 7"
              :key="n"
              :label="questionnaire.options[n-1]"
              :value="n"
          ></v-radio>
        </v-radio-group>
    </v-card>
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
        @click="submit"
        class="mb-10"
    >提交问卷
    </v-btn>
  </v-col>
</v-row>
</template>

<script>
import {commonAjax} from "../../assets/common/ajax";

export default {
  name: "home",
  data(){
    return {
      questionnaire: {
        name: '中文版10项目大五人格量表',
        des: 'Here are a number of personality traits that may or may not apply to you. Please write a number next to each statement to indicate the extent to which you agree or disagree with that statement. You should rate the extent to which the pair of traits applies to you, even if one characteristic applies more strongly than the other.\n' +
            '1 = Disagree strongly\n' +
            '2 = Disagree moderately\n' +
            '3 = Disagree a little\n' +
            '4 = Neither agree nor disagree\n' +
            '5 = Agree a little\n' +
            '6 = Agree moderately\n' +
            '7 = Agree strongly\n',
        items: [
            '外向的, 热情的',
            '挑剔的, 爱争论的',
            '可靠的, 自律的',
            '焦虑的, 易心烦的',
            '愿意接触新事物的, 思维复杂的',
            '内敛的, 安静的',
            '有同情心的, 温暖的',
            '缺乏条理的, 粗心的',
            '冷静的, 情绪稳定的',
            '循规蹈矩的, 缺乏创造性的'
        ],
        options: [
            '强烈反对',
            '适度不同意',
            '有点不同意',
            '既不同意也不反对',
            '有点同意',
            '比较同意',
            '强烈同意',
        ],
        answers: new Array(10)
      },
      alertText: ['提交成功！', '有必答题未作答', '提交失败！请稍后再次尝试'],
      alertType: ['success', 'warning', 'error'],
      key: 0,
      alertShow: false
    }
  },
  methods: {
    Authentication(){
      commonAjax('/special/info', {}, 'get').then((res) => {
        if(res.status === 204){
          this.$router.push({name: 'specialThankyou'})
        }
      })
    },
    submit(){
      commonAjax('/special/answer', {answers: this.questionnaire.answers}, 'post').then((res) => {
        if(res.status === 200){
          this.
          this.$router.push({name: 'specialResult'})
        }
      })
      this.$router.push({name: 'specialResult'})
    }
  },
  mounted() {
    this.Authentication()
  },
}
</script>

<style scoped>

</style>