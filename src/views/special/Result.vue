<template>
  <v-row justify="center">
    <v-col
        cols="10"
        sm="8"
        class="d-flex justify-center"
    >
      <div id="leiDaTu" class="echart" style="width:100%;height: 500px"></div>
    </v-col>
    <v-col
        cols="10"
        sm="7"
    >
      <v-card shadow="never" style="font-size: 18px;line-height: 40px;padding: 10px;text-align: center">
        <br>
        您是第 {{ user.Number }} 位参与者 <br>
        感谢您的参与！<br><br>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as echarts from 'echarts';
import {commonAjax} from "@/assets/common/ajax";

export default {
  name: "Result",
  computed: {
    user() {
      return this.$store.state.user
    },
    result() {
      if (this.user.id === undefined)
        return
      const answer = this.user.Answer
      // console.log('answer', answer, this.$store.state.user)
      return [
        (answer[0] + 8 - answer[5]) / 2,
        (answer[6] + 8 - answer[1]) / 2,
        (answer[2] + 8 - answer[7]) / 2,
        (answer[8] + 8 - answer[3]) / 2,
        (answer[4] + 8 - answer[9]) / 2,
      ]
    }
  },
  data() {
    return {
      chart_color: [
        '#c62435',
        '#d0ca31',
        '#9793b6',
        '#ef8136',
        '#64b162',
      ]
    }
  },
  methods: {
    Authentication() {
      if (this.user.id === undefined) {
        commonAjax('/special/authentic', {'WjId': 1}, 'post').then((res) => {
          if (res.status === 200) {
            // console.log(res, res.data.id)
            const data = res.data
            data.Answer = JSON.parse(data.Answer)
            this.$store.commit('setSpecialUser', data)
            this.draw()
          } else if (res.status === 204) {
            this.$router.push({name: 'specialHome'})
          }
        })
      } else {
        this.draw()
        // console.log(this.result)
      }
    },
    draw() {
      const option = {
        title: {
          text: "人格测试结果",
          x: 'center',
        },
        // tooltip: {},//提示层
        // legend: {
        //   data: ['测试结果']
        // },
        radar: {
          name: {
            // color: '#fff', //字体颜色
            // backgroundColor: '#999', //背景色
            // borderRadius: 3, //圆角
            // padding: [3, 5] //padding
            // backgroundColor: '#333',
            fontWeight: 'bold',
            // borderRadius: 3,
            fontSize: '16',
          },
          center: ['50%', '50%'],
          radius: '60%',
          startAngle: 90,
          indicator: [{
              name: '外向性',
              max: 7,
              color: this.chart_color[0],
            },
            {
              name: '亲和性',
              max: 7,
              color: this.chart_color[1]
            },
            {
              name: '认真负责性',
              max: 7,
              color: this.chart_color[2]
            },
            {
              name: '情绪稳定性',
              max: 7,
              color: this.chart_color[3]
            },
            {
              name: '经验开放性',
              max: 7,
              color: this.chart_color[4]
            }
          ],
        },
        series: [{
          name: '人格测试结果',
          type: 'radar',
          label: {
            show: true,
            fontSize: '12',
            // color: this.chart_color
          },
          emphasis: {
            focus: 'series'
          },
          data: [{
            value: this.result,
            name: "人格测试结果"
          }]
        }]
      }
// 绘制图表
      const myChart = echarts.init(document.getElementById('leiDaTu'));
      myChart.setOption(option);
    }
  },
  mounted() {
    this.Authentication()
  }
}
</script>

<style scoped>

</style>