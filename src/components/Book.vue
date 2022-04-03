<template>
  <div class="book">
    <v-container>
      <v-row>
        <button onclick="history.back()">
          <div>
            <span class="subtitle-1 fi fi-rr-angle-left"> </span>
          </div>
        </button>
      </v-row>

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
                  Тематика: {{ currentBook.direction }}
                </div>

                <div class="text-caption">ISBN: {{ currentBook.ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ currentBook.PageCount }}
                </div>

                <div v-if="currentBook.Status == 'На месте'">
                  <v-btn
                    v-if="user.loggedIn"
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
                      !userInfo.CurrentReservedBooks &&
                      !userInfo.CurrentTakenBooks
                    "
                  >
                    Книга {{ currentBook.Status }}
                  </div>
                  <div v-else class="text-caption font-weight-bold">
                    <div
                      v-if="
                        userInfo.CurrentReservedBooks &&
                        userInfo.CurrentReservedBooks !== currentBook.Id
                      "
                    >
                      У вас зарезервирована другая книга
                    </div>
                    <div
                      v-else-if="
                        currentBook.DateOfReserved &&
                        userInfo.CurrentReservedBooks == currentBook.Id
                      "
                    >
                      Будет зарезервирована до {{ reserveLimit }}
                    </div>
                    <div v-if="currentBook.Id == userInfo.CurrentTakenBooks">
                      Эта книга у вас на руках
                    </div>
                  </div>

                  <div v-if="userInfo.isAdmin && currentBook.ReservedQueue">
                    Зарезервировал "{{ currentBook.ReservedQueue }}"
                  </div>
                  <div v-else-if="currentBook.TemporaryOwner">
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
  }),
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
        let c = this.currentBook;
        c.Status = "Зарезервирована";
        c.ReservedQueue = this.userInfo.Contacts.Email;
        this.dialog = false;
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
        this.snackbarText = "Книга выдана";
        this.snackbar = true;
        this.giveBook({
          bookId: this.currentBook.Id,
          userEmail: this.currentBook.ReservedQueue,
        });
        let c = this.currentBook;
        c.Status = "Выдана";
        c.TemporaryOwner = this.currentBook.ReservedQueue;
        this.dialog = false;
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
      let c = this.currentBook;
      c.Status = "На месте";
      c.ReservedQueue = "";
      c.TemporaryOwner = "";
      this.dialog = false;
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
      (x) => x.Id == this.$route.query.book_id
    );
    if (this.currentBook.DateOfReserved) {
      let date = new Date(
        Number(this.currentBook.DateOfReserved) + 1000 * 60 * 60 * 24 * 3
      );
      // usual time format
      let minutes = date.getMinutes() + "0";
      let hours = date.getHours() + "0";

      this.reserveLimit =
        date.getDate() +
        "." +
        date.getMonth() +
        "." +
        date.getFullYear() +
        " " +
        hours.slice(0, 2) +
        ":" +
        minutes.slice(0, 2);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
