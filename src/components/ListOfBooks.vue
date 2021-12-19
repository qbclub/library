<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="ma-0" v-for="(book, k) in books" :key="k" cols="6" sm="4" md="3" lg="3">
        <MiniBook :book="book"></MiniBook>
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
