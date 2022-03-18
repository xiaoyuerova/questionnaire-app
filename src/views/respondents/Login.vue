<template>

</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios";
import apiUrl from "@/utils/api";
// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiUrl;  // 默认地址

export default Vue.extend({
  name: "Login",
  data:()=>({}),
  computed:{
    questionnaireId(){
      return eval(this.$route.params.qid)
    }
  },
  methods: {
    register(){
      const params = new URLSearchParams()
      params.append('questionnaireId',this.questionnaireId)
      axios.post('/respondents/register',params).then((res)=>{
        const data = res.data.data
        console.log(data)
        if (data.code === '0') {
          const respondentId = data.msg.respondentId
          this.$router.push('/respondents/' + this.questionnaireId + '/' + respondentId)
        }else {
          console.log('error:' + data.msg)
        }
      })
    }
  },
  created() {
    this.register()
  }
})
</script>

<style scoped>

</style>