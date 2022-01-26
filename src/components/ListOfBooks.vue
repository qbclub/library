<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="md-6 pa-0"
        ><Search :books="books" @findBooks="showBooks"
      /></v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col
        class="pa-1"
        v-for="(book, k) in booksToShow"
        :key="k"
        cols="6"
        sm="3"
        md="2"
        @click="routeTo(book)"
      >
        <MiniBook :book="book"></MiniBook>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import MiniBook from "./MiniBook.vue";
import Search from "./Search.vue";
export default {
  data: () => ({
    booksToShow: [],
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
          book_id: book.Id,
        },
      });
      this.drawer = false;
    },
    showBooks: function (booksToShow) {
      this.booksToShow = booksToShow;
    },
  },
  computed: {
    ...mapGetters(["books"]),
  },
  async mounted() {
    this.booksToShow = await this.books;
  },
};
</script>
<style scoped>
</style>
