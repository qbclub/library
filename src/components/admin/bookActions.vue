<template>
  <v-container>
  <BackArrow></BackArrow>
    <v-row class="justify-center text-center">
      <v-col cols="12">
        <AddBook />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddBook from "../AddBook.vue";
import BackArrow from "../BackArrow.vue";
export default {
  name: "UserActions",
  components: {
    AddBook,
    BackArrow,
  },
};
</script>

<style>
</style> 