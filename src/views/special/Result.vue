<template>
  <v-row justify="center">
    <v-col
        cols="10"
        sm="8"
    >
      <div id="leiDaTu" class="echart" style="width: 600px;height: 600px;"></div>
    </v-col>
  </v-row>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Result",
  computed: {
    user() {
      return this.$store.state.user
    },
    result(){
      const answer = this.user.answer
      return [
        (answer[0] + 8 - answer[5]) / 2,
        (answer[6] + 8 - answer[1]) / 2,
        (answer[2] + 8 - answer[7]) / 2,
        (answer[8] + 8 - answer[3]) / 2,
        (answer[4] + 8 - answer[9]) / 2,
      ]
    }
  },
  methods: {
    draw() {
      const option = {
        title: {
          text: "中文版10项目大五人格量表测试结果",
          x: 'center'
        },
        tooltip: {},//提示层
        legend: {
          data: ['name1']
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff', //字体颜色
              backgroundColor: '#999', //背景色
              borderRadius: 3, //圆角
              padding: [3, 5] //padding
            }
          },
          center: ['50%', '50%'],
          radius: '60%',
          startAngle: 270,
          indicator: [{
              name: '外向性',
              max: 7
            },
            {
              name: '神经质',
              max: 7
            },
            {
              name: '尽责性',
              max: 7
            },
            {
              name: '宜人性',
              max: 7
            },
            {
              name: '开放性',
              max: 7
            }
          ],
        },
        series: [{
          name: '中文版10项目大五人格量表测试结果',
          type: 'radar',
          data: [{
            value: [2,6,3,1,4],
            name: "测试结果"
          }]
        }]
      }
// 绘制图表
      const myChart = echarts.init(document.getElementById('leiDaTu'));
      myChart.setOption(option);
    }
  },
  mounted() {
    this.draw()
  }
}
</script>

<style scoped>

</style>