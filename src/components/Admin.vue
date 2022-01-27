<template>
  <div>
    <v-container>
      <v-row class="align-center justify-end">
        <v-col class="col-12 col-md-3">
          <v-select
            v-model="chosenBackend"
            :items="backends"
            label="Backend"
            class="ma-4"
            v-on:change="getBackend(chosenBackend)"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="flex-column text-center">
        <h2>Регистрация</h2>
        <v-col class="d-flex justify-space-around">
          <v-btn>Пользователь</v-btn>
          <v-btn>Книга</v-btn>
        </v-col>
      </v-row>
      <v-row class="flex-column text-center">
        <h2>Движение</h2>
        <v-col class="d-flex justify-space-around">
          <v-btn>Выдать книгу</v-btn>
          <v-btn>Принять книгу</v-btn>
          <v-btn>Журнал</v-btn>
        </v-col>
      </v-row>
      <v-row class="flex-column text-center">
        <h2>Обращение к серверу на Node</h2>
        <v-col class="d-flex justify-space-around">
          <!-- <v-btn @click="this.jsMethods.getAllBooks">get All Books</v-btn> -->
        </v-col>
        <v-col cols="8" class="d-flex justify-space-around">
          createBookflow
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import jsMethods from "../apiScripts/node";
export default {
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
  }),
  computed: {
    ...mapGetters({
      user: "user",
      bookflow: "bookflow",
      backend: "backend",
    }),
  },
  methods: {
    ...mapActions(["getAllBookflow"]),
    createBookflow: async function () {
      // Update bookflow in vuex
      let bookflow = await jsMethods.getAllBookflow();
      this.getAllBookflow(bookflow);

      let bookflowForm = this.bookflowForm;
      bookflowForm.Id = this.bookflow.length + 1;
      bookflowForm.TimeStamp = Date.now();

      jsMethods.createBookflow(this.bookflowForm);
    },
  },
  mounted() {
    this.chosenBackend = this.backend;
  },
};
</script>

<style>
</style>