<template>
  <v-container
    ><v-text-field
      append-icon="mdi-search"
      v-model="searchRequest"
      label="Поиск"
      @change="findAllBooks"
    ></v-text-field
  ></v-container>
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
      if (this.searchRequest != "") {
        for (let book of this.books) {
          let includes =
            book.name.includes(this.searchRequest) ||
            [book.authors].find((author) =>
              author.includes(this.searchRequest)
            ) ||
            book.publisher.includes(this.searchRequest) ||
            book.direction.includes(this.searchRequest);
          if (includes) {
            this.booksToShow.push(book);
          }
        }
        this.$emit("findBooks", this.booksToShow);
      } else {
        this.$emit("findBooks", this.books);
      }
    },
  },
};
</script>

<style>
</style>