<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="md-6 pa-0"
        ></v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col
        class="pa-1"
        v-for="(book, k) in booksToShow"
        :key="k"
        cols="4"
        sm="3"
        md="2"
        @click="routeTo(book)"
      >
        <MiniUser :book="book"></MiniUser>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import MiniUser from "./MiniUser.vue";
export default {
  data: () => ({
    booksToShow: [],
  }),
  components: {
    MiniUser,
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
  mounted() {
    this.booksToShow = this.books;
  },
};
</script>
<style scoped>
</style>
