<template>
  <div class="book">
    <v-container>
      <span class="text-h6">{{ books[bookId].authors }}:{{ books[bookId].name }} </span>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  max-width="250"
                  :aspect-ratio="9 / 16"
                  contain
                  :src="books[bookId].image"
                ></v-img> </v-col
              ><v-col
                ><div class="text-caption">Автор: {{ books[bookId].authors }}</div>
                <div class="text-caption">
                  Издательство: {{ books[bookId].publisher }}, {{ books[bookId].date }} г.
                </div>
                <div class="text-caption">
                  Тематика: {{ books[bookId].direction }}
                </div>

                <div class="text-caption">ISBN: {{ books[bookId].ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ books[bookId].pagesCount }}
                </div>
                <v-btn
                  depressed
                  small
                  class="ma-4 secondary"
                  v-on:click="takeBook"
                  >Взять книгу</v-btn
                >
                <div class="">Состояние: {{ books[bookId].state }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col>
          <div class="text-caption">
            <b>Аннотация к книге "{{ books[bookId].name }}"</b>
          </div>
          <span class="text-caption">{{ books[bookId].annotation }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import books from "../db/books";
export default {
  data: () => ({
    books,
  }),
  methods: {
    takeBook: function () {
      console.log(this.books[this.bookId].name);
    },
  },
  mounted() {
    this.bookId = this.$route.query.book_id;
  }
};
</script>

<style lang="scss" scoped>
</style>
