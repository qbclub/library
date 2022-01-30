<template>
  <v-container>
    <v-row class="justify-center text-center">
       <v-col cols="12"
        >
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