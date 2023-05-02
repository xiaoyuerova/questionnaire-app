<!--
程序名：感谢页面
功能：填写完问卷跳转的页面
-->
<template>
  <div class="thankYou">
    <v-card shadow="never" style="font-size: 18px;line-height: 40px;padding: 10px;">
      <i class="el-icon-circle-check" style="color: green;font-size: 50px"></i><br>
      您的回答已提交，感谢您的参与！<br><br>
    </v-card>
  </div>
</template>

<style scoped>
.thankYou{
  padding: 40px;
}
</style>

<script>
export default {
  name: "ThankYou"
}
</script>
