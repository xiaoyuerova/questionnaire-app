<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>

      <v-btn
          href="/"
          target="_blank"
          text
      >
        <span class="mr-2">发布问卷</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="pt-4" style="background-color: #f1f1f6">
      <questionnaire/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Questionnaire from "@/components/home/Questionnaire.vue";

export default Vue.extend({
  name: 'Home',

  components: {
    Questionnaire,
  }
})
</script>
