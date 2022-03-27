<template>
  <v-container>
    <v-row>
      <button onclick="history.back()">
        <div>
          <span class="subtitle-1 fi fi-rr-angle-left"> </span>
        </div>
      </button>
    </v-row>
    <v-row class="align-center justify-center">
      <v-col
        ><p
          class="
            text--primary text-xl-h4 text-md-h6 text-sm-body-1 text-body-1
            font-weight-medium
            justify-center
            text-center
          "
        >
          Личный кабинет
        </p></v-col
      ></v-row
    >
    <v-row>
      <v-col cols="6">
        <p class="text-center">Книги на руках</p>
        <p class="font-weight-bold">Вернуть до</p>
        <v-img
          v-if="takenBook"
          loading="lazy"
          contain
          max-width="250"
          :aspect-ratio="10 / 14"
          :src="takenBook.CoverPath"
        ></v-img
      ></v-col>
      <v-col class="justify-center"  cols="6">
        <p class="text-center">Зарезервированнo</p>
        <p class="font-weight-bold">Взять до</p>
        <v-img
          v-if="reservvedBook"
          loading="lazy"
          contain
          max-width="250"
          :aspect-ratio="10 / 14"
          :src="reservvedBook.CoverPath"
        ></v-img
      ></v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    reservvedBook: null,
    takenBook: null,
  }),
  methods: {
    findBookById: function (id) {
      return this.books.find(({ Id }) => Id == id);
    },
  },

  computed: {
    ...mapGetters({
      user: "user",
      books: "books",
      userInfo: "userInfo",
    }),
  },
  mounted() {
    if (this.user.loggedIn) {
      this.reservvedBook = this.findBookById(
        this.userInfo.CurrentReservedBooks
      );
      this.takenBook = this.findBookById(this.userInfo.CurrentTakenBooks);
    }
  },
};
</script>
<style scoped>
</style>