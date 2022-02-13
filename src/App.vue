<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store/index'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),

  store:store
});
</script>
