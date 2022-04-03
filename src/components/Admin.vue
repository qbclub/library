<template>
  <div>
    <v-container>
      <v-row>
        <button onclick="history.back()">
          <div>
            <span class="subtitle-1 fi fi-rr-angle-left"> </span>
          </div>
        </button>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="8 ma-8">
          <v-btn @click="routeTo('/user-actions')" block class="mb-8"
            >Добавить пользователя</v-btn
          >
          <v-btn @click="routeTo('/book-actions')" block class="mb-8"
            >Внести книгу</v-btn
          >

          <v-btn @click="routeTo('/bookflow-actions')" block class="mb-8"
            >Движение книг</v-btn
          >
          <v-btn @click="routeTo('/UserList')" block class="mb-8"
            >Список пользователей</v-btn
          >
          <v-btn @click="unreserveAll" block class="mb-8" color="error"
            >Отменить резерв книг</v-btn
          >
          <v-btn @click.stop="dialog4 = true" block class="mb-8" color="error">
            Отчистить базу книг</v-btn
          >
          <v-btn
            @click.prevent="clearUsersDB()"
            block
            class="mb-8"
            color="error"
          >
            Отчистить базу юзеров</v-btn
          >
        </v-col>
        <v-dialog v-model="dialog4" max-width="290">
          <v-card>
            <v-card-title> Вы уверены? </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red" text @click="dialog4 = false"> Нет </v-btn>

              <v-btn text @click.prevent="clearBooksDB()"> Да </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from "vuex";
import jsMethods from "../apiScripts/node";
import MiniBook from "./MiniBook.vue";

export default {
  components: {
    MiniBook,
  },
  data: () => ({
    chosenBackend: null,
    bookflowForm: {
      Id: "",
      BookId: "",
      UserId: "", // ID-пользователя
      BookStatus: "",
      TimeStamp: "",
    },
    expand: false,
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog4: false,
  }),
  computed: {
    ...mapGetters({
      user: "user",
      bookflow: "bookflow",
      backend: "backend",
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions([
      "getAllBookflow",
      "clearBooksDB",
      "clearUsersDB",
      "unreserveAllBooks",
    ]),
    createBookflow: async function () {
      // Update bookflow in vuex
      let bookflow = await jsMethods.getAllBookflow();
      this.getAllBookflow(bookflow);

      let bookflowForm = this.bookflowForm;
      bookflowForm.Id = this.bookflow.length + 1;
      bookflowForm.TimeStamp = Date.now();

      jsMethods.createBookflow(this.bookflowForm);
    },
    unreserveAll: function () {
      if (confirm("Вы уверены?")) {
        axios
          .post("http://localhost:3000/api/books/unreserve-all")
          .then((response) => console.log("Books unreserved"))
          .catch((error) => {
            console.error("error: ", error);
          });
      }
    },
    routeTo(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.chosenBackend = this.backend;
  },
};
</script>

<style>
</style>