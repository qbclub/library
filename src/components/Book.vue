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
                  {{ currentBook.ReleaseDate }}
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
                    >Войти</v-btn
                  >
                </div>

                <div v-else class="text-caption font-weight-bold">
                  <div
                    v-if="
                      userInfo.CurrentTakenBooks &&
                      currentBook.Id == userInfo.CurrentTakenBooks
                    "
                  >
                    Эта книга у вас
                  </div>
                  <div
                    v-else-if="
                      !userInfo.CurrentReservedBooks && currentBook.Status
                    "
                  >
                    Книга {{ currentBook.Status.toLowerCase() }} <br />
                    до {{ booksReserveLimit }} {{ booksGiveOutDate }}
                  </div>
                  <div v-else class="text-caption font-weight-bold">
                    <div
                      v-if="
                        currentBook.DateOfReserved &&
                        userInfo.CurrentReservedBooks == currentBook.Id
                      "
                    >
                      Взять до <br />
                      {{ booksReserveLimit }}
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
          <!-- <div class="text-caption">
            <b>Аннотация к книге "{{ currentBook.Name }}"</b>
          </div> -->
          <span class="text-caption">{{ currentBook.Annotation }}</span>
          <div
            v-if="userInfo && userInfo.isAdmin"
            class="d-flex flex-wrap justify-center pb-8"
          >
            <v-btn
              v-if="currentBook.ReservedQueue"
              small
              class="ma-4 accent"
              @click="callDialog(_giveBook)"
              >Выдать</v-btn
            >
            <v-btn
              v-if="currentBook.TemporaryOwner"
              small
              class="ma-4 accent"
              @click="callDialog(_returnBook)"
              >Получить</v-btn
            >
            <v-btn
              v-if="currentBook.ReservedQueue"
              small
              class="ma-4 accent"
              @click="callDialog(unreserveBook)"
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
    timeout: 1500,
    snackbarText: "",
  }),
  components: {
    BackArrow,
  },
  methods: {
    ...mapActions([
      "reserveBook",
      "giveBook",
      "returnBook",
      "deleteBookById",
      "cancelReserve",
    ]),

    callDialog: function (method) {
      this.dialog = true;
      this.dialogAction = method;
    },
    takeBook: function () {
      if (!this.userInfo.CurrentReservedBooks) {
        this.snackbarText = "Книга зарезервирована на 3 дня";
        this.snackbar = true;
        this.currentBook.Status = "Зарезервирована";
        this.currentBook.ReservedQueue = this.userInfo.Contacts.Email;
        this.reserveBook(this.currentBook.Id);
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
        axios
          .post(this.urlApiServer + "api/users/get-by-email", {
            email: this.currentBook.ReservedQueue,
          },     {
            headers: {
              authorization: this.accessTokenGetter,
            }
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
              this.currentBook.TemporaryOwner = this.currentBook.ReservedQueue;
              this.currentBook.ReservedQueue = "";
              this.currentBook.Status = "Выдана";

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

    unreserveBook: function () {
      this.cancelReserve({
        UserEmail: this.currentBook.ReservedQueue,
        BookId: this.currentBook.Id,
      });
      this.snackbarText = "Резерв снят";
      this.currentBook.Status = "На месте";
      this.currentBook.ReservedQueue = "";
      this.dialog = false;
      this.snackbar = true;
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
    getBookById: function () {
      axios
        .post(
          this.urlApiServer + "api/books/get-by-id",
          {
            id: this.$route.query.book_id,
          },
          {
            headers: {
              authorization: this.accessTokenGetter,
            }
          }
        )
        .then((response) => {
          this.currentBook = response.data[0];
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },

  computed: {
    ...mapGetters(["user", "books", "userInfo", "urlApiServer", "accessTokenGetter"]),
    booksReserveLimit: function () {
      if (this.currentBook.DateOfReserved) {
        let date = new Date(
          Number(this.currentBook.DateOfReserved) + 1000 * 60 * 60 * 24 * 3
        );

        return date.toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    },
    booksGiveOutDate: function () {
      if (this.currentBook.DateOfGivenOut) {
        let date = new Date(
          Number(this.currentBook.DateOfGivenOut) + 1000 * 60 * 60 * 24 * 21
        );
        return date.toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    },
  },

  mounted() {
    this.currentBook = this.books.find(
      (x) => x.Id == this.$route.query.book_id
    );
    if (!this.currentBook) {
      console.log("No current book");
      this.getBookById(this.$route.query.book_id);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>


     
       