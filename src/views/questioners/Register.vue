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
              cols="4"
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

              <v-text-field
                  v-model="verifyPassword"
                  :rules="[verifyPasswordRules]"
                  label="确认密码"
                  required
              ></v-text-field>

              <v-row
                  align="center"
                  justify="space-around">
                <v-btn
                    :disabled="!valid"
                    color="primary"
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
              cols="4"
          >
            <v-alert
                v-if="alert"
                :type="alertType"
                class="mt-8"
                outlined
                dense
            >{{alertMsg}}</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
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
    verifyPassword: '',
    alert: false,
    alertType: 'success',
    alertMsg:''
  }),
  methods: {
    verifyPasswordRules(v){
      if(!v){
        return '请再输入一遍密码'
      }
      if (v && v !== this.password){
        return '两次输入的密码不同'
      }
      return true
    },
    register() {
      if(this.validate()) {
        let param = new URLSearchParams()
        param.append('name', this.name,)
        param.append('password', this.password)
        axios.post('http://127.0.0.1:8010/questioners/register', param).then((res) => {
          const data = res.data.data
          if (data.code === '0'){
            this.alertMsg = '注册成功！'
          }else {
            this.alertType = 'error'
            this.alertMsg = '注册失败！' + data.msg
          }
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 3000)
          console.log(data)
        })
      }
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