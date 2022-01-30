<template>
  <div>
    <v-container>
      <v-row class="align-center justify-end">
        <v-col class="d-flex" cols="12" md="1">
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
        <v-dialog v-model="dialog" persistent min-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Внести Пользователя
            </v-btn>
          </template>
          <v-card>
            <userActions />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog1" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Внести Книги
            </v-btn>
          </template>
          <v-card>
            <bookActions />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog1 = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog1 = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Движение книги
            </v-btn>
          </template>
          <v-card>
            <bookflowActions />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog2 = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog2= false">
                Save
              </v-btn>
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
    dialog: false,
    dialog1: false,
    dialog2: false,
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