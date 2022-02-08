<template>
  <questionnaire/>
</template>

<script lang="ts">
import Vue from 'vue'
import Questionnaire from "@/components/home/Questionnaire.vue";
import axios from "axios";

export default Vue.extend({
  name: 'Home',

  components: {
    Questionnaire,
  }
})
</script>
