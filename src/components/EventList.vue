<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">П.Н.</th>
          <th class="text-left">Дата</th>
          <th class="text-left">Книга</th>
          <th class="text-left">Статус</th>
          <th class="text-left">Пользователь</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bookEvent, i) in booksflow" :key="i">
          <td>{{ bookEvent.Bookid }}</td>
          <td>{{ bookEvent.TimeStamp }}</td>
          <td>{{ findBook(bookEvent.id)}}</td>
          <td>{{ bookEvent.BookStatus }}</td>
          <td>{{ bookEvent.Userid }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import booksflow from "../db/booksflow";
import books from "../db/books";
export default {
  data: () => ({
    booksflow,
    books,
    book:{},
  }),
  methods: {
    findBook: function (Bookid=1) {
     return this.book=this.books.filter(book => book.id==Bookid) 
    },
  },
  mounted(){
      
  }
};
</script>

<style lang="scss" scoped>
</style>