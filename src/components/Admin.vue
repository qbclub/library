<template>
  <div>
    <v-container>
      <BackArrow></BackArrow>
      <!-- <v-row class="align-center justify-end">
        <v-col class="d-flex" cols="12" md="2">
          <v-select
            :items="backends"
            label="Backend"
            dense
            solo
            v-on:change="getBackend(chosenBackend)"
            class="ma-4"
          ></v-select>
        </v-col>
      </v-row> -->
      <v-row class="justify-center">
        <v-col cols="8" class="d-flex justify-center flex-column">
          <v-btn @click="routeTo('/userinfo')" block class="mb-8"
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

      <!-- <v-row class="flex-column text-center">
        <h2>Обращение к серверу на Node</h2>
        <v-col class="d-flex justify-space-around">
        </v-col>
        <h4>createBookflow</h4>
        <v-col class="col-8">
          <v-form>
            <v-text-field
              v-model="bookflowForm.BookId"
              label="BookId"
              required
            ></v-text-field>
            <v-text-field
              v-model="bookflowForm.UserId"
              label="UserId"
              required
            ></v-text-field>
            <v-text-field
              v-model="bookflowForm.BookStatus"
              label="BookStatus"
              required
            ></v-text-field>
            <v-btn color="success" class="mr-4" @click="createBookflow">
              Отправить
            </v-btn>
          </v-form>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BackArrow from "./BackArrow.vue";
import jsMethods from "../apiScripts/node";
import MiniBook from "./MiniBook.vue";

export default {
  components: {
    MiniBook,
    BackArrow,
  },
  data: () => ({
    backends: ["node", "c#"],
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
        this.unreserveAllBooks();
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