<template>
  <div>
    <v-container>
      <v-row class="align-center justify-end">
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
      </v-row>
      <v-row class="justify-center">
        <v-col cols="8">
         
          <v-btn @click="routeTo('/user-actions')" block class="mb-8"
            >user actions</v-btn
          >
          <v-btn @click="routeTo('/book-actions')" block class="mb-8"
            >book actions</v-btn
          >
          <v-btn @click="routeTo('/bookflow-actions')" block class="mb-8"
            >bookflow actions</v-btn
          >
           <v-btn @click.stop="dialog4 = true" block class="mb-8" color="error">
            Отчистить базу книг</v-btn
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
import jsMethods from "../apiScripts/node";

export default {
  components: {},
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
    }),
  },
  methods: {
    ...mapActions(["getAllBookflow", "clearBooksDB"]),
    createBookflow: async function () {
      // Update bookflow in vuex
      let bookflow = await jsMethods.getAllBookflow();
      this.getAllBookflow(bookflow);

      let bookflowForm = this.bookflowForm;
      bookflowForm.Id = this.bookflow.length + 1;
      bookflowForm.TimeStamp = Date.now();

      jsMethods.createBookflow(this.bookflowForm);
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