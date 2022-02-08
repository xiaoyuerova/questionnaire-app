<template>
  <v-card>
    <v-subheader>{{ index }}.{{ question.question }}</v-subheader>
    <v-row
        justify="center">
      <v-col
          cols="11"
      >
        <v-radio-group
            v-model="answerLocal"
            column
        >
          <v-radio
              v-for="(option,index) in question.options"
              :label=option
              color="blue"
              :value=index
              @click="submitAnswer"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "RadioQ",
  props: ['question', 'index', 'answer'],
  data(){
    return{
      answerLocal:''
    }
  },
  methods: {
    submitAnswer(){
      this.$store.commit('changeAnswer',{'index':this.index,'value':this.answerLocal})
      console.log(this.$store.state.answers[this.index])
    }
  },
}
</script>

<style scoped>

</style>