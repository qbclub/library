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
                    v-else
                    @click="routeTo('/reg')"
                    depressed
                    small
                    class="ma-4 accent"
                    >Зарегистрироваться</v-btn
                  >
                </div>

                <div v-else class="text-caption font-weight-bold">
                  Книга {{ currentBook.Status }}
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
            class="d-flex justify-center pb-8"
          >
            <v-btn small class="ma-4 accent" @click="callDialog(_giveBook)"
              >Выдать</v-btn
            >
            <v-btn small class="ma-4 accent" @click="callDialog(_returnBook)"
              >Получить</v-btn
            >
            <v-btn small class="ma-4 accent" @click="callDialog(editBook)"
              >Изменить</v-btn
            >
            <v-btn small class="ma-4 accentz" @click="callDialog(deleteBook)"
              >Удалить</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
      <div class="text-center">книга зарезервирована на 3 дня</div>
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
    timeout: 2000,
  }),
  methods: {
    ...mapActions(["reserveBook", "giveBook", "returnBook", "deleteBookById"]),
    callDialog: function (method) {
      this.dialog = true;
      this.dialogAction = method;
    },
    takeBook: function () {
      this.snackbar = true;
      this.reserveBook(this.currentBook.Id);
      this.dialog = false;
    },
    editBook: function () {
      console.log(this.currentBook);
      this.$router.push({ name: "EditBook", params: this.currentBook });
    },
    _giveBook: function () {
      this.snackbar = true;
      this.giveBook({
        bookId: this.currentBook.Id,
        userEmail: this.currentBook.ReservedQueue,
      });
      this.dialog = false;
    },
    _returnBook: function () {
      this.snackbar = true;
      this.returnBook({
        bookId: this.currentBook.Id,
        userEmail: this.currentBook.TemporaryOwner,
      });
      this.dialog = false;
    },
    deleteBook: function () {
      this.snackbar = true;
      this.deleteBookById(this.currentBook.Id);
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
  },
};
</script>

<style lang="scss" scoped>
</style>
