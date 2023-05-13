<template>
  <v-app>
<!--    <v-navigation-drawer app>-->
<!--      <router-link to="specialResult"> specialResult </router-link>-->

<!--    </v-navigation-drawer>-->

    <v-app-bar
        app>
      <v-img
          contain
          class="ml-4"
          max-height="40"
          max-width="40"
          src="../../assets/logo@0.1x.png"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn
          color="success"
          elevation="1"
          @click="redo"
          class="mr-6"
      >重做</v-btn>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <v-row justify="center">
        <v-col
            cols="12"
            sm="10"
            md="8">
          <router-view v-if="isRouterAlive"></router-view>
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
import {SpecialUser} from "../..//assets/common/dataType"

export default {
  name: "layout",

  provide(){ // 父组件中返回要传给下级的数据
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed:{
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    redo(){
      if (this.user.id === undefined){
        this.reload()
      }
      else {
        const user = this.user
        user.Agent = String(user.id) + user.Agent
        user.Answer = JSON.stringify(user.Answer)
        commonAjax('/special/specialsubmit/' + this.user.id + '/', user, 'put').then((res) => {
          // console.log('res', res)
          if(res.status === 200) {
            this.$store.commit('setSpecialUser', new SpecialUser())
            this.$router.push({name: 'specialHome'})
          }
          else {
            console.log(res)
          }
        })
      }
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    document.title = '人格测试问卷'
  }
}
</script>

<style scoped>

</style>