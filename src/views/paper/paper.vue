<template>
  <div>
    <v-app-bar
        color="indigo darken-4"
        dense
        dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
          left
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main app>
      <v-container fluid class="d-flex justify-center">
        <!--        dialog-->
        <v-dialog
            v-model="dialog"
            max-width="460"
        >
          <v-card>
            <v-card-actions
                class="d-flex justify-center">
              <v-btn
                  @click="submit">
                确定
              </v-btn>
            </v-card-actions>
            <v-card-text
                v-for="paper in paper_list">
              <v-card :color="(paper.Select1?select_color:'')"
                      @click="()=>{paper.Select1=!paper.Select1}"
              >
                <v-card-text>
                  {{ paper.Title }}<br>
                  {{ paper.Title_CN }}
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!--        内容-->
        <v-row
        style="min-height: 600px"
        class="mt-6">
          <v-card
              min-width="800"
              min-height="500"
              v-if="pointer === -2">
            <v-card-text>
              阶段性结束
            </v-card-text>
          </v-card>
          <v-col
              cols="12"
              v-for="(paper,index) in paper_list"
              :key="index"
              v-if="pointer === index"
          >
            <v-row class="d-flex justify-center">
              <v-col
                  cols="12"
                  sm="10"
                  md="8"
                  v-if="view === 0 || view === 2"
              >
                <v-card
                    class="mx-auto"
                    :color="(paper.Select1?select_color:'')"
                    @click="()=>{paper.Select1=!paper.Select1}"
                >
                  <v-card-title>{{ paper.Title }}</v-card-title>
                  <v-card-subtitle>{{ paper.Author }}</v-card-subtitle>
                  <v-card-text :class="font_size">
                    {{ paper.Abstract }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                  cols="12"
                  sm="10"
                  md="8"
                  v-if="view === 0 || view === 1"
              >
                <v-card
                    class="mx-auto"
                    :color="(paper.Select1?select_color:'')"
                    @click="()=>{paper.Select1=!paper.Select1}"
                >
                  <v-card-title>{{ paper.Title_CN }}</v-card-title>
                  <v-card-subtitle>{{ paper.Author }}</v-card-subtitle>
                  <v-card-text :class="font_size">
                    {{ paper.Abstract_CN }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                  cols="12"
                  sm="10"
                  md="8">
                {{paper.Meeting}} :
                <a :href="paper.Link" target="_blank">{{ paper.Link }}</a><br>
                <span>Uid: </span>{{paper.Uid}}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-toolbar
            style="position: fixed"
            class="mb-16"
            bottom
        >
          <v-row
              class="d-flex justify-center"
          >
            <v-btn
                large
                class="mr-10"
                @click="exchange">
              切换视图
            </v-btn>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="previous"
            >
              上一篇
            </v-btn>
            <v-btn
                v-for="index in paper_list.length"
                :key="index"
                @click="select(index)"
                :color="(index === pointer+1?'primary':'')"
            >
              {{ index }}
            </v-btn>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="after"
            >
              下一篇
            </v-btn>
            <v-btn
                large
                class="ml-10"
                @click="submit_confirmation">
              提交
            </v-btn>
          </v-row>

        </v-toolbar>
      </v-container>
    </v-main>
    <v-footer app>

    </v-footer>
  </div>
</template>


<script>
import {commonAjax} from "@/assets/common/ajax";
import Vue from "vue";


export default Vue.extend({
  name: "paper",
  components: {},
  props: {},
  data() {
    return {
      pointer: -1,
      paper_list: [],
      dialog: false,
      select_color: 'green lighten-3',
      view: 0,
      font_size: "text-md-body-1 text-lg-h6"
    }
  },
  methods: {
    // 获取数据，并重置pointer
    get() {
      // fetch("http://127.0.0.1:8000/paper/")
      //     .then((response) => response.json())
      //     .then((data) => {
      //       this.paper_source = data.data
      //       console.log(this.paper_source)
      //     });
      commonAjax('/paper/', {}, 'get').then((res) => {
        if(res.status === 200){
          this.paper_list = res.data
          this.init()
        }
        else {
          console.log('{error}: paper method get', res.data)
        }
      })
    },
    previous() {
      this.pointer = (this.pointer - 1 + this.paper_list.length) % this.paper_list.length
    },
    after() {
      if(this.pointer < this.paper_list.length - 1) {
        this.pointer = (this.pointer + 1) % this.paper_list.length
      }
    },
    exchange(){
      this.view = (this.view + 1)%3
    },
    select(index) {
      this.pointer = index - 1
    },
    submit_confirmation() {
      this.dialog = true
    },
    submit() {
      for (let i = 0; i < this.paper_list.length; i++) {
        const paper = this.paper_list[i]
        paper.Locked = false
        paper.Complete = true
        commonAjax('/paper/' + paper.Uid, paper, 'put').then((res) => {
          if(res.status !== 200){
            console.log('{error}: paper method submit', res.data)
          }
        })
      }
      this.get()
    },
    init() {
      if (this.paper_list.length > 0) {
        this.pointer = 0
      } else {
        this.pointer = -2
      }
      this.dialog = false
    }
  },
  computed: {},
  mounted() {
    this.get()
  },
  watch: {}
})
</script>

<style scoped>

</style>