<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row
            align="center"
            justify="center"
            style="height: 400px;"
        >
          <v-col
              cols="8"
              md="4"
          >
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="name"
                  v-if="radio === 0"
                  :rules="nameRules"
                  label="用户名"
                  required
              ></v-text-field>

              <v-text-field
                  v-if="radio === 1"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="密码"
                  required
              ></v-text-field>

              <v-radio-group v-model="radio">
                <v-radio
                    label="使用用户名登录"
                    :value="0"
                ></v-radio>
                <v-radio
                    label="使用邮箱登录"
                    :value="1"
                ></v-radio>
              </v-radio-group>

              <v-row
                  align="center"
                  class="mt-4"
                  justify="space-around">
                <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="ml-4"
                    @click="login"
                >
                  登录
                </v-btn>
                <v-btn
                    class="mr-4"
                    @click="register"
                >
                  注册
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row
            align="center"
            justify="center"
            style="margin-top: -72px"
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
    email: '',
    emailRules: [
      v => !!v || '请输入E-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || '请输入密码',
      v => (v && v.length <= 18) || '密码长度必须小于18个字符',
      v => (v && v.length >= 6) || '密码长度必须大于6个字符',
    ],
    radio: 0,         // 0:用户名登录；1：邮箱登录
    alert: false,
    alertMsg: ''
  }),
  methods: {
    login() {
      if (this.validate()) {
        if(this.radio === 0) {
          // 用户名登录
          let param = new URLSearchParams()
          param.append('name', this.name,)
          param.append('password', this.password)
          axios.post('/questioners/login', param).then((res) => {
            const data = res.data.data
            if (data.code === '0') {
              this.goTo()
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
        else {
          // 邮箱登录
          let param = new URLSearchParams()
          param.append('email', this.email,)
          param.append('password', this.password)
          axios.post('/questioners/elogin', param).then((res) => {
            const data = res.data.data
            if (data.code === '0') {
              this.goTo()
            } else {
              this.alertMsg = '登录失败！' + data.msg
              this.alert = true
              setTimeout(() => {
                this.alert = false
              }, 3000)
            }
          })
        }
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
  },
}
</script>

<style scoped>

</style>