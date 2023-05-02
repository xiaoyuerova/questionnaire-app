<template>
  <v-app>
<!--    <v-navigation-drawer app>-->
<!--      <router-link to="specialResult"> specialResult </router-link>-->

<!--    </v-navigation-drawer>-->

    <v-app-bar app>
      <!-- -->
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <v-row justify="center">
        <v-col
            cols="12"
            sm="10"
            md="8">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import {commonAjax} from "../../assets/common/ajax";

export default {
  name: "layout",
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>