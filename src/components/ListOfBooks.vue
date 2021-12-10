<template>
  <v-container>
    <v-row class="justify">
      <v-col v-for="(book, k) in books" :key="k" cols="12" sm="6" md="4" lg="3">
        <MiniBook :book="book" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import books from "../db/books";
import MiniBook from "./MiniBook.vue";
export default {
  data: () => ({
    books,
  }),
  components: {
    MiniBook,
  },
  methods: {
    routeTo: function (path) {
      this.$router.push(path);
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
</style>
