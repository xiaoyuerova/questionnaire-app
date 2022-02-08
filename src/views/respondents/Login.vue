<template>
  <questionnaire/>
</template>

<script lang="ts">
import Vue from 'vue'
import Questionnaire from "@/components/home/Questionnaire.vue";
import axios from "axios";

export default Vue.extend({
  name: "Login",
  components: {
    Questionnaire,
  },

  methods: {

  }
})
</script>

<style scoped>

</style>