<template>

</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios";
import json_to_obj from "@/assets/common/common";

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
      axios.post('http://127.0.0.1:8010/respondents/register',params).then((res)=>{
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