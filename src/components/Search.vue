<template>
  <div>
    <v-text-field
      append-icon="mdi-search"
      v-model="searchRequest"
      label="Поиск"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchRequest: "",
    booksToShow: [],
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
      this.searchRequest == ""
        ? (this.booksToShow = this.books)
        : (this.booksToShow = this.books.filter(
            (book) =>
              book.name
                .toLowerCase()
                .includes(this.searchRequest.toLowerCase()) ||
              book.authors
                .toLowerCase()
                .includes(this.searchRequest.toLowerCase()) ||
              book.publisher
                .toLowerCase()
                .includes(this.searchRequest.toLowerCase()) ||
              book.direction
                .toLowerCase()
                .includes(this.searchRequest.toLowerCase())
          ));
      this.$emit("findBooks", this.booksToShow);
    },
  },
  watch: {
    searchRequest: function () {
      this.findAllBooks();
    },
  },
};
</script>

<style>
</style>