<template>
  <v-container>
    <v-row class="justify">
      <v-col v-for="book in books" :key="book.title">
      <v-col cols="4" >
        <v-card>
          <v-img
            :src = "book.image"
            class="white--text align-end"
            ><v-card-title v-text="book.title"></v-card-title>
             </v-img
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import books from "../db/books"
export default {
  data: () => ({
    books
  }),
};
</script>
<style scoped>
</style>
