<template>
  <div>
    <v-row>
      <v-col class="col-6 col-sm-8">
        <v-text-field
          append-icon="mdi-search"
          v-model="searchRequest"
          label="Поиск"
          color="accent"
        ></v-text-field>
      </v-col>

      <v-col class="col-6 col-sm-4">
        <v-select
          v-model="bookStatus"
          :items="status"
          label="Фильтр"
          color="accent"
        
          prepend-icon="mdi-filter"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookStatus: "Все",
    searchRequest: "",
    booksToShow: [],
    status: ["Все", "На месте", "Зарезервирована", "Выдана"],
  }),
  props: {
    books: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    findAllBooks: function () {
      if (this.searchRequest == "" && this.bookStatus == "Все") {
        this.booksToShow = this.books;
      } else {
        this.booksToShow = this.books
          .filter(
            (book) =>
              book.Name.toLowerCase().includes(
                this.searchRequest.toLowerCase()
              ) ||
              book.Authors.toLowerCase().includes(
                this.searchRequest.toLowerCase()
              ) ||
              book.PublisherName.toLowerCase().includes(
                this.searchRequest.toLowerCase()
              ) ||
              book.Sections.toLowerCase().includes(
                this.searchRequest.toLowerCase()
              )
          )
          .filter((book) =>
            this.bookStatus == "Все" ? true : book.Status == this.bookStatus
          );
      }

      this.$emit("findBooks", this.booksToShow);
    },
  },
  watch: {
    searchRequest: function () {
      this.findAllBooks();
    },
    bookStatus: function () {
      this.findAllBooks();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  color: black !important;
}
</style>