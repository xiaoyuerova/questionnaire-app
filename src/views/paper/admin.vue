<template>
  <v-container>
    <div class="d-flex justify-center mt-16">
      <v-btn
          v-for="opt in opts"
          @click="manage(opt)"
      >
        {{opt}} data
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import {commonAjax} from "@/assets/common/ajax";

export default {
  name: "admin",
  components: {},
  props: {},
  data() {
    return {
      opts: [
        'init',
        'delete',
        'download',
        'refresh',
      ]
    }
  },
  methods: {
    manage(opt) {
      commonAjax('/paper/admin/'+ opt, {}, 'put').then((res) => {
        if (res.status === 200) {
          console.log(opt + ' successful')
        } else {
          console.log('{error}: admin manage', res.data)
        }
      })
    },

  },
  computed: {},
  mounted() {
  },
  watch: {}
}
</script>

<style scoped>

</style>