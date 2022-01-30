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
    <v-btn v-on:click="clearBooksDB()"> Отчистить базу книг</v-btn>
      <userActions />
      <bookActions />
      <bookflowActions />
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
import userActions from "./admin/userActions.vue";
import bookActions from "./admin/bookActions.vue";
import bookflowActions from "./admin/bookflowActions.vue";

export default {
  components: {
    userActions,
    bookActions,
    bookflowActions,
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