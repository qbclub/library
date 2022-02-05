<template>
  <div class="book">
    <v-container>
      <router-link to="/books" style="text-decoration: none">
        <div>
          <span class="fi fi-rr-angle-left"> </span>
        </div>
      </router-link>
      <span class="text-h6"
        >{{ currentBook.Authors }}: {{ currentBook.Name }}
      </span>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  loading="lazy"
                  max-width="250"
                  :aspect-ratio="9 / 16"
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
                <v-btn
                  v-if="user.loggedIn"
                  depressed
                  small
                  @click="snackbar = true"
                  class="ma-4 secondary"
                  v-on:click="takeBook"
                  >Взять книгу</v-btn
                >
                <v-btn
                  v-else
                  @click="routeTo('/reg')"
                  depressed
                  small
                  class="ma-4 secondary"
                  v-on:click="takeBook"
                  >Зарегистрироваться</v-btn
                >
                <div class="">Состояние: {{ currentBook.state }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="col-12 col-md-6">
          <div class="text-caption">
            <b>Аннотация к книге "{{ currentBook.Name }}"</b>
          </div>
          <span class="text-caption">{{ currentBook.Annotation }}</span>
          <div class="d-flex justify-center">
            <v-btn small class="ma-4 primary">Изменить</v-btn>
            <v-btn small class="ma-4 error">Удалить</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
      <div class="text-center">
        {{ text }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    currentBook: {},

    snackbar: false,
    text: `Книга зарезервирована!`,

    timeout: 2000,
  }),
  methods: {
    ...mapActions(["reserveBook"]),
    takeBook: function () {
      if (this.user.loggedIn) {
        let c = confirm("Зарезервировать книгу?");
        if (c) {
          this.reserveBook(this.currentBook.Id);
        }
      }
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
a {
  color: #000 !important;
}
</style>
