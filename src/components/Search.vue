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