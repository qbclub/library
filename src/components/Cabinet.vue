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
      <v-col cols="10"
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
    <p class="text-center">Книги на руках</p>
    <v-row class="align-center justify-center">
      <v-col
        cols="6"
        class="ma-0"
        v-for="(bookid, i) in TakenBooks"
        :key="i"
        sm="4"
        md="3"
        lg="3"
        ><div
          class="
            text-lg-body-1
            text-md-body-1
            text-sm-body-2
            text--primary
            text-center
          "
        >
          <v-img
            max-width="250"
            :aspect-ratio="9 / 16"
            contain
            :src="books[i].image"
          ></v-img>
        </div>
      </v-col>
    </v-row>
    <p class="text-center">Зарезервированные</p>
    <v-row class="align-center justify-center">
      <v-col
        cols="6"
        class="ma-0"
        v-for="(bookid, i) in ReservedBooks"
        :key="i"
        sm="4"
        md="3"
        lg="3"
        ><div
          class="
            text-lg-body-1
            text-md-body-1
            text-sm-body-2
            text--primary
            text-center
          "
        >
          <v-img
            max-width="250"
            :aspect-ratio="9 / 16"
            contain
            :src="books[i].image"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    TakenBooks: [],
    ReservedBooks: [],
  }),
  mounted() {
    if (this.user.loggedIn) {
      this.TakenBooks = user.info.CurrentTakenBooks;
      this.ReservedBooks = user.info.CurrentReservedBooks;
    }
  },
  methods: {
    ...mapGetters({
      user: "user",
      books: "books",
    }),
  },
};
</script>
<style scoped>
</style>