<template>
  <v-container>
    <v-row class="justify">
      <v-col v-for="book in books" :key="book.title" cols="4" sm="6" md="2">
        <v-card rounded-lg >
          <v-img
            :src="book.image"
            style="cursor: pointer; height: 25vh "
            @click="routeTo('/book')"
            
            ><v-card-title v-text="book.title"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import books from "../db/books";
export default {
  data: () => ({
    books,
  }),
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
