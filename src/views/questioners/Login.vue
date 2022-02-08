<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="name"
        v-if="checkbox[0]"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
    ></v-text-field>

    <v-text-field
        v-if="checkbox[1]"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-checkbox
        v-model="checkbox[0]"
        label="用户名登录"
        @click="chooseLoginWay(0)"
    ></v-checkbox>

    <v-checkbox
        v-model="checkbox[1]"
        label="邮箱登录"
        @click="chooseLoginWay(1)"
    ></v-checkbox>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
    >
      登录
    </v-btn>

  </v-form>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: [true, false]
  }),
  methods: {
    chooseLoginWay(index) {
      this.checkbox[index] = true
      this.checkbox[1 - index] = false
    },
    validate() {
      this.$refs.form.validate()
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