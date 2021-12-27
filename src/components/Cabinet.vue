<template>
  <v-container>
    <v-row class="align-center justify-center"
      ><v-col cols="10"
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
  </v-container>
</template>
<script>
import books from "../db/books";
import users from "../db/users";
export default {
  data: () => ({
    books,
    users,
    TakenBooks: [],
  }),
  mounted() {
    this.TakenBooks = this.users[0].CurrentTakenBooks;
  },
};
</script>
<style scoped>
</style>