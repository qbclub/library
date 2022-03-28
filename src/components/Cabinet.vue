<template>
  <v-container>
    <v-row>
      <v-col cols="">
         <button onclick="history.back()">
        <div>
          <span class="subtitle-1 fi fi-rr-angle-left"> </span>
        </div>
      </button>
      </v-col>
            <v-col cols="2">
        <div>
        <template v-if="user.loggedIn">
          <div class="d-flex flex-column text-center navicons">
            <i @click.stop="dialog = true" class="fi fi-rr-sign-out"> </i>
            <span class="icon_text">выход</span>
          </div>
        </template>
        <!-- <template v-else>
          <div
            v-on:click="routeTo('/auth')"
            class="d-flex flex-column text-center navicons"
          >
            <i class="fi fi-rr-sign-in"> </i>
            <span class="icon_text">вход</span>
          </div>
        </template> -->
      </div>
      </v-col>
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
      >
    </v-row>
    
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
      <v-col class="justify-center" cols="6">
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
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title> Выйти из приложения? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="dialog = false"> Нет </v-btn>

          <v-btn text @click.prevent="signOut"> Да </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";
export default {
  data: () => ({
    reservvedBook: null,
    takenBook: null,
    dialog: false,
  }),
  methods: {
    findBookById: function (id) {
      return this.books.find(({ Id }) => Id == id);
    },
        signOut: function () {
      signOut(getAuth())
        .then(() => {
          this.$router.replace({
            name: "ListOfBooks",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.dialog = false;
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