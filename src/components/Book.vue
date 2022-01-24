<template>
  <div class="book">
    <v-container>
      <router-link to="/" style="text-decoration: none" >
        <div>
          <span class="fi fi-rr-angle-left"> </span>
        </div>
      </router-link>

      <span class="text-h6"
        >{{ currentBook.authors }}: {{ currentBook.name }}
      </span>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  max-width="250"
                  :aspect-ratio="9 / 16"
                  contain
                  :src="currentBook.image"
                ></v-img> </v-col
              ><v-col
                ><div class="text-caption">
                  Автор: {{ currentBook.authors }}
                </div>
                <div class="text-caption">
                  Издательство: {{ currentBook.publisher }},
                  {{ currentBook.date }} г.
                </div>
                <div class="text-caption">
                  Тематика: {{ currentBook.direction }}
                </div>

                <div class="text-caption">ISBN: {{ currentBook.ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ currentBook.pagesCount }}
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
            <b>Аннотация к книге "{{ currentBook.name }}"</b>
          </div>
          <span class="text-caption">{{ currentBook.annotation }}</span>
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    currentBook: {},
    bookId: 1,
    snackbar: false,
    text: `Книга зарезервирована!`,

    timeout: 2000,
  }),
  methods: {
    takeBook: function () {
      console.log(this.books[this.bookId].name);
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
    this.bookId = this.$route.query.book_id;
    this.currentBook = this.books.find((x) => x.id == this.bookId);
    console.log(this.currentBook);
  },
};
</script>

<style lang="scss" scoped>
 a {
  color: #000!important;
}
</style>
