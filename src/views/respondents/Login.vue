<template>

</template>

<script lang="ts">
import Vue from 'vue'
import {commonAjax} from "@/assets/common/ajax";

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
      // @ts-ignore
      commonAjax('/respondents/register',{
        'questionnaireId': this.questionnaireId
      }).then((data:any)=>{
        console.log(data)
        if (data.code === '0') {
          this.$store.dispatch('setUserData',data.msg).then(()=>{
            this.$router.push('/respondents')
          })
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