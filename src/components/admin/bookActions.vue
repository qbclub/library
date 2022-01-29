<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col cols="8"
        ><h1>book actions</h1>
        <AddBook />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddBook from "../AddBook.vue";
export default {
  name: "UserActions",
  components: {
    AddBook,
  },
};
</script>

<style>
</style> 