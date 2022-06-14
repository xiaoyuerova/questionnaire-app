<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              cols="7"
              md="4"
              class="broad"
          >
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="用户名"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="密码"
                  required
              ></v-text-field>

              <v-checkbox label="保存登录状态" v-model="save"></v-checkbox>

              <v-row
                  align="center"
                  justify="space-around"
                  style="height: 100px; line-height: 100px"
              >
                <v-btn
                    :disabled="!valid"
                    color="primary"
                    @click="login"
                >
                  登录
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row
            align="center"
            justify="center"
            style="line-height: 360px"
        >
          <v-col
              cols="8"
              md="4"
          >
            <v-alert
                v-show="alert"
                type="error"
                class="mt-8"
                outlined
                dense
            >{{ alertMsg }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import apiUrl from "@/utils/api";
// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiUrl;  // 默认地址

export default {
  name: "Login",
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '请输入用户名',
      v => (v && v.length <= 40) || '用户名长度必须少于40个字符',
    ],
    password: '',
    passwordRules: [
      v => !!v || '请输入密码',
      v => (v && v.length <= 18) || '密码长度必须小于18个字符',
      v => (v && v.length >= 6) || '密码长度必须大于等于6个字符',
    ],
    // 保存登录状态
    save: true,
    alert: false,
    alertMsg: ''
  }),
  methods: {
    login() {
      // 用户名登录
      let param = new URLSearchParams()
      param.append('userName', this.name,)
      param.append('password', this.password)
      axios.post('/summer/login', param).then((res) => {
        console.log(res)
        const data = res.data.data
        console.log(data)
        if (data.code === '0') {
          this.$store.dispatch('setUserData',data.msg).then(()=>{
            this.$router.push('/summer/' + this.questionnaireId())
          })
        } else {
          this.alertMsg = '登录失败！' + data.msg
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 3000)
        }
        console.log(data)
      })
    }
  },
  goTo() {
    this.$router.push('/questioners/index')
  },
  register() {
    this.$router.push('/register')
  },
  validate() {
    return this.$refs.form.validate()
  },
  reset() {
    this.$refs.form.reset()
  },
  resetValidation() {
    this.$refs.form.resetValidation()
  },
  computed:{
    questionnaireId:function (){
      return this.$store.state.questionnaireId
    }
  }
}
</script>

<style scoped>
.broad {
  /* 容器 1 */
  /*width: 662px;*/
  /*height: 459px;*/
  border-radius: 20px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  box-shadow: 0px 6px 36px 0px rgba(59, 72, 83, 0.16);

  padding: 30px 40px;
}
</style>