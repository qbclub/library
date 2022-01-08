<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="md-6 ma-0"
        ><Search :books="books" @findBooks="showBooks"
      /></v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col
        class="ma-0"
        v-for="(book, k) in booksToShow"
        :key="k"
        cols="6"
       
        md="4"
        @click="routeTo(book)"
      >
        <MiniBook :book="book"></MiniBook>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import books from "../db/books";
import MiniBook from "./MiniBook.vue";
import Search from "./Search.vue";
export default {
  data: () => ({
    books,
    booksToShow: books,
  }),
  components: {
    MiniBook,
    Search,
  },
  methods: {
    routeTo: function (book) {
      this.$router.push({
        path: "/book",
        query: {
          book_id: book.id,
        },
      });
      this.drawer = false;
    },
    showBooks: function (booksToShow) {
      this.booksToShow = booksToShow;
    },
  },
};
</script>
<style scoped>
</style>
