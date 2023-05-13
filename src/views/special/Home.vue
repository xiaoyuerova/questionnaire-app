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
      cols="11"
      class="d-flex"
  >
    <h4
        style="color: #666"
      class="mt-4"
    >
      {{ questionnaire.des }}
    </h4>
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
              color="success"
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
        color="success"
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
  // inject: ['reload'],
  data(){
    return {
      questionnaire: {
        name: '人格测试问卷',
        des: '以下有关性格特征的描述有可能符合您的情况，也有可能不符合您的情况。 请对每个描述选择您同意或不同意的程度。 请综合评价每个描述中提到的两个性格特征跟您的匹配程度，即使其中一个特征比另一个特征的匹配程度更高。',
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
            '非常不同意',
            '不同意',
            '比较不同意',
            '中立',
            '比较同意',
            '同意',
            '非常同意',
        ],
        answers: new Array(10)
      },
      alertText: ['提交成功！', '有必答题未作答', '未知错误,请刷新重试'],
      alertType: ['success', 'warning', 'error'],
      key: 0,
      alertShow: false,
      startTime: new Date()
    }
  },
  methods: {
    Authentication(){
      commonAjax('/special/authentic', {'WjId': 1}, 'post').then((res) => {
        if(res.status === 200){
          // console.log(res, res.data.id)
          const data = res.data
          data.Answer = JSON.parse(data.Answer)
          this.$store.commit('setSpecialUser', data)
          this.$router.push({name: 'specialResult'})
        } else if(res.status === 204) {
          // 新用户，继续
          // console.log(res)
        }
      })
    },
    submit(){
      // 验证是否都作答
      for (let i = 0; i<this.questionnaire.answers.length;i++){
        if (this.questionnaire.answers[i] === undefined){
          this.showAlert(1)
          return
        }
      }
      const data = {
        'WjId': 1,
        'UseTime': this.useTime,
        'Answer': JSON.stringify(this.questionnaire.answers),
      }
      commonAjax('/special/submit', data, 'post').then((res) => {
        if(res.status === 201){
          const data = res.data
          data.Answer = JSON.parse(data.Answer)
          this.$store.commit('setSpecialUser', data)
          this.$router.push({name: 'specialResult'})
        }else {
          // 未知错误
          this.alertShow(2)
        }
      })
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
  mounted() {
    this.Authentication()
  },
  computed:{
    useTime(){
      const endTime = new Date()
      const useTime = endTime - this.startTime
      // console.log('useTime', useTime)
      return useTime
    }
  }
}
</script>

<style scoped>

</style>