<template>
  <div class="book">
    <v-container>
      <span class="text-h6"
        >{{ currentBook.authors }}: {{ currentBook.name }}
      </span>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  max-width="250"
                  :aspect-ratio="9 / 16"
                  contain
                  :src="currentBook.image"
                ></v-img> </v-col
              ><v-col
                ><div class="text-caption">
                  Автор: {{ currentBook.authors }}
                </div>
                <div class="text-caption">
                  Издательство: {{ currentBook.publisher }},
                  {{ currentBook.date }} г.
                </div>
                <div class="text-caption">
                  Тематика: {{ currentBook.direction }}
                </div>

                <div class="text-caption">ISBN: {{ currentBook.ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ currentBook.pagesCount }}
                </div>
                <v-btn
                  depressed
                  small
                  class="ma-4 secondary"
                  v-on:click="takeBook"
                  >Взять книгу</v-btn
                >
                <div class="">Состояние: {{ currentBook.state }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="col-12 col-md-6">
          <div class="text-caption">
            <b>Аннотация к книге "{{ currentBook.name }}"</b>
          </div>
          <span class="text-caption">{{ currentBook.annotation }}</span>
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
    currentBook: {},
    bookId: 1,
  }),
  methods: {
    takeBook: function () {
      console.log(this.books[this.bookId].name);
    },
  },
  mounted() {
    this.bookId = this.$route.query.book_id;
    this.currentBook = this.books.find((x) => x.id == this.bookId);
    console.log(this.currentBook);
  },
};
</script>

<style lang="scss" scoped>
</style>
