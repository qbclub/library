<template>
  <div class="book">
    <v-container>
      <BackArrow></BackArrow>

      <v-row>
        <span class="text-h6"
          >{{ currentBook.Authors }}: {{ currentBook.Name }}
        </span>
      </v-row>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  loading="lazy"
                  max-width="250"
                  :aspect-ratio="10 / 14"
                  contain
                  :src="currentBook.CoverPath"
                ></v-img> </v-col
              ><v-col
                ><div class="text-caption">
                  Автор: {{ currentBook.Authors }}
                </div>
                <div class="text-caption">
                  Издательство: {{ currentBook.PublisherName }},
                  {{ currentBook.date }} г.
                </div>
                <div class="text-caption">
                  Тематика: {{ currentBook.Sections }}
                </div>

                <div class="text-caption">ISBN: {{ currentBook.ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ currentBook.PageCount }}
                </div>

                <div
                  v-if="currentBook.Status == 'На месте'"
                  class="text-caption font-weight-bold"
                >
                  <div
                    v-if="
                      userInfo.CurrentReservedBooks &&
                      userInfo.CurrentReservedBooks !== currentBook.Id
                    "
                  >
                    У вас зарезервирована другая книга
                  </div>
                  <v-btn
                    v-else-if="user.loggedIn"
                    depressed
                    small
                    class="ma-4 accent"
                    v-on:click="callDialog(takeBook)"
                    >Взять книгу</v-btn
                  >
                  <v-btn
                    v-if="!user.loggedIn"
                    @click="routeTo('/reg')"
                    depressed
                    small
                    class="ma-4 accent"
                    >Зарегистрироваться</v-btn
                  >
                </div>

                <div v-else class="text-caption font-weight-bold">
                  <div
                    v-if="
                      userInfo.CurrentTakenBooks &&
                      currentBook.Id == userInfo.CurrentTakenBooks
                    "
                  >
                    Эта книга у вас на руках
                  </div>
                  <div
                    v-else-if="
                      !userInfo.CurrentReservedBooks && currentBook.Status
                    "
                  >
                    Книга {{ currentBook.Status.toLowerCase() }} <br />
                    до {{ givenOutLimit }}
                  </div>
                  <div v-else class="text-caption font-weight-bold">
                    <div
                      v-if="
                        currentBook.DateOfReserved &&
                        userInfo.CurrentReservedBooks == currentBook.Id
                      "
                    >
                      Зарезервирована до <br />
                      {{ reserveLimit }}
                    </div>
                  </div>

                  <div v-if="userInfo.isAdmin && currentBook.ReservedQueue">
                    Зарезервировал "{{ currentBook.ReservedQueue }}"
                  </div>
                  <div
                    v-else-if="userInfo.isAdmin && currentBook.TemporaryOwner"
                  >
                    Взял "{{ currentBook.TemporaryOwner }}"
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="col-12 col-md-6">
          <div class="text-caption">
            <b>Аннотация к книге "{{ currentBook.Name }}"</b>
          </div>
          <span class="text-caption">{{ currentBook.Annotation }}</span>
          <div
            v-if="userInfo && userInfo.isAdmin"
            class="d-flex flex-wrap justify-center pb-8"
          >
            <v-btn small class="ma-4 accent" @click="callDialog(_giveBook)"
              >Выдать</v-btn
            >
            <v-btn small class="ma-4 accent" @click="callDialog(_returnBook)"
              >Получить</v-btn
            >
            <v-btn small class="ma-4 accent" @click="callDialog(cancelReserve)"
              >Снять резерв</v-btn
            >
            <v-btn small class="ma-4 accent" @click="editBook">Изменить</v-btn>
            <v-btn small class="ma-4 error" @click="callDialog(deleteBook)"
              >Удалить</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="accent">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title> Уверены? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="dialog = false"> Нет </v-btn>

          <v-btn text @click.prevent="dialogAction"> Да </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import BackArrow from "./BackArrow.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    currentBook: {},
    snackbar: false,
    dialog: false,
    dialogAction: null,
    timeout: 3000,
    snackbarText: "",
    reserveLimit: "",
    givenOutLimit: "",
  }),
  components: {
    BackArrow,
  },
  methods: {
    ...mapActions(["reserveBook", "giveBook", "returnBook", "deleteBookById"]),

    callDialog: function (method) {
      this.dialog = true;
      this.dialogAction = method;
    },
    takeBook: function () {
      if (!this.userInfo.CurrentReservedBooks) {
        this.snackbarText = "Книга зарезервирована на 3 дня";
        this.snackbar = true;
        this.reserveBook(this.currentBook.Id);
        this.dialog = false;

        this.currentBook.Status = "Зарезервирована";
        this.currentBook.ReservedQueue = this.userInfo.Contacts.Email;
        this.currentBook.DateOfReserved = Date.now();
        let date = new Date(
          Number(this.currentBook.DateOfReserved) + 1000 * 60 * 60 * 24 * 3
        );

        this.reserveLimit = date.toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else {
        this.snackbarText = "У вас уже есть зарезервированная книга";
        this.dialog = false;
        this.snackbar = true;
      }
    },
    editBook: function () {
      this.$router.push({ name: "EditBook", params: this.currentBook });
    },
    _giveBook: function () {
      if (!this.currentBook.TemporaryOwner) {
        axios
          .post("http://localhost:3000/api/users/get-by-email", {
            email: this.currentBook.ReservedQueue,
          })
          .then((response) => {
            if (response.data.CurrentTakenBooks) {
              this.snackbarText = "Надо вернуть другую книгу";
              this.dialog = false;
              this.snackbar = true;
            } else {
              this.snackbarText = "Книга выдана";
              this.snackbar = true;
              this.giveBook({
                bookId: this.currentBook.Id,
                userEmail: this.currentBook.ReservedQueue,
              });

              this.currentBook.ReservedQueue = "";
              this.currentBook.Status = "Выдана";
              this.currentBook.TemporaryOwner = this.currentBook.ReservedQueue;
              this.dialog = false;
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        this.snackbarText = "У книги есть владелец";
        this.dialog = false;
        this.snackbar = true;
      }
    },
    _returnBook: function () {
      this.snackbarText = "Книга получена";
      this.snackbar = true;
      this.returnBook({
        bookId: this.currentBook.Id,
        userEmail: this.currentBook.TemporaryOwner,
      });

      this.currentBook.Status = "На месте";
      this.currentBook.ReservedQueue = "";
      this.currentBook.TemporaryOwner = "";
      this.dialog = false;
    },
    cancelReserve: function () {
    
      alert("Убираем резервирование книги");
    },
    deleteBook: async function () {
      this.deleteBookById(this.currentBook.Id);
      this.snackbarText = "Книга удалена";
      this.snackbar = true;
      this.dialog = false;
    },
    routeTo: function (path) {
      this.$router.push(path);
      this.drawer = false;
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
    this.currentBook = this.books.find(
      (book) => book.Id == this.$route.query.book_id
    );

    if (this.currentBook.DateOfReserved) {
      let date = new Date(
        Number(this.currentBook.DateOfReserved) + 1000 * 60 * 60 * 24 * 3
      );

      this.reserveLimit = date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (this.currentBook.DateOfGivenOut) {
      let date = new Date(
        Number(this.currentBook.DateOfGivenOut) + 1000 * 60 * 60 * 24 * 21
      );

      this.givenOutLimit = date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
