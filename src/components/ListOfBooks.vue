<template>
  <v-container>
    <v-row>
      <v-col v-for="(book, k) in books" :key="k" cols="6" sm="3" md="2" lg="2">
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
