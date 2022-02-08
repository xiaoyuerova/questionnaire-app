<template>
  <v-card>
    <v-subheader>{{ index }}.{{ question.question }}</v-subheader>
    <v-row
        justify="center">
      <v-col
          v-for="(option,index) in question.options"
          cols="11"
      >
        <v-checkbox
            v-model="answersLocal[index]"
            :label="option"
            color="blue"
            :value="true"
            hide-details
            @click="submitAnswer"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "MultipleQ",
  props: ['question', 'index'],
  data() {
    return {
      answersLocal: []
    }
  },
  methods: {
    submitAnswer(){
      this.$store.commit('changeAnswer',{'index':this.index,'value':this.answersLocal})
      console.log(this.$store.state.answers[this.index])
    }
  },
  computed:{
    answer(){
      return this.$store.state.answers[this.index]
    }
  }
}
</script>

<style scoped>

</style>