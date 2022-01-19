<template>
  <div class="ma-0">
    <v-container>
      <v-row>
        <v-col
          v-for="(bookEvent, i) in booksflow"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="pa-2" :elevation="hover ? 10 : 4">
            <v-container>
              <v-row>
                <v-col class="col-3 col-sm-4 pa-0 ma-0">
                  <v-img
                    :aspect-ratio="10 / 16"
                    contain
                    :src="findBook(bookEvent.id)[0].image"
                  ></v-img>
                </v-col>
                <v-col class="col-9 col-sm-8 pa-sm-2 pa-xs-0">
                  <div>
                    <b>Автор:</b> {{ findBook(bookEvent.id)[0].authors }}
                  </div>
                  <div>
                    <b>Название:</b> {{ findBook(bookEvent.id)[0].name }}
                  </div>
                  <div><b>Статус: </b>{{ bookEvent.BookStatus }}</div>
                  <div><b>Пользователь: </b>{{ bookEvent.Userid }}</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import booksflow from "../db/booksflow";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    booksflow,
    book: {},
  }),
  methods: {
    findBook: function (Bookid) {
      return (this.book = this.books.filter((book) => book.id == Bookid));
    },
    findUser: function (Userid) {},
  },
  computed: {
    ...mapGetters(["books"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>